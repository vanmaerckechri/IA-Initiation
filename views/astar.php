<?php

$content_title = "Algorithme A* - IA Initiation";
$meta_description = "Objectif et fonctionnement de l'algorithme A*.";
$og_page = "astar";

ob_start();?>
	<link rel="stylesheet" type="text/css" href="assets/css/style_astar.css">
	<link rel="stylesheet" type="text/css" href="assets/css/prism.css">
<?php $content_style = ob_get_clean();

ob_start();?>
	<h1>IA<span>INIT (Algorithme A*)</span></h1>
<?php $content_h1 = ob_get_clean();

ob_start();?>
	<section>
		<div class="container-small">
			<h2>Présentation</h2>
			<p>L'algorithme A* est une version souvent moins gourmande de l'algorithme de <a href="dijkstra.php" title="En savoir plus sur l'algorithme de Dijkstra...">Dijkstra</a>. Il a pour objectif de trouver potentiellement le plus court chemin entre le noeud de départ et le noeud de destination. Contrairement à l'algorithme de Dijkstra, l'algorithme A* utilise des évaluations heuristiques pour estimer les distances à parcourir.</p>
		</div>
	</section>
	<section>
		<div class="container-small example-container">
			<h2>Démonstration</h2>
			<div id="graph-container" class="graph-container">
				<fieldset class="options-container">
					<legend>Modifier le Graphe</legend>
					<div class="col">
						<label><input type="radio" name="option-cellType" value="start" checked>déplacer départ</label>
						<label><input type="radio" name="option-cellType" value="wall">dessiner mur</label>
					</div>
					<div class="col">
						<label><input type="radio" name="option-cellType" value="end">déplacer destination</label>
						<label><input type="radio" name="option-cellType" value="empty">effacer mur</label>
					</div>
				</fieldset>
				<div class="buttons-container">
					<button id="nextStep" class="btn" type="button">PROCHAINE ÉTAPE</button><!--
				 --><button id="allSteps" class="btn" type="button">TOUTES LES ÉTAPES</button>
				</div>
				<div class="canvas-container">
					<canvas id="graph-canvas" class="graph-canvas" width="700" height="700"></canvas>
					<canvas id="graph-colors-canvas" class="graph-colors-canvas" width="700" height="700"></canvas>
					<canvas id="graph-weights-canvas" class="graph-weights-canvas" width="700" height="700"></canvas>
				</div>
				<div class="graph-legend">
					<h3>Légende</h3>
					<ul class="colors">
						<li><span class="square blue"></span>Départ</li>
						<li><span class="square green"></span>Destination</li>
						<li><span class="square black"></span>Murs</li>
						<li><span class="square grey"></span>Présélections</li>
						<li><span class="square cyan"></span>Sélections</li>
						<li><span class="square red"></span>Trajectoire finale</li>
					</ul>
					<ul class="weights">
						<li><span class="square g"></span>Le coût réel parcouru du noeud de départ au noeud actuel.</li>
						<li><span class="square h"></span>Le coût de l'estimation de la distance du noeud actuel au noeud de destination.</li>
						<li><span class="square f"></span>Le coût total (g + h).</li>
					</ul>
				</div>
			</div>
		</div>
	</section>
	<section>
		<div class="container-small">
			<h2>Déroulement</h2>
			<ol>
				<li>Placer le noeud de départ dans l'ensemble des présélections.</li>
				<li>Boucle: Parcourir l'ensemble des présélections.
					<ul>
						<li>S'il ne reste plus de noeud dans les présélections ou si la destination est atteinte, sortir de la boucle.</li>
						<li>Déplacer le noeud possédant le plus petit coût des préséléctions vers les séléctions.</li>
						<li>Boucle: Parcourir les noeuds voisins du dernier noeud séléctionné (s'ils ne sont pas encore présents dans les séléctions).
							<ul>
								<li>Calculer le coût du noeud voisin (coût du trajet parcouru + estimation du coût entre le noeud voisin et la destination).</li>
								<li>Si le noeud voisin n'est pas présent dans les présélections, l'y ajouter.</li>
								<li>Si le noeud voisin est déjà présent dans les présélections et que son coût est inférieur à l'ancien, mettre les informations du noeud à jour.</li>
							</ul>
						</li>
					</ul>
				</li>
				<li>Reconstituer le chemin en partant du noeud de destination vers le noeud de départ à l'aide des informations présentes dans les sélections.
				</li>
			</ol>
		</div>
	</section>
	<section>
		<div class="container-small">
			<h2>Code</h2>
			<pre>
				<code class="language-js">
					var Astar = function()
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
					};

					Astar.prototype.init = function(graph)
					{
						// Convertir le graphe d'entrée (array en 2 dimensions) en objet et filtrer les noeuds non praticables (wall).
						this.graph = this.init_graph(graph);
						// Enregistrer le noeud de départ dans les présélections pour la première itération.
						this.preselections = {};
						this.preselections[this.start] = { g: 0, h: 0, f: 0, previous: null };
						this.selections = {};
					};

					Astar.prototype.init_graph = function(graph)
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
									output[r + "-" + c] = this.init_neighbours(graph, r, c, false);
								}
								// Si le noeud est celui de départ ou de destination, assigner leurs coordonnées aux variables correspondantes.
								if (graph[r][c] == "start")
								{
									this.start = r + "-" + c;
								}
								else if (graph[r][c] == "end")
								{
									this.end = r + "-" + c;
								}
							}
						}
						return output;
					};

					Astar.prototype.init_neighbours = function(graph, r, c, diag)
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
								output[niegh_r + "-" + niegh_c] = null;
							}
						}
						return output;
					};

					Astar.prototype.search_path = function()
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
						return this.build_path();
					};

					Astar.prototype.select_nodeWithSmallestCost = function()
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

						// Ajouter le noeud à la liste des sélections.
						this.selections[selectedNode] = this.preselections[selectedNode];

						// Effacer le noeud de la liste des préselections.
						delete this.preselections[selectedNode];

						return selectedNode;
					};

					Astar.prototype.preselect_neighbours = function(selectedNode)
					{
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
					};

					Astar.prototype.get_coordinates = function(node)
					{
						var position = node.split("-");

						return { r: position[0], c: position[1] };
					};

					Astar.prototype.get_distance = function(node1, node2)
					{
						/*
						* La distance de Manhattan appelée aussi taxi-distance = c + r.
						* La distance euclidienne = Math.sqrt(Math.pow(c, 2) + Math.pow(r, 2)).
						*/
						var c = Math.abs(node1.c - node2.c);
						var r = Math.abs(node1.r - node2.r);

						return Math.round(Math.sqrt(Math.pow(c, 2) + Math.pow(r, 2)));
					};

					Astar.prototype.build_path = function()
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

					Astar.prototype.get_lastNode = function()
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
				</code>
			</pre>
		</div>
	</section>
<?php $content_main = ob_get_clean();

ob_start();?>
	<script type="text/javascript" src="js/astar/Namespaces.js"></script>
	<script type="text/javascript" src="js/tools/CanvasManager.js"></script>
	<script type="text/javascript" src="js/modules/Prism.js"></script>
	<script type="text/javascript" src="js/astar/Graph.js"></script>
	<script type="text/javascript" src="js/astar/Astar.js"></script>
	<script type="text/javascript" src="js/astar/Main.js"></script>
	<script type="text/javascript">
		(function()
		{
			"use strict";

			var astar = new CVM.ASTAR.Main();
		}());
	</script>
<?php $content_jsClasses = ob_get_clean();?>

<?php include("template.php"); ?>