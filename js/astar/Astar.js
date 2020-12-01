(function()
{
	"use strict";

	CVM.ASTAR.Astar = function()
	{
		// Le graphe d'entrée.
		this.graph;
		// Le noeud de départ.
		this.start;
		// le noeud de destination.
		this.end;
		// Les noeuds découverts qui n'ont pas encore été sélectionnés.
		this.preselections;
		// Les noeuds sélectionnés qui serviront à tracer le chemin final.
		this.selections;
		// Historique (facultatif)
		this.history;
	};

	CVM.ASTAR.Astar.prototype.init = function(graph)
	{
		// Convertir le graphe d'entrée (array en 2 dimensions) en objet et filtrer les noeuds non praticables (wall).
		this.graph = this.init_graph(graph);
		// Enregistrer le noeud de départ dans les présélections pour la première itération.
		this.preselections = {};
		this.preselections[this.start] = { g: 0, h: 0, f: 0, previous: null };
		this.selections = {};
		this.history = {preselections:[], selections:[]};
	};

	CVM.ASTAR.Astar.prototype.init_graph = function(graph)
	{
		var output = {};
		// Parcourir chaque noeud du graphe.
		for (var r = graph.length - 1; r >= 0; r--)
		{
			for (var c = graph[r].length - 1; c >= 0; c--)
			{
				// Si le noeud actuel n'est pas un mur...
				if (graph[r][c] != "wall")
				{
					// ajouter une propriété portant le nom des coordonnées du noeud et lui assigner le nom de ses voisins. Un tel nom de propriété sera pratique pour cibler les noeuds par la suite sans devoir parcourir un array ou un objet.
					output[r + '-' + c] = this.init_neighbours(graph, r, c, false);
				}
				// Si le noeud est celui de départ ou de destination, assigner leurs coordonnées aux variables correspondantes.
				if (graph[r][c] == "start")
				{
					this.start = r + '-' + c;
				}
				else if (graph[r][c] == "end")
				{
					this.end = r + '-' + c;
				}
			}
		}
		return output;
	};

	CVM.ASTAR.Astar.prototype.init_neighbours = function(graph, r, c, diag)
	{
		var output = {};

		var neighbours = diag ?
		// 8 directions.
		[{ r: r - 1, c: c }, { r: r, c: c + 1 }, { r: r + 1, c: c }, { r: r, c: c - 1 }, { r: r - 1, c: c + 1}, { r: r + 1, c: c + 1 }, { r: r + 1, c: c - 1 }, { r: r - 1, c: c - 1 }] :
		// 4 directions.
		[{ r: r - 1, c: c }, { r: r, c: c + 1 }, { r: r + 1, c: c }, { r: r, c: c - 1 }];

		// Parcourir les noeuds voisins.
		for (var i = neighbours.length - 1; i >= 0; i--)
		{
			var niegh_r = neighbours[i].r;
			var niegh_c = neighbours[i].c;

			// S'il s'agit d'un noeud valide et qu'il ne représente pas un mur....
			if (graph[niegh_r] && graph[niegh_r][niegh_c] && graph[niegh_r][niegh_c] != "wall")
			{
			// enregistrer le nom de la propriété avec les coordonnées du noeud. L'assignement n'a pas d'importance!
				output[niegh_r + '-' + niegh_c] = null;
			}
		}
		return output;
	};

	CVM.ASTAR.Astar.prototype.search_path = function()
	{
		// Tant qu'il reste des noeuds disponibles dans les présélections, continuer la recherche.
		while (Object.keys(this.preselections).length > 0)
		{
			// Ajouter à la liste des sélections le noeud le moins coûteux provenant de la liste des présélections.
			var selectedNode = this.select_nodeWithSmallestCost();
			// Ajouter à la liste des présélections les noeuds voisins du noeud précédemment sélectionné.
			this.preselect_neighbours(selectedNode);
			// Terminer la recherche si le noeud de destination est atteint.
			if (selectedNode == this.end)
			{
				break;
			}
		}
		// Reconstituer le chemin à l'aide de la liste des sélections.
		return { path: this.build_path(), history: this.history };
	};

	CVM.ASTAR.Astar.prototype.select_nodeWithSmallestCost = function()
	{
		var smallestCost = Infinity;
		var selectedNode;

		// Parcourir les noeuds présents dans les présélections.
		for (var node in this.preselections)
		{
			// Si l'estimation du coût de la distance totale (du noeud de départ vers le noeud de destination en passant par le noeud actuel) est inférieure à smallestCost...
			if (this.preselections[node].f < smallestCost)
			{
				// assigner le coût "f" du noeud à smallerCost.
				smallestCost = this.preselections[node].f;

				// assigner le nom du noeud à selectedNode.
				selectedNode = node;
			}
		}

		// Ajouter la séléction à l'historique.
		var obj = {};
		obj[selectedNode] = { g: this.preselections[selectedNode].g, h: this.preselections[selectedNode].h, f: this.preselections[selectedNode].f };
		this.history.selections.push(obj);

		// Ajouter le noeud à la liste des sélections.
		this.selections[selectedNode] = this.preselections[selectedNode];

		// Effacer le noeud de la liste des préselections.
		delete this.preselections[selectedNode];

		return selectedNode;
	};

	CVM.ASTAR.Astar.prototype.preselect_neighbours = function(selectedNode)
	{
		var neighbours = {};

		// Parcourir les noeuds voisins du noeud sélectionné.
		for (var neighbour in this.graph[selectedNode])
		{
			// Vérifier que le noeud voisin ne soit pas déjà présent dans la liste des sélections.
			if (!this.selections[neighbour])
			{
				// Récupérer les coordonnées du noeud voisin ainsi que celles du noeud de destination.
				var neighbourPosition = this.get_coordinates(neighbour);
				var destinationPosition = this.get_coordinates(this.end);

				// Assigner à "g" le coût du chemin déjà parcouru + le coût du noeud sélectionné vers le noeud voisin.
				var g = this.selections[selectedNode].g + 1;
				// Assigner à "h" une estimation de la distance restante (du noeud voisin vers le noeud de destination).
				var h = this.get_distance(neighbourPosition, destinationPosition);
				var f = h + g;

				// Préparer les présélections pour l'historique.
				neighbours[neighbour] = { g: g, h: h, f: f };

				// Si le noeud ne figure pas dans la liste des présélections...
				if (!this.preselections[neighbour])
				{
					// l'enregistrer dans cette dernière avec comme informations son coût et le noeud dont il provient.
					this.preselections[neighbour] = { g: g, h: h, f: f, previous: selectedNode };
				}
				else
				{
					// Si le nouveau coût de l'estimation de la distance restante est inférieur à l'ancien...
					if (h < this.preselections[neighbour].h)
					{
						// mettre les informations du noeud à jour dans la liste des présélections.
						this.preselections[neighbour] = { g: g, h: h, f: f, previous: selectedNode };
					}
				}
			}
		}
		// Ajouter les présélections à l'historique.
		this.history.preselections.push(neighbours);
	};

	CVM.ASTAR.Astar.prototype.get_coordinates = function(node)
	{
		var position = node.split('-');

		return { r: position[0], c: position[1] };
	};

	CVM.ASTAR.Astar.prototype.get_distance = function(node1, node2)
	{
		/*
		* La distance de Manhattan appelée aussi taxi-distance = c + r.
		* La distance euclidienne = Math.sqrt(Math.pow(c, 2) + Math.pow(r, 2)).
		*/
		var c = Math.abs(node1.c - node2.c);
		var r = Math.abs(node1.r - node2.r);

		return Math.round(Math.sqrt(Math.pow(c, 2) + Math.pow(r, 2)));
	};

	CVM.ASTAR.Astar.prototype.build_path = function()
	{
		// Reconstitution de la route en partant du noeud de destination ou du noeud accessible lui étant le plus proche vers le noeud de départ.
		var path = [];
		var previous = this.get_lastNode();

		// Tant qu'il existe un noeud parent...
		while (previous)
		{
			// ajouter le nom du noeud parent au début de path.
			path.unshift(previous);
			// mettre le noeud parent à jour.
			previous = this.selections[previous].previous;
		}

		return path;
	};

	CVM.ASTAR.Astar.prototype.get_lastNode = function()
	{
		var lastNode;

		// Si le noeud de destination à été atteint...
		if (this.selections[this.end])
		{
			// l'assigner à lastNode.
			lastNode = this.end;
		}
		else
		{
			var smallestDistance = Infinity;
			// Parcourir les noeuds présents dans la liste des sélections.
			for (var node in this.selections)
			{
				// Trouver le noeud le plus proche du noeud de destination.
				if (this.selections[node].h < smallestDistance && node != this.start)
				{
					smallestDistance = this.selections[node].h;
					lastNode = node;
				}
			}
		}

		return lastNode;
	};
}());