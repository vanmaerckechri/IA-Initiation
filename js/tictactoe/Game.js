(function()
{
	"use strict";

	CVM.TICTACTOE.Game = function(p1, p2, is_display)
	{
		this.p1 = p1;
		this.p2 = p2;
		this.currentPlayer;
		this.otherPlayer;

		this.board;
		this.rules;

		this.t;

		this.init(is_display);
	};

	CVM.TICTACTOE.Game.prototype.init = function(is_display)
	{
		this.board = new CVM.TICTACTOE.Board(is_display);
		this.rules = new CVM.TICTACTOE.Rules();

		var eventManager = CVM.TOOLS.Singleton.getInstance(CVM.TOOLS.EventManager);
		eventManager.add('clickToLaunchNewGame', document.getElementById('btn_newGame'), 'click', this.play.bind(this));

		this.play();
	}

	CVM.TICTACTOE.Game.prototype.play = function()
	{
		this.board.reset();
		this.p1.reset(1);
		this.p2.reset(-1);
		this.currentPlayer = this.p1;
		this.otherPlayer = this.p2;
		this.t = 0;
		this.step();
	}

	CVM.TICTACTOE.Game.prototype.step = function()
	{
		this.t += 1;
		if (this.currentPlayer.type !== 'human')
		{
			var coordinates = this.currentPlayer.choose_action(this.board, this.t);
			this.update_game(coordinates);
		}
		else
		{
			this.currentPlayer.activate_chooseEvent(this.update_game.bind(this));
		}
	}

	CVM.TICTACTOE.Game.prototype.update_game = function(coordinates)
	{
		this.board.update(coordinates, this.currentPlayer.symbol);
		this.currentPlayer.update_history(this.board.get_hashState());

		var endGame = this.rules.is_end(this.board.matrix, this.board.serie_length, this.t);
		if (endGame.result !== null)
		{
			// Match nul.
			if (endGame.result === 0)
			{
				this.p1.train(0.1);
				this.p2.train(0.5);
			}
			// L'un des joueur remporte le match.
			else
			{
				this.p1.train(endGame.result);
				this.p2.train(endGame.result * -1);
				if (endGame.result === 1)
				{
					this.p1.wins_n += 1;
				}
				else
				{
					this.p2.wins_n += 1;
				}
				this.board.close(endGame.victoryLines);	
			}
			return;
		}

		this.switch_players();
		this.step();
	}

	CVM.TICTACTOE.Game.prototype.switch_players = function()
	{
		if (this.currentPlayer === this.p1)
		{
			this.currentPlayer = this.p2;
			this.otherPlayer = this.p1;
		}
		else
		{
			this.currentPlayer = this.p1;
			this.otherPlayer = this.p2;
		}
	}
}());