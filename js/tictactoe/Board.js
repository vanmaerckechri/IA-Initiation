(function()
{
	"use strict";

	CVM.TICTACTOE.Board = function(is_display)
	{
		this.is_display = is_display;
		this.rows = 3;
		this.cols = 3;
		this.serie_length = 3;
		this.matrix;

		this.init();
	};

	CVM.TICTACTOE.Board.prototype.init = function()
	{
		window.addEventListener("resize", this.resize.bind(this));

		this.reset();
	};

	CVM.TICTACTOE.Board.prototype.reset = function()
	{
		this.reset_matrix();
		this.reset_html();
		this.resize();
	};

	CVM.TICTACTOE.Board.prototype.reset_matrix = function(rows, cols)
	{
		this.matrix = [];
		for (var r = this.rows - 1; r >= 0; r--)
		{
			this.matrix[r] = [];
			for (var c = this.cols - 1; c >= 0; c--)
			{
				this.matrix[r][c] = 0;
			}
		}
	};

	CVM.TICTACTOE.Board.prototype.reset_html = function()
	{
		var cells = document.querySelectorAll('#tictactoe-board .cell');

		for (var i = cells.length - 1; i >= 0; i--)
		{
			cells[i].className = "cell active";
			cells[i].textContent = "";
		}
	};

	CVM.TICTACTOE.Board.prototype.get_hashState = function(board)
	{
		/*
		 * board = [x0, x1, x2, x3, x4, x5, x6, x7, x8] (9 cases).
		 * Dans ce cas, chaque case a 3 valeurs possibles (0, 1 ou 2).
		 * Nombre d'états possibles	= 6561 * 3 = 19683 = (3**9).
		 * hashState = (x0 * 6561) + (x1 * 2187) + (x2 * 729) + ...................................... + (x7 * 3) + x8.
		 */

		var board = typeof board == 'undefined' ? this.matrix : board;
		var hashState = 0;
		var mult = 1;

		for (var r = this.rows - 1; r >= 0; r--)
		{
			for (var c = this.cols - 1; c >= 0; c--)
			{
				var value = board[r][c];
				// Replacer les valeurs négatives.
				if (value == -1)
				{
					value = 2;
				}
				hashState += (mult * value);
				mult = mult * 3;
			}
		}

		return hashState;
	};

	CVM.TICTACTOE.Board.prototype.get_emptyCells = function()
	{
		var emptyCells = [];
		for (var r = 0; r < this.rows; r++)
		{
			for (var c = 0; c < this.cols; c++)
			{
				if (this.matrix[r][c] === 0)
				{
					emptyCells.push({'r': r, 'c': c});
				}
			}
		}
		return emptyCells;
	};

	CVM.TICTACTOE.Board.prototype.get_nextState = function(r, c, symbol)
	{
		var nextBoard = JSON.parse(JSON.stringify(this.matrix));
		nextBoard[r][c] = symbol;
		return nextBoard;
	}

	CVM.TICTACTOE.Board.prototype.update = function(coordinates, symbol)
	{
		this.update_matrix(coordinates.r, coordinates.c, symbol);
		this.update_html(coordinates.r, coordinates.c, symbol);
	};

	CVM.TICTACTOE.Board.prototype.update_matrix = function(r, c, symbol)
	{
		this.matrix[r][c] = symbol;
	};

	CVM.TICTACTOE.Board.prototype.update_html = function(r, c, symbol)
	{
		if (this.is_display === false)
		{
			return;
		}
		var target = document.querySelector('#tictactoe-board .cell[data-row="' + r + '"][data-col="' + c + '"]');
		symbol = symbol == 1 ? 'X' : 'O';
		target.textContent = symbol;
		target.classList.add('player' + symbol);
		target.classList.remove('active');
	};

	CVM.TICTACTOE.Board.prototype.resize = function()
	{
		var targets = document.querySelectorAll('#tictactoe-board .cell');
		var size = targets[0].offsetWidth
		for (var i = targets.length - 1; i >= 0; i--)
		{
			targets[i].style.height = size + 'px';
			targets[i].style.fontSize = size / 2 + 'px';
		}
	};

	CVM.TICTACTOE.Board.prototype.close = function(victoryLines)
	{
		if (this.is_display === false)
		{
			return;
		}
		this.disable_activations();
		this.colorize_victoryLine(victoryLines);
	};

	CVM.TICTACTOE.Board.prototype.disable_activations = function()
	{
		for (var r = 0; r < this.rows; r++)
		{
			for (var c = 0; c < this.cols; c++)
			{
				if (this.matrix[r][c] === 0)
				{
					var target = document.querySelector('#tictactoe-board .cell[data-row="' + r + '"][data-col="' + c + '"]');
					target.classList.remove('active');
				}
			}
		}
	};

	CVM.TICTACTOE.Board.prototype.colorize_victoryLine = function(victoryLines)
	{
		for (var j = victoryLines.length - 1; j >= 0; j--)
		{
			var coordinates = victoryLines[j].coordinates;
			for (var i = coordinates.length - 1; i >= 0; i--)
			{
				var target = document.querySelector('#tictactoe-board .cell[data-row="' + coordinates[i].r + '"][data-col="' + coordinates[i].c + '"]');
				target.classList.add('victoryCell');
			}
		}
	};
}());