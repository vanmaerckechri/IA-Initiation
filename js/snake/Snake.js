(function()
{
	"use strict";

	CVM.SNAKE.Snake = function()
	{
		// Déplacement: haut, droite, bas, gauche.
		this.moves = [[0, -1], [1, 0], [0, 1], [-1, 0]];
		// 0-up 1-right 2-down 3-left.
		this.orientation;
		this.matrix;
	};

	CVM.SNAKE.Snake.prototype.reset = function(cols, rows)
	{
		this.orientation = 0;
		this.matrix = [[Math.floor(Math.random() * cols), Math.floor(Math.random() * rows)]];
	};

	CVM.SNAKE.Snake.prototype.update_orientation = function(action)
	{
		this.orientation = CVM.TOOLS.Math.modulo(this.orientation + action - 1, 4);
	};

	CVM.SNAKE.Snake.prototype.get_newPosition = function()
	{
		return [this.matrix[0][0] + this.moves[this.orientation][0], this.matrix[0][1] + this.moves[this.orientation][1]];
	};
}());