<?php

$content_title = "Introduction - Apprentissage par Renforcement - IA Initiation";
$meta_description = "Objectif et fonctionnement de l'apprentissage par renforcement.";
$og_page = "reinforcement";

ob_start();?>
	<h1>IA<span>INIT (Apprentissage par Renforcement)</span></h1>
<?php $content_h1 = ob_get_clean();

ob_start();?>
	<section>
		<div class="container-small">
			<h2>Présentation</h2>
			<p>L'apprentissage par renforcement est une méthode d'apprentissage qui s'apparente à celle de l'homme. Un agent autonome est plongé au sein d'un environnement avec lequel il intéragit. L'agent développe son propre comportement suite à une serie d'entrainements dans lesquels il reçoit des récompenses positives ou négatives en fonction de ses choix et des règles du système.</p>
		</div>
	</section>
	<section>
		<div class="container-small">
			<h2>Les Ètats</h2>
			<p>Les états correspondent à une configuration donnée d'un système, chacun d'eux est donc unique. Ils sont utilisés comme index pour que l'agent puisse cibler des espérances de gain et ainsi prendre une décision optimale.</p>
		</div>
	</section>
	<section>
		<div class="container-small">
			<h2>L'Entrainement</h2>
			<p>Pour qu'un agent puissent prendre des décisions optimales, il a besoin de s'entrainer. Pour réaliser cette tâche, il est plongé dans un environnement avec lequel il va intéragir. L'agent va alterner les phases d'exploration et les phases d'exploitation. Cette alternance dépend de la valeur du taux d'exploration (<b>epsilon</b>). Plus cette valeur se rapproche de 1 plus l'agent a de chance de pratiquer l'<b>exploration</b>, plus elle se rapproche de 0 plus l'agent a de chance de pratiquer l'<b>exploitation</b>. La qualité de l'entrainement va, entre autres choses, dépendre de la couverture des états réalisée par l'équilibre entre exploration et exploitation. En général, epsilon est initialisé à une valeur proche de 1, valeur diminuant progressivement entre chaque entrainement pour atteindre 0 lors de la phase de test.</p>
		</div>
	</section>
	<section>
		<div class="container-small">
			<h2>L'Exploration</h2>
			<p>Lors des phases d'exploration, l'agent prend une décision aléatoire pour interagir avec l'environnement.</p>
		</div>
	</section>
	<section>
		<div class="container-small">
			<h2>L'Exploitation</h2>
			<p>Lors des phases d'exploitation, l'agent prend une décision optimale pour interagir avec l'environnement. Cette décision se fonde sur un tableau lié à l'état du système.</p>
		</div>
	</section>
	<section>
		<div class="container-small">
			<h2>L'Apprentissage</h2>
			<p>L'apprentissage est appelé à divers moments de l'entrainement en fonction du contexte et de son algorithme (<a href="vfunction">la fonction V</a>, <a href="qfunction">la fonction Q</a>, ...). C'est à ce moment là que les espérances de gain sont mises à jour en fonction des récompenses obtenues suite aux décisions prises par l'agent et aux règles du système.</p>
		</div>
	</section>
<?php $content_main = ob_get_clean();

ob_start();?>

<?php include("template.php"); ?>