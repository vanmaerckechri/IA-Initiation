(function()
{
	"use strict";

	CVM.SNAKE.Game = function(cols, rows, ai)
	{
		this.ai = ai;
		this.board = new CVM.SNAKE.Board(cols, rows);
		this.snake = new CVM.SNAKE.Snake();
		this.apple;
		this.time;
	};

	CVM.SNAKE.Game.prototype.step = function(action)
	{
		this.time += 1;
		this.snake.update_orientation(action);
		var new_pos = this.snake.get_newPosition();
		return this.get_gameInfos(new_pos);
	};

	CVM.SNAKE.Game.prototype.get_gameInfos = function(new_pos)
	{
		if (!this.board.state.check_wallCollision(new_pos) && !this.board.state.check_tailCollision(new_pos, this.snake.matrix) && this.time < (this.board.rows * this.board.cols))
		{
			// Mettre la position de la tête à jour.
			this.snake.matrix.unshift(new_pos);

			// Pomme mangée.
			if (this.board.state.check_tailCollision(this.apple, this.snake.matrix))
			{
				// Si la taille du serpent est égale au nombre de cases dans l'aire de jeu la partie est gagnée.
				if (this.snake.matrix.length == this.board.rows * this.board.cols)
				{
					// Partie gagnée - grosse récompense.
					return {'s': this.get_state(), 'l': this.snake.matrix.length, 'r': 1000000, 'done': true};
				}

				this.time = 0;
				this.reset_apple();
				// Pomme mangée - récompense. ( Math.pow(this.snake.matrix.length, 2) ?)
				return {'s': this.get_state(), 'l': this.snake.matrix.length, 'r': 1, 'done': false};
			}

			// Effacer l'ancienne position du bout de la queue.
			this.snake.matrix.pop();
			// Mouvement du serpend - petite récompense négative.
			return {'s': this.get_state(), 'l': this.snake.matrix.length, 'r': 0, 'done': false};
		}
		// Partie perdue - grosse récompense négative.
		return {'s': this.get_state(), 'l': this.snake.matrix.length, 'r': -1, 'done': true};
	};

	CVM.SNAKE.Game.prototype.restart = function(speed, is_description)
	{
		this.time = 0;
		this.snake.reset(this.board.rows, this.board.cols);
		this.reset_apple();
		return this.get_state();
	};

	CVM.SNAKE.Game.prototype.get_state = function()
	{
		return this.board.state.get_state(this.snake, this.apple);
	};

	CVM.SNAKE.Game.prototype.reset_apple = function()
	{
		var grid = [];
		var snake = JSON.stringify(this.snake.matrix);
		for (var c = 0; c < this.board.cols; c++)
		{
			for (var r = 0; r < this.board.rows; r++)
			{
				if (snake.indexOf('['+c+','+r+']') === -1)
				{
					grid.push([c, r]);
				}
			}
		}
		this.apple = grid[Math.floor(Math.random() * grid.length)];
	};
}());