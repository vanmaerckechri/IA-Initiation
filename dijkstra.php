<?php

$content_title = "Algorithme de Dijkstra - IA Initiation";
$meta_description = "Objectif et fonctionnement de l'algorithme de Dijkstra.";
$og_page = "dijkstra.php";

ob_start();?>
	<link rel="stylesheet" type="text/css" href="assets/css/primdijkstra.css">
	<link rel="stylesheet" type="text/css" href="assets/css/prism.css">
<?php $content_style = ob_get_clean();

ob_start();?>
	<h1>IA<span>INIT (Algorithme de Dijkstra)</span></h1>
<?php $content_h1 = ob_get_clean();

ob_start();?>
	<section>
		<div class="container-small">
			<h2>Présentation</h2>
			<p>L'algorithme de Dijkstra est une version modifiée de l'algorithme de <a href="prim.php" title="En savoir plus sur l'algorithme de Prim...">Prim</a>. Il a pour objectif de trouver le plus court chemin entre le noeud de départ et le noeud de destination.</p>
		</div>
	</section>
	<section>
		<div class="container-small example-container">
			<h2>Démonstration</h2>
			<div class="buttons-container">
				<div>
					<button id="randomWeights" class="btn" type="button">GÉNÉRER DES POIDS</button>
					<button id="nextStep" class="btn" type="button">PROCHAINE ÉTAPE</button>
				</div>
				<div>
					<button id="reset" class="btn" type="button">EFFACER LE RÉSULTAT</button>
					<button id="allSteps" class="btn" type="button">TOUTES LES ÉTAPES</button>
				</div>
			</div>
			<div id="graph-container" class="graph-container"></div>
			<div id="board-container" class="board-container"></div>
		</div>
	</section>
	<section>
			<div class="container-small">
			<h2>Déroulement</h2>
			<ol>
				<li>Placer le noeud de départ dans l'ensemble des présélections.</li>
				<li>Boucle: Parcourir l'ensemble des présélections.
					<ul>
						<li>S'il ne reste plus de noeud dans les présélections, sortir de la boucle.</li>
						<li>Déplacer le noeud possédant le plus petit coût des préséléctions vers les séléctions.</li>
						<li>Boucle: Parcourir les noeuds voisins du dernier noeud séléctionné (s'ils ne sont pas encore présents dans les séléctions).
							<ul>
								<li>Calculer le coût du noeud voisin (coût du trajet parcouru + coût entre le noeud séléctionné et le noeud voisin).</li>
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
					Dijkstra = function()
					{
						// Le graphe d'entrée ex: {a: {b: 2, c: 4}, b: {a: 2, d: 3, f: 4}, ...}.
						this.graph;
						// Le noeud de départ.
						this.start;
						// Le noeud de destination.
						this.end;
						// Les noeuds découverts qui n'ont pas encore été sélectionnés.
						this.preselections;
						// Les noeuds sélectionnés qui serviront à tracer le chemin final.
						this.selections;
					};

					Dijkstra.prototype.load = function(graph, start, end)
					{
						this.graph = graph;
						this.start = start;
						this.end = end;
						// Enregistrer le noeud de départ dans les présélections pour la première itération.
						this.preselections = {};
						this.preselections[start] = { g: 0, previous: null };
						this.selections = {};
					};

					Dijkstra.prototype.search_path = function()
					{
						// Tant qu'il reste des noeuds disponibles dans les présélections, continuer la recherche.
						while (Object.keys(this.preselections).length > 0)
						{
							// Ajouter à la liste des sélections le noeud le moins coûteux provenant de la liste des présélections.
							var selectedNode = this.select_nodeWithSmallestCost();
							// Ajouter à la liste des présélections les noeuds voisins du noeud précédemment sélectionné.
							this.preselect_neighbours(selectedNode);
							// Si le noeud de destination est atteint, sortir de la boucle.
							if (selectedNode === this.end)
							{
								break;
							}
						}
						// Reconstituer le chemin à l'aide de la liste des sélections.
						return this.build_path();
					};

					Dijkstra.prototype.select_nodeWithSmallestCost = function()
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

					Dijkstra.prototype.preselect_neighbours = function(selectedNode)
					{
						// Parcourir les noeuds voisins du noeud sélectionné.
						for (var neighbour in this.graph[selectedNode])
						{
							// Vérifier que le noeud voisin ne soit pas déjà présent dans la liste des sélections.
							if (!this.selections[neighbour])
							{
								// Attribuer à "g" le coût du chemin déjà parcouru + le coût du noeud sélectionné vers le noeud voisin.
								var g = this.selections[selectedNode].g + this.graph[selectedNode][neighbour];

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
					};

					Dijkstra.prototype.build_path = function()
					{
						// Le premier noeud à traiter lors de la boucle sera le noeud de destination.
						var previous = this.end;
						var path = [];

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
				</code>
			</pre>
		</div>
	</section>
<?php $content_main = ob_get_clean();

ob_start();?>
	<script type="text/javascript" src="js/primDijkstra/Namespaces.js"></script>
	<script type="text/javascript" src="js/tools/CanvasManager.js"></script>
	<script type="text/javascript" src="js/modules/Prism.js"></script>
	<script type="text/javascript" src="js/primDijkstra/Graph.js"></script>
	<script type="text/javascript" src="js/primDijkstra/Board.js"></script>
	<script type="text/javascript" src="js/primDijkstra/Dijkstra.js"></script>
	<script type="text/javascript" src="js/primDijkstra/Main.js"></script>
	<script type="text/javascript">
		(function()
		{
			"use strict";
			var demo = new CVM.PRIMDIJKSTRA.Main("Dijkstra");
		}());
	</script>
<?php $content_jsClasses = ob_get_clean();?>

<?php include("template.php"); ?>