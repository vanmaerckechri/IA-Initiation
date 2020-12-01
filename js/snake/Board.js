(function()
{
	"use strict";

	CVM.SNAKE.Board = function(cols, rows)
	{
		this.cols = cols;
		this.rows = rows;
		this.state = new CVM.QFUNCTION.State(cols, rows);
		this.canvas = {};
		this.ctx = {};
		this.tileSize;
		this.halfTileSize;
	};

	CVM.SNAKE.Board.prototype.resize = function(apple, snake)
	{
		var container = document.getElementById("canvas-container");
		this.canvas.grid = document.getElementById("canvas-grid");
		this.canvas.apple = document.getElementById("canvas-apple");
		this.canvas.snake = document.getElementById("canvas-snake");
		this.tileSize = Math.floor(container.offsetWidth / this.cols);
		this.halfTileSize = Math.round(this.tileSize / 2)
		var width = this.tileSize * this.cols;
		var height = this.tileSize * this.rows;
		var margin = container.offsetWidth - width;
		this.ctx.grid = CVM.TOOLS.CanvasManager.init_canvas(this.canvas.grid, width, height);
		this.ctx.apple = CVM.TOOLS.CanvasManager.init_canvas(this.canvas.apple, width, height);
		this.ctx.snake = CVM.TOOLS.CanvasManager.init_canvas(this.canvas.snake, width, height);
		container.style.height = height + margin + "px";

		this.draw_grid();
		this.draw_items(apple, snake);
	};

	CVM.SNAKE.Board.prototype.draw_grid = function()
	{
		CVM.TOOLS.CanvasManager.clear(this.ctx.grid, this.canvas.grid);

		var colorInfos = {strokeColor: "rgb(75, 75, 100)", lineWidth: 1}

		var right = this.cols * this.tileSize;
		for (var r = this.rows; r >= 0; r--)
		{
			var y = r * this.tileSize;
			CVM.TOOLS.CanvasManager.draw_line(this.ctx.grid, [[0, y], [right, y]], colorInfos);
		}

		var bottom = this.rows * this.tileSize;
		for (var c = this.cols; c >= 0; c--)
		{
			var x = c * this.tileSize;
			CVM.TOOLS.CanvasManager.draw_line(this.ctx.grid, [[x, 0], [x, bottom]], colorInfos);
		}
	};

	CVM.SNAKE.Board.prototype.draw_items = function(apple, snake)
	{
		this.draw_apple(apple);
		this.draw_snake(snake);
	};

	CVM.SNAKE.Board.prototype.draw_apple = function(apple)
	{
		if (!apple)
		{
			return;
		}

		CVM.TOOLS.CanvasManager.clear(this.ctx.apple, this.canvas.apple);
		CVM.TOOLS.CanvasManager.draw_circle(this.ctx.apple, (apple[0] * this.tileSize) + this.halfTileSize, (apple[1] * this.tileSize) + this.halfTileSize, this.halfTileSize - 2, {fillColor: "red"});
	};

	CVM.SNAKE.Board.prototype.draw_snake = function(snake)
	{
		if (!snake || !snake.matrix)
		{
			return;
		}

		CVM.TOOLS.CanvasManager.clear(this.ctx.snake, this.canvas.snake);

		// corps.
		var g = 255;
		var b = 50;
		var r = 50;

		for (var i = 0, length = snake.matrix.length; i < length; i++)
		{
			CVM.TOOLS.CanvasManager.draw_rect(this.ctx.snake, snake.matrix[i][0] * this.tileSize, snake.matrix[i][1] * this.tileSize, this.tileSize, this.tileSize, {fillColor: "rgb(" + r + ", " + g + ", " + b + ")", strokeColor: "black", lineWidth: 1});
			g = Math.max(200, g * 0.9);
			//b = Math.min(100, b * 1.05);
			r = Math.min(175, r * 1.05);
		}

		// yeux.
		var x1, y1, x2, y2;
		if (snake.orientation === 0)
		{
			x1 = snake.matrix[0][0] * this.tileSize + Math.floor(this.tileSize / 4);
			y1 = snake.matrix[0][1] * this.tileSize + Math.floor(this.tileSize / 4);

			x2 = snake.matrix[0][0] * this.tileSize + Math.floor(this.tileSize / 4 * 3);
			y2 = snake.matrix[0][1] * this.tileSize + Math.floor(this.tileSize / 4);
		}
		else if (snake.orientation === 1)
		{
			x1 = snake.matrix[0][0] * this.tileSize + Math.floor(this.tileSize / 4 * 3);
			y1 = snake.matrix[0][1] * this.tileSize + Math.floor(this.tileSize / 4);

			x2 = snake.matrix[0][0] * this.tileSize + Math.floor(this.tileSize / 4 * 3);
			y2 = snake.matrix[0][1] * this.tileSize + Math.floor(this.tileSize / 4 * 3);
		}
		else if (snake.orientation === 2)
		{
			x1 = snake.matrix[0][0] * this.tileSize + Math.floor(this.tileSize / 4);
			y1 = snake.matrix[0][1] * this.tileSize + Math.floor(this.tileSize / 4 * 3);

			x2 = snake.matrix[0][0] * this.tileSize + Math.floor(this.tileSize / 4 * 3);
			y2 = snake.matrix[0][1] * this.tileSize + Math.floor(this.tileSize / 4 * 3);
		}
		else
		{
			x1 = snake.matrix[0][0] * this.tileSize + Math.floor(this.tileSize / 4);
			y1 = snake.matrix[0][1] * this.tileSize + Math.floor(this.tileSize / 4);

			x2 = snake.matrix[0][0] * this.tileSize + Math.floor(this.tileSize / 4);
			y2 = snake.matrix[0][1] * this.tileSize + Math.floor(this.tileSize / 4 * 3);
		}
		CVM.TOOLS.CanvasManager.draw_circle(this.ctx.snake, x1, y1, Math.round(this.tileSize / 8), {fillColor: "black"});
		CVM.TOOLS.CanvasManager.draw_circle(this.ctx.snake, x2, y2, Math.round(this.tileSize / 8), {fillColor: "black"});
	};
}());