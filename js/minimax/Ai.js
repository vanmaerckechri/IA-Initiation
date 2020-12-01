(function()
{
	"use strict";

	CVM.MINIMAX.Ai = function()
	{
		this.type;
		this.minimax;
		this.wins_n;
		this.history;
		this.symbol;

		this.init();
	};

	CVM.MINIMAX.Ai.prototype.init = function()
	{
		this.type = "ai";
		var rules = new CVM.TICTACTOE.Rules();
		this.minimax = new CVM.MINIMAX.Minimax(rules.is_end.bind(rules));
		this.wins_n = 0;
	};

	CVM.MINIMAX.Ai.prototype.reset = function(symbol)
	{
		this.symbol = symbol;
		this.history = [];
	};

	CVM.MINIMAX.Ai.prototype.choose_action = function(board, t, algo)
	{
		this.minimax.set_gameInfos(board.rows, board.cols, board.serie_length, this.symbol);
		var result = this.minimax.get_bestCell(board.matrix, 0, this.symbol, -Infinity, Infinity, t);
		return result;
	};

	CVM.MINIMAX.Ai.prototype.update_history = function(){};

	CVM.MINIMAX.Ai.prototype.train = function(){};
}());