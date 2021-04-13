<?php

$content_title = "Algorithme Minimax - IA Initiation";
$meta_description = "Objectif et fonctionnement de l'algorithme Minimax.";
$og_page = "minimax";

ob_start();?>
	<link rel="stylesheet" type="text/css" href="assets/css/style_minimax.css">
	<link rel="stylesheet" type="text/css" href="assets/css/prism.css">
<?php $content_style = ob_get_clean();

ob_start();?>
	<h1>IA<span>INIT (Algorithme Minimax)</span></h1>
<?php $content_h1 = ob_get_clean();

ob_start();?>
	<section>
		<div class="container-small">
			<h2>Présentation</h2>
			<p>L'algorithme Minimax est un algorithme décisionnel utilisé dans les jeux à somme nulle, c'est à dire les jeux où la somme des gains et des pertes est nulle, ce que gagne l'un est perdu par l'autre. Son objectif est de maximiser son gain minimum ou de minimiser le gain maximum de l’adversaire. Il anticipe tous les futurs états possibles du jeu. Pour optimiser la vitesse d'exécution, il est possible de limiter la profondeur d'anticipation. Il est aussi possible de pratiquer un élagage dans l'arbre de jeu, la fonction peut ainsi s'épargner de traiter plusieurs branches dont le calcul serait inutile.</p>
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
				<div class="buttons-container">
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
			<h2>Théorie</h2>
			<img src="./assets/images/minimax_01.png" alt="Plan de l'algorithme Minimax sur le jeu Tic Tac Toe.">
			<img src="./assets/images/alphabeta_01.png" alt="Illustration du fonctionnement d'alpha dans l'élagage alpha-bêta.">
			<img src="./assets/images/alphabeta_02.png" alt="Illustration du fonctionnement de bêta dans l'élagage alpha-bêta.">
		</div>
	</section>
	<section>
		<div class="container-small">
			<h2>L'Optimisation en Quelques Chiffres</h2>
			<p>Les résultats suivants sont obtenus lorsque l'IA joue le premier tour du jeu Tic Tic Toe.</p>
			<ul>
				<li>
					<h3>Sans Alpha-Bêta</h3>
					<ul>
						<li>Sans limitation du nombre de coups anticipés: 549 945 branches sont explorées.</li>
						<li>Avec limitation du nombre de coups anticipés à 6: 73 449 branches sont explorées.</li>
					</ul>
				</li>
				<li>
					<h3>Avec Alpha-Bêta</h3>
					<ul>
						<li>Sans limitation du nombre de coups anticipés: 20 865 branches sont explorées.</li>
						<li>Avec limitation du nombre de coups anticipés à 6: 1885 branches sont explorées.</li>
					</ul>
				</li>
			</ul>
		</div>
	</section>
	<section>
		<div class="container-small">
			<h2>Déroulement</h2>
			<ol>
				<li>Demander le meilleur coup à jouer en fonction de l'état du jeu (la table de jeu, le joueur actuel, le nombre d'anticipations effectuées, ...).
					<ul>
						<li>Vérifier si la partie au tour précédent est terminée. Si c'est le cas, retourner le score en fonction du résultat de la partie.
						<li>Facultatif: Limiter le nombre d'anticipation. Une fois la limite atteinte, retourner le score d'une partie nulle.</li>
						<li>Mise à jour de la valeur de l'anticipation.</li>
						<li>Maximiser ou minimiser les gains en fonction du tour simulé (maximiser si c'est le tour de l'IA, minimiser si c'est celui de l'adversaire).
							<ul>
								<li>Parcourir les cellules libres de la table du jeu.
									<ul>
										<li>Récupérer le meilleur coup parmis les coups possibles pour les tours suivant en rappelant le point 1 avec le nouvel état de jeu.</li>
										<li>Comparer le meilleur coup actuel à l'ancien, réserver le meilleur des deux.</li>
										<li>Facultatif: pratiquer l'élagage alpha ou beta en fonction du tour simulé (alpha si c'est le tour l'adversaire, beta si c'est celui de l'IA). Si l'élagage est positif, retourner le meilleur coup actuel.</li>
										<li>Vérifier si alpha ou beta doit être mis à jour (alpha si c'est le tour de l'IA, beta si c'est celui de l'adversaire).</li>
										<li>Retourner le meilleur coup.</li>
									</ul>
								</li>
							</ul>

						</li>
					</ul>
				</li>
			</ol>
		</div>
	</section>
	<section>
		<div class="container-small">
			<h2>Code</h2>
			<pre>
				<code class="language-js">
					// Le symbole utilisé par l'IA (joueur 1(X) = 1, joueur 2(O) = -1).
					var ai_symbol = 1;

					var is_end = function(board)
					{
						/* 
						 * Méthode qui vérifie le résultat de la partie:
						 * null: La partie n'est pas terminée.
						 * 1 ou -1: La partie est gagnée par l'un des joueurs (en fonction de son symbole).
						 * 0: La partie est nulle.
						 */
					}

					var minimax = function(board, depth, symbol, alpha, beta)
					{
						/*
						 * board: Plateau de jeu.
						 * depth: Nombre d'anticipations éffectuées.
						 * symbol: Symbol du joueur.
						 * alpha: Sert à l'élagage lors du tour de l'adversaire. Il est initilialisé à -l'infini.
						 * beta: Sert à l'élagage lors du tour de l'IA. Il est initilialisé à l'infini.
						 */

						// La partie est-elle terminée?
						var endGame = is_end(board);
						if (endGame.result !== null)
						{
							// L'un des joueur remporte le match.
							if (endGame.result !== 0)
							{
								// Joueur actuel gagne.
								if (endGame.result == ai_symbol)
								{
									// Le score sera positif.
									return { score: 10-depth };
								}
								// Joueur actuel perd.
								else
								{
									// Le score sera négatif.
									return { score: depth-10 };
								}
							}
							// Match nul.
							return { score: 0, endGame: endGame.result, depth: depth };
						}

						// Limitation du nombre d'anticipations.
						if (depth == 6)
						{
							return { score: 0 };
						}
						depth += 1;

						// Anticipation de l'adversaire.
						var bestCell;
						if (symbol !== ai_symbol)
						{
							// Le meilleur score de l'adversaire tendant vers -l'infini, on initialise le meilleur score à +l'infini.
							bestCell = { score: Infinity };

							// Anticiper à partir de toutes les cellules libres.
							for (var i = board.length - 1; i >= 0; i--)
							{
								if (board[i] === 0)
								{
									// Application du symbol adverse pour la cellule.
									board[i] = symbol;
									// Récupérer le resultat des sous-branches d'anticipation.
									var result = get_bestCell(board, depth, ai_symbol, alpha, beta);
									// Remettre la cellule dans son état précédent.
									board[i] = 0;

									// Séléctionner le meilleur choix pour l'adversaire.
									if (result.score < bestCell.score)
									{
										bestCell.score = result.score;
										bestCell.r = r;
										bestCell.c = c;
									}
									// Élagage: alpha étant plus grand ou égal au meilleur score de l'adversaire, il n'est plus nécessaire d'explorer les branches voisines. Lors de son initialisation, alpha était égal à -l'infini.
									if (alpha >= bestCell.score)
									{
										return bestCell;
									}
									// Mise à jour de "beta" avec le score de l'adversaire si celui-ci est meilleur que "beta". Lors de son initialisation, beta était égal à +l'infini.
									beta = Math.min(beta, bestCell.score);
								}
							}
						}
						else
						{
							bestCell = { score: -Infinity };

							for (var i = board.length - 1; i >= 0; i--)
							{
								if (board[i] === 0)
								{
									board[i] = symbol;
									var result = get_bestCell(board, depth, ai_symbol * -1, alpha, beta);
									board[i] = 0;

									if (result.score > bestCell.score)
									{
										bestCell.score = result.score;
										bestCell.r = r;
										bestCell.c = c;
									}
									if (beta <= bestCell.score)
									{
										return bestCell;
									}
									alpha = Math.max(alpha, bestCell.score);
								}
							}
						}

						return bestCell;
					};
				</code>
			</pre>
		</div>
	</section>
<?php $content_main = ob_get_clean();

ob_start();?>
	<script type="text/javascript" src="js/minimax/Namespaces.js"></script>
	<script type="text/javascript" src="js/tools/Singleton.js"></script>
	<script type="text/javascript" src="js/tools/EventManager.js"></script>
	<script type="text/javascript" src="js/tools/ArrayManager.js"></script>
	<script type="text/javascript" src="js/tools/CanvasManager.js"></script>
	<script type="text/javascript" src="js/modules/Prism.js"></script>
	<script type="text/javascript" src="js/minimax/Ai.js"></script>
	<script type="text/javascript" src="js/tictactoe/Human.js"></script>
	<script type="text/javascript" src="js/tictactoe/Board.js"></script>
	<script type="text/javascript" src="js/tictactoe/Rules.js"></script>
	<script type="text/javascript" src="js/tictactoe/Game.js"></script>
	<script type="text/javascript" src="js/minimax/Minimax.js"></script>
	<script type="text/javascript" src="js/minimax/Main.js"></script>
	<script type="text/javascript">
		(function()
		{
			"use strict";
			var demo = new CVM.MINIMAX.Main();
		}());
	</script>
<?php $content_jsClasses = ob_get_clean();?>

<?php include("template.php"); ?>