(function()
{
	"use strict";

	CVM.PRIMDIJKSTRA.Dijkstra = function()
	{
		// Le graphe d'entrée.
		this.graph;
		// Le noeud de départ.
		this.start;
		// Le noeud de destination.
		this.end;
		// Les noeuds découverts qui n'ont pas encore été sélectionnés.
		this.preselections;
		// Les noeuds sélectionnés qui serviront à tracer le chemin final.
		this.selections;
		// Historique (facultatif)
		this.history;
	};

	CVM.PRIMDIJKSTRA.Dijkstra.prototype.load = function(graph, start, end)
	{
		this.graph = graph;
		this.start = start;
		this.end = end;
		// Enregistrer le noeud de départ dans les présélections pour la première itération.
		this.preselections = {};
		this.preselections[start] = { g: 0, previous: null };
		this.selections = {};
		this.history = [];
	};

	CVM.PRIMDIJKSTRA.Dijkstra.prototype.search_path = function()
	{
		// Tant qu'il reste des noeuds disponibles dans les présélections, continuer la recherche.
		while (Object.keys(this.preselections).length > 0)
		{
			// Ajouter à la liste des sélections le noeud le moins coûteux provenant de la liste des présélections.
			var selectedNode = this.select_nodeWithSmallestCost();

			// Ajouter à la liste des présélections les noeuds voisins du noeud précédemment sélectionné.
			this.preselect_neighbours(selectedNode);
		}
		// Reconstituer le chemin à l'aide de la liste des sélections.
		return this.build_path();
	};

	CVM.PRIMDIJKSTRA.Dijkstra.prototype.select_nodeWithSmallestCost = function()
	{
		var smallestCost = Infinity;
		var selectedNode;

		// Parcourir les noeuds présents dans les présélections.
		for (var node in this.preselections)
		{
			// Si le coût du noeud est inférieur à smallestCost...
			if (this.preselections[node].g < smallestCost)
			{
				// assigner le coût du noeud à smallerCost.
				smallestCost = this.preselections[node].g;
				// assigner le nom du noeud à selectedNode.
				selectedNode = node;
			}
		}

		// Ajouter le noeud à la liste des sélections.
		this.selections[selectedNode] = this.preselections[selectedNode];

		// Effacer le noeud de la liste des préselections.
		delete this.preselections[selectedNode];

		return selectedNode;
	};

	CVM.PRIMDIJKSTRA.Dijkstra.prototype.preselect_neighbours = function(selectedNode)
	{
		var neighbours = {};

		// Parcourir les noeuds voisins du noeud sélectionné.
		for (var neighbour in this.graph[selectedNode])
		{
			// Vérifier que le noeud voisin ne soit pas déjà présent dans la liste des sélections.
			if (!this.selections[neighbour])
			{
				// Attribuer à "g" le coût du chemin déjà parcouru + le coût du noeud sélectionné vers le noeud voisin.
				var g = this.selections[selectedNode].g + this.graph[selectedNode][neighbour];

				// Préparer les informations des noeuds voisins pour l'historique.
				neighbours[neighbour] = g;
				
				// Si le noeud ne figure pas dans la liste des présélections...
				if (!this.preselections[neighbour])
				{
					// l'enregistrer dans cette dernière avec comme informations son coût et le noeud dont il provient.
					this.preselections[neighbour] = { g: g, previous: selectedNode };
				}
				else
				{
					// Si le nouveau coût est inférieur à l'ancien...
					if (g < this.preselections[neighbour].g)
					{
						// mettre les informations du noeud à jour dans la liste des présélections.
						this.preselections[neighbour] = { g: g, previous: selectedNode };
					}
				}
			}
		}

		// Ajouter le poids des noeuds voisin à l'historique.
		this.history.push({"node": selectedNode, "neighbours": neighbours});
	};

	CVM.PRIMDIJKSTRA.Dijkstra.prototype.build_path = function()
	{
		// Le premier noeud à traiter lors de la boucle sera le noeud de destination.
		var previous = this.end;
		var path = [];

		// Tant qu'il existe un noeud parent...
		while (previous)
		{
			// Ajouter le nom du noeud parent au début de path.
			path.unshift(previous);

			// Mettre le noeud parent à jour.
			previous = this.selections[previous].previous;
		}

		return {"path": path, "history": this.history};
	};
}());