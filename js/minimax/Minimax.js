(function()
{
	"use strict";

	CVM.MINIMAX.Minimax = function(is_end)
	{
		// Référence à la méthode qui permettra de tester la fin de partie pour chaque anticipation.
		this.is_end = is_end;
		// Le nombre de rangées du plateau de jeu.
		this.rows;
		// Le nombre de colonnes du plateau de jeu.
		this.cols;
		// La longeur désirée pour une serie gagnante.
		this.serie_length;
		// Le joueur correspond au symbole utilisé par l'IA (joueur 1(X) = 1, joueur 2(O) = -1).
		this.player;
	};

	CVM.MINIMAX.Minimax.prototype.set_gameInfos = function(rows, cols, serie_length, player)
	{
		this.rows = rows;
		this.cols = cols;
		this.serie_length = serie_length;
		this.player = player;
	};

	CVM.MINIMAX.Minimax.prototype.get_bestCell = function(matrix, depth, symbol, alpha, beta, t)
	{
		// Envoyer le numéro du tour précédent pour tester la fin de partie.
		var endGame = this.is_end(matrix, this.serie_length, t + depth - 1);

		// La partie est-elle terminée?
		if (endGame.result !== null)
		{
			// L'un des joueur remporte le match.
			if (endGame.result !== 0)
			{
				// Joueur actuel gagne.
				if (endGame.result == this.player)
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
		if (symbol !== this.player)
		{
			// Le meilleur score de l'adversaire tendant vers -l'infini, on initialise le meilleur score à +l'infini.
			bestCell = { score: Infinity };

			// Anticiper à partir de toutes les cellules libres.
			for (var r = 0; r < this.rows; r++)
			{
				for (var c = 0; c < this.cols; c++)
				{
					if (matrix[r][c] === 0)
					{
						// Application du symbol adverse pour la cellule.
						matrix[r][c] = symbol;
						// Récupérer le resultat des sous-branches d'anticipation.
						var result = this.get_bestCell(matrix, depth, this.player, alpha, beta, t);
						// Remettre la cellule dans son état précédent.
						matrix[r][c] = 0;

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
		}
		else
		{
			bestCell = { score: -Infinity };

			for (var r = 0; r < this.rows; r++)
			{
				for (var c = 0; c < this.cols; c++)
				{
					if (matrix[r][c] === 0)
					{
						matrix[r][c] = symbol;
						var result = this.get_bestCell(matrix, depth, this.player * -1, alpha, beta, t);
						matrix[r][c] = 0;

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
		}

		return bestCell;
	};
}());