<?php

$content_title = "Q-learning - Apprentissage par Renforcement - IA Initiation";
$meta_description = "Objectif et fonctionnement du Q-learning.";
$og_page = "qfunction.php";

ob_start();?>
	<link rel="stylesheet" type="text/css" href="assets/css/qfunction.css">
	<link rel="stylesheet" type="text/css" href="assets/css/prism.css">
<?php $content_style = ob_get_clean();

ob_start();?>
	<h1>IA<span>INIT (Q-learning)</span></h1>
<?php $content_h1 = ob_get_clean();

ob_start();?>
	<section>
		<div class="container-small">
			<h2>Présentation</h2>
			<p>Le Q-learning est une technique d'<a href="reinforcement">apprentissage par renforcement</a>. Il utilise la fonction Q (fonction de valeur des états-actions) qui repose sur un tableau que l'on nomme la Q-table. Les index de cette Q-table représentent les différents état du système. Chaque état dispose d'un tableau d'actions où chacune d'elles possède une valeur correspondant à une estimation qualitative de cette l'action.</p>
		</div>
	</section>
	<section>
		<div class="container-small example-container">
			<h2>Démonstration</h2>
			<div class="snake-container">
				<fieldset class="options-container">
					<legend>Entrainement de l'IA<span id="progress"></span></legend>
					<label><input id="exploringRate" type="number" value="0.4" min="0" max="1" step="0.01">Taux d'exploration (<b>epsilon</b>).</label>
					<label><input id="learningRate" type="number" value="0.2" min="0" max="1" step="0.01">Taux d'apprentissage (<b>alpha</b>).</label>
					<label><input id="discountFactor" type="number" value="0.6" min="0" max="1" step="0.01">Facteur d'actualisation (<b>gamma</b>).</label>
					<label><input id="trainNumber" type="number" value="100" min="100" max="10000" step="100">Nombre de Parties.</label>
				</fieldset>
				<div class="buttons-container">
					<div class="row">
						<button id="btn_trainAi" class="btn" type="button">ENTRAINER</button>
					</div>
					<div class="row">
						<button id="btn_testAi" class="btn" type="button">TESTER</button>
						<button id="btn_speedDownTestAi" class="btn" type="button">[-]</button>
						<button id="btn_speedUpTestAi" class="btn" type="button">[+]</button>
						<button id="btn_pauseTestAi" class="btn" type="button">PAUSE</button>
					</div>
				</div>
				<div class="demo">
					<div id="canvas-container" class="canvas-container">
						<canvas id="canvas-grid" class="canvas-grid"></canvas>
						<canvas id="canvas-apple" class="canvas-apple"></canvas>
						<canvas id="canvas-snake" class="canvas-snake"></canvas>
						<div id="uiGameSpeed" class="uiGameSpeed"></div>
					</div>
					<svg id="stateDescription" class="stateDescription" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="400px"
						 height="400px" viewBox="0 0 400 400" enable-background="new 0 0 400 400" xml:space="preserve">
					<g id="layer2">
						<path id="apple7" fill="white" stroke="#000000" stroke-width="3" stroke-miterlimit="10" d="M91.301,62.18
							c-7.811-7.81-20.475-7.81-28.283,0c-7.812,7.81-7.812,20.474,0,28.284c6.839,6.842,17.406,7.689,25.17,2.545l105.979,105.98
							l5.658-5.655L93.846,87.353C98.99,79.587,98.143,69.021,91.301,62.18z"/>
						<path id="apple6" fill="white" stroke="#000000" stroke-width="3" stroke-miterlimit="10" d="M24.782,179.648
							c-11.045,0.001-20,8.956-19.999,20c-0.001,11.046,8.954,20.001,20,20c9.674,0.002,17.745-6.871,19.598-15.999l149.878,0.001
							l0.002-8l-149.879-0.001C42.528,186.52,34.458,179.648,24.782,179.648z"/>
						<path id="apple5" fill="white" stroke="#000000" stroke-width="3" stroke-miterlimit="10" d="M63.332,309.814
							c-7.81,7.811-7.81,20.475,0,28.283c7.81,7.812,20.474,7.812,28.284,0c6.842-6.84,7.688-17.406,2.544-25.171l105.981-105.979
							l-5.655-5.658L88.505,307.27C80.739,302.125,70.174,302.973,63.332,309.814z"/>
						<path id="apple4" fill="white" stroke="#000000" stroke-width="3" stroke-miterlimit="10" d="M179.891,374.694
							c0,11.045,8.955,20,20,19.999c11.045,0.001,20-8.954,20-20c0.001-9.675-6.872-17.745-16-19.598l0.001-149.879l-8-0.002l0,149.88
							C186.762,356.948,179.891,365.019,179.891,374.694z"/>
						<path id="apple3" fill="white" stroke="#000000" stroke-width="3" stroke-miterlimit="10" d="M309.247,337.892
							c7.811,7.811,20.474,7.811,28.283,0c7.811-7.81,7.811-20.474,0-28.284c-6.841-6.842-17.406-7.688-25.171-2.544l-105.98-105.981
							l-5.657,5.656l105.98,105.981C301.558,320.485,302.405,331.051,309.247,337.892z"/>
						<path id="apple2" fill="white" stroke="#000000" stroke-width="3" stroke-miterlimit="10" d="M374.657,220.324
							c11.046,0,20-8.954,20-20c0.001-11.045-8.954-20-20-20c-9.675,0-17.745,6.872-19.598,16l-149.88,0v8h149.879
							C356.912,213.453,364.982,220.325,374.657,220.324z"/>
						<path id="apple1" fill="white" stroke="#000000" stroke-width="3" stroke-miterlimit="10" d="M337.909,91.619
							c7.811-7.811,7.811-20.474,0-28.284c-7.81-7.81-20.474-7.811-28.284,0c-6.842,6.841-7.688,17.407-2.544,25.171L201.1,194.486
							l5.657,5.657l105.98-105.98C320.503,99.308,331.068,98.46,337.909,91.619z"/>
						<path id="apple0" fill="white" stroke="#000000" stroke-width="3" stroke-miterlimit="10" d="M220,25c0-11.045-8.954-20-20-20
							c-11.045,0-20,8.955-20,20c0,9.675,6.872,17.745,16,19.598v149.879h8V44.599C213.129,42.745,220,34.675,220,25z"/>
					</g>
					<g id="layer1">
						<path id="circle" fill="#f5f3dc" stroke="#000000" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" d="
							M300.012,200.659c0,55.102-44.671,99.772-99.782,99.772c-55.101,0-99.772-44.671-99.772-99.772
							c0-55.11,44.671-99.782,99.772-99.782C255.341,100.877,300.012,145.549,300.012,200.659z"/>
						<polygon id="arrowRight" fill="#7CC473" stroke="#000000" stroke-width="3" stroke-miterlimit="10" points="231.793,224.838 
							231.793,174.938 280.334,199.964 	"/>
						<polygon id="arrowFront" fill="#7CC473" stroke="#000000" stroke-width="3" stroke-miterlimit="10" points="225.014,169.158 
							175.113,169.158 200.14,120.617 	"/>
						<polygon id="arrowLeft" fill="#7CC473" stroke="#000000" stroke-width="3" stroke-miterlimit="10" points="168.334,174.937 
							168.334,224.838 119.793,199.811 	"/>
						<text id="surrounding2" class="text" transform="matrix(1 0 0 1 240 205)">0</text>
						<text id="surrounding1" class="text" transform="matrix(1 0 0 1 192 161)">0</text>
						<text id="surrounding0" class="text" transform="matrix(1 0 0 1 146 205)">0</text>
						<text id="apple7" class="text" transform="matrix(0.7071 -0.7071 0.7071 0.7071 77 85)">1</text>
						<text id="apple6" class="text" transform="matrix(-5.960464e-008 -1 1 -5.960464e-008 30 206)">2</text>
						<text id="apple5" class="text" transform="matrix(-0.7071 -0.7071 0.7071 -0.7071 86 323)">3</text>
						<text id="apple4" class="text" transform="matrix(-1 0 0 -1 206 369)" font-family="'Arial-BoldMT'">4</text>
						<text id="apple3" class="text" transform="matrix(-0.7071 0.7071 -0.7071 -0.7071 323 314)">5</text>
						<text id="apple2" class="text" transform="matrix(-4.371139e-008 1 -1 -4.371139e-008 369 194)">6</text>
						<text id="apple1" class="text" transform="matrix(0.7071 0.7071 -0.7071 0.7071 316 78)">7</text>
						<text id="apple0" class="text" transform="matrix(1 0 0 1 193 32)">0</text>
					</g>
					</svg>
				</div>
				<div class="graph-legend">
					<h3>États</h3>
					<ul class="colors">
						<li>
							<span class="square green"></span>
							<span>Collisions aux alentours de la tête du serpent: 
								<span class="states">(3 directions possibles = 2**3 = 8 états possibles).</span>
								<div class="states">|
									<span class="surroundingResult">a</span><span> = </span><span id="description_surrounding0" class="statesValue">a1</span> * 4 + <span id="description_surrounding1" class="statesValue">a2</span> * 2 + <span id="description_surrounding2" class="statesValue">a3</span> = <span id="description_surroundingResult" class="surroundingResult">?</span>
								</div>
							</span>
						</li>
						<li>
							<span class="square red"></span>
							<span>Direction de la pomme:
								<span class="states">(8 directions = 8 états possibles).</span>
								<div class="states">|
									<span class="appleDirectionResult">b</span><span> = </span><span id="appleDirectionResult" class="appleDirectionResult">?</span>
								</div>
							</span>
						</li>
						<li>
							<span class="square"></span>
							<span>État: 
								<span class="states">(8 * 8 = 64 états possibles).</span>
								<div class="states">|
									<span id="finalState0" class="surroundingResult">a</span> * 8 + <span id="finalState1" class="appleDirectionResult">b</span> = <span id="finalStateResult" class="finalStateResult">?</span>
								</div>
							</span>
						</li>
					</ul>
					<h3>Exploitation</h3>
					<ul class="colors">
						<li>
							<span class="square"></span>
							<span>Action: 
								<span class="states">(max( Q-Table[ état ])).</span>
								<div class="states">|
									<span>Q-Table[ <span id="description_qTableState" class="finalStateResult">?</span> ][ <span id="description_qTableAction0">?</span>, <span id="description_qTableAction1">?</span>, <span id="description_qTableAction2">?</span> ] = <span id="description_action" class="action_choice">?</span></span>
								</div>
							</span>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</section>
	<section>
		<div class="container-small">
			<h2>L'Exploitation</h2>
			<p>La décision optimale est prise à partir de la Q-table. L'agent va y sélectionner l'action possédant la plus grande valeur parmi toutes les actions disponibles pour l'état actuel</p>
	</section>
	<section>
		<div class="container-small">
			<h2>L'Apprentissage</h2>
			<p>Les récompenses étant distribuées après chaque action de l'agent, c'est à ce moment là que la valeur de l'action est mise à jour dans la Q-table à l'aide de la fonction Q.</p>
			<p class="code">q_table[état][action] = (1 - alpha) * q_table[état][action] + alpha * (récompense + gamma * q_table[état_suivant][argmax(q_table[état_suivant])])</p>
			<p>Le facteur d'actualisation (gamma) modifie l'importance de l'influence de la meilleure action à l'état suivant sur l'action courrante. Il oscille entre 0 et 1. Plus la valeur se rapprochent de 1, plus l'influence sera forte.</p>
		</div>
	</section>
	<section>
		<div class="container-small">
			<h2>Code</h2>
			<pre>
				<code class="language-js">
					// LE MODULO (adapté pour jongler avec les orientations relatives).
					var modulo = function(a, b)
					{
						return ((a % b) + b) % b;
					};

					// LES ÉTATS.
					var State = function(){}; 

					State.prototype.get_state = function(agent, apple, check_wallCollision, check_tailCollision)
					{
						// Coordonnées de la tête du serpent.
						var x = agent.matrix[0][0];
						var y = agent.matrix[0][1];

						var st1 = this.get_surrounding(x, y, agent, check_wallCollision, check_tailCollision);
						var st2 = this.get_appleDirection(x, y, agent.orientation, apple);

						// Combiner les états (8*8 état possibles).
						return parseInt(st1 * 8 + st2);
					};

					State.prototype.get_surrounding = function(x, y, agent, check_wallCollision, check_tailCollision)
					{
						// Présence de collisions aux alentours de la tête du serpent pour les 3 actions (2**3).
						var surrounding = [0, 0, 0];

						for (var i = surrounding.length - 1; i >= 0; i--)
						{
							var new_ori = modulo((agent.orientation + i - 1), 4);
							var new_pos = [x + agent.moves[new_ori][0], y + agent.moves[new_ori][1]];
							surrounding[i] = (check_wallCollision(new_pos) || check_tailCollision(new_pos));
						}

						return surrounding[0] * 4 + surrounding[1] * 2 + surrounding[2];
					};

					State.prototype.get_appleDirection = function(x, y, orientation, apple)
					{
						// Direction de la pomme en fonction de la position et de l'orientatation du serpent (8**1).
						var state;
						var ax = apple[0];
						var ay = apple[1];

						// Nord.
						if (ax == x && ay < y)
						{
							state = modulo((0 + 2 * orientation), 8);
						}
						// Nord-Est.
						else if (ax > x && ay < y)
						{
							state = modulo((7 + 2 * orientation), 8);
						}
						// Est.
						else if (ax > x && ay == y)
						{
							state = modulo((6 + 2 * orientation), 8);
						}
						// Sud-Est.
						else if (ax > x && ay > y)
						{
							state = modulo((5 + 2 * orientation), 8);
						}
						// Sud.
						else if (ax == x && ay > y)
						{
							state = modulo((4 + 2 * orientation), 8);
						}
						// Sud-Ouest.
						else if (ax < x && ay > y)
						{
							state = modulo((3 + 2 * orientation), 8);
						}
						// Ouest.
						else if (ax < x && ay == y)
						{
							state = modulo((2 + 2 * orientation), 8);
						}
						// Nord-Ouest.
						else if (ax < x && ay < y)
						{
							state = modulo((1 + 2 * orientation), 8);
						}

						return state;
					};

					// L'ENVIRONNEMENT.
					var Env = function(agent, cols_length, rows_length)
					{
						this.agent = agent;
						this.cols_length = cols_length;
						this.rows_length = rows_length;
						this.apple;
						this.time;
					};

					Env.prototype.restart = function()
					{
						this.time = 0;
						this.agent.reset(this.cols_length, this.rows_length);
						this.reset_apple();
					};

					Env.prototype.step = function(action)
					{
						this.time += 1;
						this.agent.update_orientation(action);
						return this.update(this.agent.get_newPosition());
					};

					Env.prototype.update = function(new_pos)
					{
						if (!this.check_wallCollision(new_pos) && !this.check_tailCollision(new_pos) && this.time < (this.rows_length * this.cols_length))
						{
							// Mettre la position de la tête à jour.
							this.agent.matrix.unshift(new_pos);

							// Pomme mangée.
							if (this.apple[0] == this.agent.matrix[0][0] && this.apple[1] == this.agent.matrix[0][1])
							{
								// Si la taille du serpent est égale au nombre de cases dans l'aire de jeu la partie est gagnée.
								if (this.agent.matrix.length == this.rows_length * this.cols_length)
								{
									// Partie gagnée - grosse récompense positive.
									return {reward: this.rows_length * this.cols_length, done: true};
								}

								this.time = 0;
								// Trouver une nouvelle position aléatoire pour la pomme.
								this.reset_apple();
								// Pomme mangée - récompense positive.
								return {reward: 1, done: false};
							}

							// Effacer l'ancienne position du bout de la queue.
							this.agent.matrix.pop(this.agent, this.cols_length, this.rows_length);
							// Mouvement du serpend - pas de récompense.
							return {reward: 0, done: false};
						}
						// Partie perdue - récompense négative.
						return {reward: -1, done: true};
					};

					Env.prototype.reset_apple = function()
					{
						var grid = [];
						var agent = JSON.stringify(this.agent.matrix);
						for (var c = 0; c < this.cols_length; c++)
						{
							for (var r = 0; r < this.rows_length; r++)
							{
								// Inclure uniquement les cases libres.
								if (agent.indexOf('['+c+','+r+']') === -1)
								{
									grid.push([c, r]);
								}
							}
						}
						this.apple = grid[Math.floor(Math.random() * grid.length)];
					};

					Env.prototype.check_wallCollision = function(coordinates)
					{
						// Vérifier la collision entre des coordonnées et les murs exterieurs du plateau de jeu.
						if ((coordinates[0] >= 0 && coordinates[0] < this.cols_length) && (coordinates[1] >= 0 && coordinates[1] < this.rows_length))
						{
							return false;
						}
						return true;
					};

					Env.prototype.check_tailCollision = function(coordinates)
					{
						//Vérifier la collision entre des coordonnées et les différentes parties de la queue du serpent.
						for (var i = this.agent.matrix.length - 1; i > 0; i--)
						{
							var pos = this.agent.matrix[i];
							if (coordinates[0] == pos[0] && coordinates[1] == pos[1])
							{
								return true;
							}
						}
						return false;
					};

					// L'AGENT.
					var Agent = function(states_length, actions_length, defaultValue, epsilon, alpha, gamma)
					{
						// Le tableau de valeur des états-actions.
						this.q_table = this.init_qTable(states_length, actions_length, defaultValue);
						// Taux d'exploration.
						this.epsilon = epsilon;
						// Taux d'apprentissage.
						this.alpha = alpha;
						// Facteur d'actualisation.
						this.gamma = gamma;
						// Déplacement: haut, droite, bas, gauche.
						this.moves = [[0, -1], [1, 0], [0, 1], [-1, 0]];
						// 0: haut, 1: droite, 2: bas, 3: gauche.
						this.orientation;
						// Les coordonnées des différents éléments du serpent.
						this.matrix;
					};

					Agent.prototype.init_qTable = function(states_length, actions_length, defaultValue)
					{
						var q_table = [];
						for (var s = 0; s < states_length; s++)
						{
							q_table[s] = [];
							for (var a = 0; a < actions_length; a++)
							{
								q_table[s][a] = defaultValue;
							}
						}
						return q_table;
					};

					Agent.prototype.reset = function(cols_length, rows_length)
					{
						this.orientation = 0;
						// Position aléatoire.
						this.matrix = [[Math.floor(Math.random() * cols_length), Math.floor(Math.random() * rows_length)]];
					};

					Agent.prototype.update_orientation = function(action)
					{
						this.orientation = modulo(this.orientation + action - 1, 4);
					};

					Agent.prototype.get_newPosition = function()
					{
						return [this.matrix[0][0] + this.moves[this.orientation][0], this.matrix[0][1] + this.moves[this.orientation][1]];
					};

					Agent.prototype.choose_action = function(state)
					{
						// Exploration:
						if (Math.random() < this.epsilon)
						{
							return Math.floor(Math.random() * 3);
						}
						// Exploitation:
						else
						{
							// Choisir l'action possédant la plus grande valeur.
							return this.argmax(this.q_table[state]);
						}
					};

					Agent.prototype.argmax = function(array)
					{
						var max = -Infinity;
						var index;
						for (var i = array.length - 1; i >= 0; i--)
						{
							if (array[i] > max)
							{
								max = array[i];
								index = i;
							}
						}
						return index;
					};

					Agent.prototype.update_qTable = function(state, action, next_state, reward)
					{
						// La fonction Q ou fonction de valeur des états-actions.
						this.q_table[state][action] = (1 - this.alpha) * this.q_table[state][action] + this.alpha * (reward + this.gamma * this.q_table[next_state][this.argmax(this.q_table[next_state])]);
					};

					// LE Q-LEARNING.
					var Qlearning = function()
					{
						this.cols_length = 10;
						this.rows_length = 10;
						this.state = new State();
					};

					Qlearning.prototype.train = function(epoch, batch_size)
					{
						var agent = new Agent(64, 3, 0, 1, 0.1, 0.1);
						var env = new Env(agent, this.cols_length, this.rows_length);

						// Le nombre d'entrainement avec une diminution progressive d'epsilon et d'alpha.
						for (var e = 0; e < epoch; e++)
						{
							var scores = [];
							// Le nombre d'entrainement avec les valeurs d'epsilon et d'alpha actuelles.
					        for (var b = 0; b < batch_size; b++)
					        {
					            env.restart();
					            var state = this.state.get_state(env.agent, env.apple, env.check_wallCollision.bind(env), env.check_tailCollision.bind(env));
					            var done = false;
					            while (done === false)
					            {
					                var action = env.agent.choose_action(state);
					                var gameInfos = env.step(action);
					                var next_state = this.state.get_state(env.agent, env.apple, env.check_wallCollision.bind(env), env.check_tailCollision.bind(env));
					                var reward = gameInfos.reward;
					               	env.agent.update_qTable(state, action, next_state, reward);

									done = gameInfos.done;
									state = next_state;
					            }
					            scores.push(env.agent.matrix.length);
					        }
					        // Afficher les statistiques.
					       	this.display_results(scores, e, env.agent);
					        // Diminuer le taux d'exploration.
					       	env.agent.epsilon *= 0.95;
					    	// Diminuer le taux d'apprentissage.
					        env.agent.alpha *= 0.99;

						};
					};

					Qlearning.prototype.display_results = function(array, epoch, agent)
					{
						var output = 0;
						var length = array.length;
						for (var i = 0; i < length; i++)
						{
							output += array[i];
						}
						var average = Math.round(output / length);
						console.log(epoch + " | moyenne: " + average + ", max: " + array[agent.argmax(array)] + ", epsilon: " + Math.round(agent.epsilon * 1000) / 1000 + ", alpha: " + Math.round(agent.alpha * 1000) / 1000 + ", gamma: " + agent.gamma);
					};

					var demo = new Qlearning();
					demo.train(100, 100);
				</code>
			</pre>
		</div>
	</section>
<?php $content_main = ob_get_clean();

ob_start();?>
	<script type="text/javascript" src="js/modules/Prism.js"></script>
	<script type="text/javascript" src="js/tools/Math.js"></script>
	<script type="text/javascript" src="js/tools/DomManager.js"></script>
	<script type="text/javascript" src="js/tools/CanvasManager.js"></script>
	<script type="text/javascript" src="js/qFunction/Namespaces.js"></script>
	<script type="text/javascript" src="js/snake/Board.js"></script>
	<script type="text/javascript" src="js/snake/Snake.js"></script>
	<script type="text/javascript" src="js/snake/Game.js"></script>
	<script type="text/javascript" src="js/qFunction/Description.js"></script>
	<script type="text/javascript" src="js/qFunction/State.js"></script>
	<script type="text/javascript" src="js/qFunction/Ai.js"></script>
	<script type="text/javascript" src="js/qFunction/Main.js"></script>
	<script type="text/javascript">
		(function()
		{
			"use strict";
			var demo = new CVM.QFUNCTION.Main();
		}());
	</script>
<?php $content_jsClasses = ob_get_clean();?>

<?php include("template.php"); ?>