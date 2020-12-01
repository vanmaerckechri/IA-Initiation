(function()
{
	"use strict";

	CVM.MINIMAX.Main = function()
	{
		this.game;
		this.human;
		this.ai;

		this.init();
	};

	CVM.MINIMAX.Main.prototype.init = function()
	{
		var options = document.querySelectorAll('[name=option-player1]');

		for (var i = options.length - 1; i >= 0; i--)
		{
			options[i].addEventListener("change", this.change_orderPlayers.bind(this));
			options[i].checked = false;
		}

		// Forcer joueur 1 = humain.
		options[0].checked = true;
		this.change_orderPlayers(options[0]);
	};

	CVM.MINIMAX.Main.prototype.change_orderPlayers = function(e)
	{
		var target = !e.target ? e : e.target;
		var p1, p2

		if (target.value == "human")
		{
			p1 = new CVM.TICTACTOE.Human();
			p2 = new CVM.MINIMAX.Ai();
		}
		else
		{
			p1 = new CVM.MINIMAX.Ai();
			p2 = new CVM.TICTACTOE.Human();
		}

		this.game = null;
		this.game = new CVM.TICTACTOE.Game(p1, p2, true);
	};
}());