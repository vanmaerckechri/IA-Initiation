<?php

$content_title = "Liste des Algorithmes - IA Initiation";
$meta_description = "Initiation à l'intelligence artificielle. Quelques algorithmes amusants pour bien débuter.";

ob_start();?>
	<h1>IA<span>INIT (les Algorithmes)</span></h1>
<?php $content_h1 = ob_get_clean();

ob_start();?>
<section>
	<div class="container-small">
		<h2>Introduction</h2>
		<p>L'apprentissage automatique, l'apprentissage par renforcement, l'apprentissage supervisé, l'apprentissage non supervisé, l'apprentissage profond, les réseaux de neurones... tous ces concepts peuvent déconcerter lorsque l'on souhaite débuter avec l'intelligence artificielle. Dans les chapitres suivants, vous trouverez divers algorithmes commentés et accompagnés de démonstrations qui ont pour objectif d'aider à la compréhension de ces concepts.</p>
	</div>
</section>
<section>
	<div class="container-small">
		<h2>Recherche de Chemin</h2>
		<ul>
			<li>
				<a href="prim">L'algorithme de Prim</a> a pour objectif de connecter à moindre coût l'ensemble des noeuds présents dans un graphe.
			</li>
			<li>
				<a href="dijkstra">L'algorithme de Dijkstra</a> est une version modifiée de l'algorithme de Prim. Il a pour objectif de trouver le plus court chemin entre le noeud de départ et le noeud de destination.
			</li>
			<li>
				<a href="astar">L'algorithme A*</a> est une version modifiée et souvent moins grourmande de l'algorithme de Dijkstra. Il a pour objectif de trouver potentiellement le plus court chemin entre le noeud de départ et le noeud de destination.
			</li>
		</ul>
	</div>
</section>
<section>
	<div class="container-small">
		<h2>Théorie des Jeux</h2>
		<ul>
			<li>
				<a href="minimax">L'algorithme Minimax (avec élagage alpha-bêta)</a> est un algorithme décisionnel utilisé dans les jeux à somme nulle, c'est à dire les jeux où la somme des gains et des pertes est nulle, ce que gagne l'un est perdu par l'autre. Son objectif est de maximiser son gain minimum ou de minimiser le gain maximum de l’adversaire.
			</li>
		</ul>
	</div>
</section>
<section>
	<div class="container-small">
		<h2 id="apr">Apprentissage Automatique</h2>
		<ul>
			<li>
				<a href="reinforcement">L'apprentissage par renforcement</a> est une méthode d'apprentissage qui s'apparente à celle de l'homme. Un agent autonome est plongé au sein d'un environnement avec lequel il intéragit. L'agent développe son propre comportement suite à une serie d'entrainements dans lesquels il reçoit des récompenses positives ou négatives en fonction de ses choix et des règles du système.
				<ul>
					<li><a href="vfunction">La fonction V</a> (fonction de valeur des états) repose sur un tableau d'estimations dont les index représentent les différents états du système. Chaque état dispose d'une valeur correspondant à une estimation qualitative de cet état.</li>
					<li><a href="qfunction">Le Q-learning</a> utilise la fonction Q (fonction de valeur des états-actions) qui repose sur un tableau que l'on nomme la Q-table. Les index de cette Q-table représentent les différents états du système. Chaque état dispose d'un tableau d'actions où chacune d'elles possède une valeur correspondant à une estimation qualitative de cette l'action.</li>
				</ul>
			</li>
		</ul>
	</div>
</section>
<?php $content_main = ob_get_clean();?>

<?php include("template.php"); ?>