<?php

$content_title = "La Fonction V - Apprentissage par Renforcement - IA Initiation";
$meta_description = "Objectif et fonctionnement de la fonction V.";
$og_page = "vfunction";

ob_start();?>
	<link rel="stylesheet" type="text/css" href="assets/css/style_vfunction.css">
	<link rel="stylesheet" type="text/css" href="assets/css/prism.css">
<?php $content_style = ob_get_clean();

ob_start();?>
	<h1>IA<span>INIT (Fonction V)</span></h1>
<?php $content_h1 = ob_get_clean();

ob_start();?>
	<section>
		<div class="container-small">
			<h2>Présentation</h2>
			<p>La fonction V (fonction de valeur des états) est un algorithme qui est employé avec l'<a href="reinforcement">apprentissage par renforcement</a>. Il repose sur un tableau d'estimations dont les index représentent les différents états du système. Chaque état dispose d'une valeur correspondant à une estimation qualitative de cet état.</p>
		</div>
	</section>
	<section>
		<div class="container-small example-container">
			<h2>Démonstration</h2>
			<div class="tictactoe-container">
				<fieldset class="options-container">
					<legend>Joueur 1</legend>
					<label><input type="radio" name="option-player1" value="human" checked>Humain</label>
					<label><input type="radio" name="option-player1" value="ai">IA</label>
				</fieldset>
				<fieldset class="options-container">
					<legend>Entrainement de l'IA<span id="progress"></span></legend>
					<label><input id="exploringRate" type="number" value="0.99" min="0" max="0.99" step="0.01">Taux d'exploration (<b>epsilon</b>).</label>
					<label><input id="learningRate" type="number" value="0.1" min="0.01" max="0.99" step="0.01">Taux d'apprentissage (<b>alpha</b>).</label>
					<label><input id="trainNumber" type="number" value="10000" min="100" max="50000" step="100">Nombre de Parties.</label>
				</fieldset>
				<div class="buttons-container">
					<button id="btn_trainAi" class="btn" type="button">ENTRAINER</button>
					<button id="btn_newGame" class="btn" type="button">NOUVELLE PARTIE</button>
				</div>
				<div id="tictactoe-board" class="tictactoe-board">
					<div class="row">
						<div data-row="0" data-col="0" class="cell active"></div>
						<div data-row="0" data-col="1" class="cell active"></div>
						<div data-row="0" data-col="2" class="cell active"></div>
					</div>
					<div class="row">
						<div data-row="1" data-col="0" class="cell active"></div>
						<div data-row="1" data-col="1" class="cell active"></div>
						<div data-row="1" data-col="2" class="cell active"></div>
					</div>
					<div class="row">
						<div data-row="2" data-col="0" class="cell active"></div>
						<div data-row="2" data-col="1" class="cell active"></div>
						<div data-row="2" data-col="2" class="cell active"></div>
					</div>
				</div>
			</div>
		</div>
	</section>
	<section>
		<div class="container-small">
			<h2>Calculer le Nombre d'Ètats Possibles</h2>
			<p>Il existe <b>3</b> états possibles ( case libre, X, O ) pour chacune des <b>9</b> cases du plateau de jeu.<br>Nombre d’états possibles: <b>3</b>**<b>9</b> = 19 683.</p>
			<p>Cela dit, toutes les combinaisons n’étant pas réalisables selon les règles du jeu, il existe moins de 19 683 états.<br>Sur l'illustration suivante, voici un exemple de l'une des combinaisons impossibles dans le jeu.</p>
			<img src="assets/images/vfunction_01.svg" alt="illustration n°1">
		</div>
	</section>
	<section>
		<div class="container-small">
			<h2>Obtenir l'Ètat en Cours</h2>
			<p>Calculer l'état à partir de l'exemple suivant:</p>
			<img src="assets/images/vfunction_02.svg" alt="illustration n°2">
			<p>Les valeurs: [ <b>X</b>, <b>O</b>, libre, libre, <b>X</b>, libre, libre, libre, libre ] = <span class="code">[ <b>1</b>, <b>2</b>, 0, 0, <b>1</b>, 0, 0, 0, 0 ]</span>.</p>
			<p class="code"><b>v[0]</b> * ( 3**8 ) + <b>v[1]</b> * ( 3**7 ) + v[2] * ( 3**6 ) + v[3] * ( 3**5 ) + <b>v[4]</b> * ( 3**4 ) + v[5] * ( 3**3 ) + v[6] * ( 3**2 ) + v[7] * ( 3**1 ) + v[8].</p>
			<p class="code"><b>1</b> * 6561 + <b>2</b> * 2187 <s>+ 0 * 729 + 0 * 243</s> + <b>1</b> * 81 <s>+ 0 * 27 + 0 * 9 + 0 * 3 + 0</s>.</p>
			<p>L'index de l'état vaut: <span class="code"><b>6561</b> + <b>4374</b> + <b>81</b> = <u>11016</u></span>.</p>
		</div>
	</section>
	<section>
		<div class="container-small">
			<h2>Exploitation</h2>
			<p>La décision optimale est prise à partir du tableau des estimations. L'agent va y sélectionner l'état possédant la plus grande valeur parmi tous les états disponibles en simulant chacun des coups jouables.</p>
		</div>
	</section>
	<section>
		<div class="container-small">
			<h2>L'Apprentissage</h2>
			<p>La récompense étant obtenue en fin de partie, c'est à ce moment là qu'intervient la mise à jour du tableau des estimations. L'historique des états de l'agent est parcouru dans l'ordre antéchronologique. La valeur de chacun des états est mise à jour avec la fonction V. Lorsque le premier état est mis à jour, la valeur pour l'estimation d'état suivant est remplacé par la récompense.</p>
			<p class="code">estimations[état] = estimations[état] + alpha * (estimations[état_suivant] - estimations[état])</p>
			<p>Le taux d'apprentissage (alpha) modifie l'importance de la mise à jour. Il oscille entre 0 et 1. Plus il se rapproche de 0, plus le résultat sera précis mais l'apprentissage demandera davantage d'entrainements.</p>
		</div>
	</section>
	<section>
		<div class="container-small">
			<h2>Code</h2>
			<pre>
				<code class="language-js">
					// LES ÈTATS.
					var State = function(){};

					State.prototype.get_state = function(board)
					{
						// Combiner l'état de chaque case: (board[0] * (3**8)) + (board[1] * (3**7)) + (board[2] * (3**6)) + ... + (board[7] * (3**1)) + board[8].
						var state = 0, mult = 1, base = 3;
						for (var i = board.length - 1; i >= 0; i--)
						{	
							// Modifier les cases de l'agent2 pour obtenir un index valide.
							var value = board[i] == -1 ? 2 : board[i];
							state += (mult * value);
							mult *= base;
						}
						return state;
					};

					// L'ENVIRONNEMENT.
					var Env = function(agent1, agent2, board_length)
					{
						this.agent1 = agent1;
						this.agent2 = agent2;
						this.board_length = board_length;
						this.board;
					};

					Env.prototype.restart = function()
					{
						this.reset_board();
						this.currentAgent = this.agent1;
						this.otherAgent = this.agent2;
					};

					Env.prototype.reset_board = function()
					{
						this.board = [];
						for (var i = 0; i < this.board_length; i++)
						{
							this.board[i] = 0;
						}
					};

					Env.prototype.get_freeCellIndex = function()
					{
						var freeCell_indexes = [];
						for (var i = 0; i < this.board_length; i++)
						{
							if (this.board[i] === 0)
							{
								freeCell_indexes.push(i);
							}
						}
						return freeCell_indexes;
					};

					Env.prototype.step = function(action, get_state)
					{
						// Mise à jour du plateau avec le nouveau coup joué.
						this.board[action] = this.currentAgent.symbol;

						// Enregistrer le nouvel état dans l'historique de l'agent.
						var newState = get_state(this.board);
						this.currentAgent.history.push(newState);

						// Vérifier si la partie est terminée en fonction de la récompense reçue.
						var reward = this.check_gameOver();
						// La partie est terminée.
						if (reward !== null)
						{
							return {state: newState, reward: reward, done: true};
						}
						// La partie continue, c'est au tour de l'autre agent de jouer.
						this.switch_players();
						return {state: newState, reward: reward, done: false};
					};

					Env.prototype.check_gameOver = function()
					{
						var win_combinations = [
							[0, 1 ,2], [3, 4, 5], [6, 7, 8], 
							[0, 3, 6], [1, 4, 7], [2, 5, 8],
							[0, 4, 8], [2, 4, 6]
						];

						for (var i = win_combinations.length - 1; i >= 0; i--)
						{
							var count = 0;
							
							for (var j = win_combinations[i].length - 1; j >= 0; j--)
							{
								count += this.board[win_combinations[i][j]];
							}

							if (Math.abs(count) == 3)
							{
								// Victoire de l'agent actuel: récompense = 1.
								return 1;
							}
						}
						
						if (this.get_freeCellIndex().length === 0)
						{		
							// Match nul: récompense = 0.
							return 0;
						}
						// La partie n'est pas terminée.
						return null;
					};

					Env.prototype.switch_players = function()
					{
						var newCurrent = this.otherAgent;
						this.otherAgent = this.currentAgent;
						this.currentAgent = newCurrent;
					};

					// L'AGENT.
					var Agent = function(symbol, epsilon, alpha, is_train, states_length)
					{
						this.symbol = symbol;
						this.epsilon = epsilon;
						this.alpha = alpha;
						this.is_train = is_train;
						this.wins = 0;
						this.history = [];
						this.estimations;

						this.init(states_length);
					};

					Agent.prototype.init = function(states_length)
					{
						this.init_estimations(states_length);
					};

					Agent.prototype.init_estimations = function(states_length)
					{
						this.estimations = [];
						for (var i = 0; i < states_length; i++)
						{
							// estimations[état] = espérances du gain.
							this.estimations[i] = 0;
						}
					};

					Agent.prototype.choose_action = function(board, get_freeCellIndex, get_state)
					{
						var freeCell_indexes = get_freeCellIndex();
						// Exploration:
						if (Math.random() < this.epsilon)
						{
							return freeCell_indexes[Math.floor(Math.random() * freeCell_indexes.length)];
						}
						// Exploitation:
						else
						{
							// Choisir l'état possédant la plus grande valeur.
							var vmax = -Infinity, index = 0;
							// Parcourir l'index des cases libres.
							for (var i = freeCell_indexes.length - 1; i >= 0; i--)
							{
								// Récupérer l'état pour chacune des cases disponibles jouées.
								board[freeCell_indexes[i]] = this.symbol;
								var state = get_state(board);
								// Mettre de côté l'index de la case possédant la plus grande valeur.
								if (vmax < this.estimations[state])
								{
									vmax = this.estimations[state];
									index = i;
								}
								// Libérer la case jouée.
								board[freeCell_indexes[i]] = 0;
							}
							return freeCell_indexes[index];
						}
					};

					Agent.prototype.update_estimations = function(reward, vFunction)
					{
						if (this.is_train === false)
						{
							this.history = [];
							return;
						}

						for (var i = this.history.length - 1; i >= 0; i--)
						{
							var state = this.history[i];
							// La fonction V ou fonction de valeur des états.
							this.estimations[state] = reward = this.estimations[state] + this.alpha * (reward - this.estimations[state]);
						}
						this.history = [];
					};

					// LA FONCTION V.
					var Vfunction = function()
					{
						// Il existe 3 états possibles (case libre, X, O) pour chacune des 9 cases (3**9).
						this.board_length = 9;
						this.states_length = Math.pow(3, this.board_length);
						this.state = new State();
					};

					Vfunction.prototype.train = function(epoch)
					{
						var agent1 = new Agent(1, 1, 0.1, true, this.states_length);
						var agent2 = new Agent(-1, 1, 0.1, true, this.states_length);
						var env = new Env(agent1, agent2, this.board_length);
						var progression = epoch / 100;

						for (var e = 0; e < epoch; e++)
						{
							// Nouvelle partie.
							env.restart();
							var done = false;
							var reward = null;

							while (done === false)
							{
								var action = env.currentAgent.choose_action(env.board, env.get_freeCellIndex.bind(env), this.state.get_state.bind(this));
								var gameInfos = env.step(action, this.state.get_state.bind(this));
								var state = gameInfos.state;
								reward = gameInfos.reward;
								done = gameInfos.done;
							}
							// Distribution des récompenses et mise à jour des estimations en fin de partie.
							if (reward === 0)
							{
								// Match nul.
								env.agent1.update_estimations(0.1);
								env.agent2.update_estimations(0.5);
							}
							else
							{
								// Victoire de l'agent ayant joué le dernier coup.
								env.currentAgent.wins += 1;
								env.currentAgent.update_estimations(1);
								env.otherAgent.update_estimations(-1);
							}
							// Diminuer progressivement le taux d'exploration.
							if (e % progression === 0)
							{
								agent1.epsilon = Math.max(agent1.epsilon * 0.996, 0.1);
								agent2.epsilon = Math.max(agent2.epsilon * 0.996, 0.1);
							}
						};

						console.log("Entrainement:");
						console.log("Agent1: " + Math.round((agent1.wins / epoch) * 100) + "% de victoire");
						console.log("Agent2: " + Math.round((agent2.wins / epoch) * 100) + "% de victoire");

						return [agent1, agent2];
					};

					Vfunction.prototype.test = function(agent1, agent2, epoch)
					{
						agent1.epsilon = 1;
						agent2.epsilon = 0;
						agent1.wins = agent2.wins = 0;
						var env = new Env(agent1, agent2, this.board_length);
						var progression = epoch / 100;

						for (var e = 0; e < epoch; e++)
						{
							// Nouvelle partie.
							env.restart();
							var done = false;
							var reward = null;

							while (done === false)
							{
								var action = env.currentAgent.choose_action(env.board, env.get_freeCellIndex.bind(env), this.state.get_state.bind(this));
								var gameInfos = env.step(action, this.state.get_state.bind(this));
								var state = gameInfos.state;
								reward = gameInfos.reward;
								done = gameInfos.done;
							}
							if (reward !== 0)
							{
								// Victoire de l'agent ayant joué le dernier coup.
								env.currentAgent.wins += 1;
							}
						};

						console.log("--------------------------------");
						console.log("Test:");
						console.log("Agent1 aléatoire: " + Math.round((agent1.wins / epoch) * 100) + "% de victoire");
						console.log("Agent2 entrainé: " + Math.round((agent2.wins / epoch) * 100) + "% de victoire");
					};

					var demo = new Vfunction();
					var trained_agents = demo.train(10000);
					demo.test(trained_agents[0], trained_agents[1], 100);
				</code>
			</pre>
		</div>
	</section>
<?php $content_main = ob_get_clean();

ob_start();?>
	<script type="text/javascript" src="js/vFunction/Namespaces.js"></script>
	<script type="text/javascript" src="js/tools/Singleton.js"></script>
	<script type="text/javascript" src="js/tools/EventManager.js"></script>
	<script type="text/javascript" src="js/tools/ArrayManager.js"></script>
	<script type="text/javascript" src="js/tools/CanvasManager.js"></script>
	<script type="text/javascript" src="js/modules/Prism.js"></script>
	<script type="text/javascript" src="js/vFunction/Ai.js"></script>
	<script type="text/javascript" src="js/tictactoe/Human.js"></script>
	<script type="text/javascript" src="js/tictactoe/Board.js"></script>
	<script type="text/javascript" src="js/tictactoe/Rules.js"></script>
	<script type="text/javascript" src="js/tictactoe/Game.js"></script>
	<script type="text/javascript" src="js/vFunction/Ai.js"></script>
	<script type="text/javascript" src="js/vFunction/Main.js"></script>
	<script type="text/javascript">
		(function()
		{
			"use strict";
			var demo = new CVM.VFUNCTION.Main();
		}());
	</script>
<?php $content_jsClasses = ob_get_clean();?>

<?php include("template.php"); ?>