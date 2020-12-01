(function()
{
	"use strict";

	CVM.TICTACTOE.Rules = function()
	{
		this.victoryLines;
	};

	CVM.TICTACTOE.Rules.prototype.is_end = function(board, serieLength, t)
	{
		// Vérifier que la partie soit terminée après x tours (avant ça n'est pas possible).
		if (t < (serieLength * 2) - 1)
		{
			return {'result': null};
		}

		this.victoryLines = [];

		var rows = board.length;
		var cols = board[0].length;
		var h = [0, '', []]; //[serieLength, symbol, coordinates]
		var v = [];

		for (var r = 0; r < rows; r++)
		{
			h = [0, ''];
			for (var c = 0; c < cols; c++)
			{
				v[c] = typeof v[c] == "undefined" ? [0, '', []] : v[c];

				var list = [h, v[c]];

				for (var i = list.length - 1; i >= 0; i--)
				{
					this.updateVictoryLines(board, list[i], serieLength, r, c);
				}
				// Vérifier les diag \
				if ((r === 0 && c <= cols - (serieLength - 1)) || (c === 0 && r <= rows - (serieLength - 1)))
				{
					this.checkDiag(board, serieLength, r, c, 1)
				}
				// Vérifier les diag /
				if ((r === 0 && c >= (serieLength - 1)) || (c === cols - 1 && r <= serieLength - 1))
				{
					this.checkDiag(board, serieLength, r, c, -1)
				}
			}
		}
		// Victoire.
		if (this.victoryLines.length > 0)
		{
			return {'result': this.victoryLines[0].symbol, 'victoryLines': this.victoryLines};
		}
		// Match nul.
		if (t >= rows * cols)
		{
			return {'result': 0};
		}

		return {'result': null};
	};

	CVM.TICTACTOE.Rules.prototype.checkDiag = function(board, serieLength, r, c, direction)
	{
		var diag = [0, '', []];
		while (typeof board[r] != 'undefined' && typeof board[r][c] != 'undefined')
		{
			if (this.updateVictoryLines(board, diag, serieLength, r, c))
			{
				return;
			}
			r += 1;
			c += direction;
		}
	}

	CVM.TICTACTOE.Rules.prototype.updateVictoryLines = function(board, line, serieLength, r, c)
	{
		if (board[r][c] === line[1] && board[r][c] !== 0)
		{
			line[0] += 1;
			line[2].push({'r': r, 'c': c});
		}
		else
		{
			line[0] = 1;
			line[1] = board[r][c];
			line[2] = [{'r': r, 'c': c}];
		}
		if (line[0] >= serieLength)
		{
			this.victoryLines.push({'coordinates': line[2], 'symbol': line[1]});
			return true;
		}
		return false;
	}
}());