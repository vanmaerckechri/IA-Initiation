(function()
{
	"use strict";

	CVM.TICTACTOE.Human = function()
	{
		this.type;
		this.wins_n;
		this.history;
		this.symbol;

		this.init();
	};

	CVM.TICTACTOE.Human.prototype.init = function()
	{
		this.type = "human";
		this.wins_n = 0;
	};

	CVM.TICTACTOE.Human.prototype.reset = function(symbol)
	{
		this.symbol = symbol;
		this.history = [];
		this.deactivate_chooseEvent();
	};

	CVM.TICTACTOE.Human.prototype.activate_chooseEvent = function(update_game)
	{
		var eventManager = CVM.TOOLS.Singleton.getInstance(CVM.TOOLS.EventManager);
		eventManager.add('clickToChooseCell', document.getElementById('tictactoe-board'), 'click', this.send_action.bind(this, update_game));
	};

	CVM.TICTACTOE.Human.prototype.deactivate_chooseEvent = function()
	{
		var eventManager = CVM.TOOLS.Singleton.getInstance(CVM.TOOLS.EventManager);
		eventManager.remove('clickToChooseCell');
	};

	CVM.TICTACTOE.Human.prototype.send_action = function(update_game, e)
	{
		var r, c;

		if (e.target && e.target.dataset.row && e.target.classList.contains('active'))
		{
			this.deactivate_chooseEvent();
			update_game({'r': e.target.dataset.row, 'c': e.target.dataset.col});
		}
	};

	CVM.TICTACTOE.Human.prototype.update_history = function(){};

	CVM.TICTACTOE.Human.prototype.train = function(){};
}());