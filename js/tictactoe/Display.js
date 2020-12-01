(function()
{
	"use strict";

	CVM.TICTACTOE.Display = function()
	{
		this.init();
	};

	CVM.TICTACTOE.Display.prototype.init = function()
	{
		var eventManager = CVM.TOOLS.Singleton.getInstance(CVM.TOOLS.EventManager);
		eventManager.add('resizeWindowToResize_boardCells', window, 'resize', this.resize_boardCells.bind(this));
	};

	CVM.TICTACTOE.Display.prototype.reset = function(rows, cols)
	{
		document.getElementById('result').textContent = '';
		this.build_board(rows, cols);
	};

	CVM.TICTACTOE.Display.prototype.build_board = function(rows, cols)
	{
		var target = document.getElementById('board');

		CVM.TOOLS.DomManager.removeDomElement(document.getElementById('board').childNodes);

		for (var r = 0; r < rows; r++)
		{
			var row = CVM.TOOLS.DomManager.createElement('div', {'class': 'row'}, target)
			for (var c = 0; c < cols; c++)
			{
				CVM.TOOLS.DomManager.createElement('div', {'data-row': r, 'data-col': c, 'class': 'cell active'}, row)
			}
		}

		this.resize_boardCells();
	};

	CVM.TICTACTOE.Display.prototype.resize_boardCells = function()
	{
		var targets = document.querySelectorAll('#board .cell');
		var size = targets[0].offsetWidth + 'px'
		for (var i = targets.length - 1; i >= 0; i--)
		{
			targets[i].style.height = size;
			targets[i].style.height = size;
		}
	};

	CVM.TICTACTOE.Display.prototype.update_board = function(coordinates, symbol)
	{
		var target = document.querySelector('#board .cell[data-row="' + coordinates.r + '"][data-col="' + coordinates.c + '"]');
		target.textContent = symbol == 1 ? 'X' : 'O';
		target.classList.remove('active');
	};

	CVM.TICTACTOE.Display.prototype.gameOver = function(victoryLines)
	{
		var result = document.getElementById('result');
		if (victoryLines)
		{
			this.colorize_victoryLine(victoryLines);
			result.textContent = 'Le joueur ' + (victoryLines[0].symbol === 1 ? '1' : '2') + ' gagne la partie.';
		}
		else
		{
			result.textContent = 'Match Nul.';			
		}
		this.disable_activeCells();
	};

	CVM.TICTACTOE.Display.prototype.colorize_victoryLine = function(victoryLines)
	{
		for (var j = victoryLines.length - 1; j >= 0; j--)
		{
			var coordinates = victoryLines[j].coordinates;
			for (var i = coordinates.length - 1; i >= 0; i--)
			{
				var target = document.querySelector('#board .cell[data-row="' + coordinates[i].r + '"][data-col="' + coordinates[i].c + '"]');
				target.classList.add('victoryCell');
			}
		}
	};

	CVM.TICTACTOE.Display.prototype.disable_activeCells = function(victoryLines)
	{
		var targets = document.querySelectorAll('#board .cell');
		for (var i = targets.length - 1; i >= 0; i--)
		{
			targets[i].classList.remove('active');
		}
	};
}());