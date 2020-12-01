(function()
{
	"use strict";

	CVM.VFUNCTION.Ai = function(exploring_rate, learning_rate, is_train)
	{
		this.exploring_rate = exploring_rate;
		this.learning_rate = learning_rate;
		this.is_train = is_train;
		this.estimations;
		this.wins_n;
		this.history;
		this.symbol;

		this.init();
	};

	CVM.VFUNCTION.Ai.prototype.init = function()
	{
		this.wins_n = 0;

		if (!this.estimations)
		{
			this.estimations = [];
			for (var i = 0, length = Math.pow(3, 9); i < length; i++)
			{
				this.estimations[i] = null;
			}
		}
	};

	CVM.VFUNCTION.Ai.prototype.reset = function(symbol)
	{
		this.symbol = symbol;
		this.history = [];
	};

	CVM.VFUNCTION.Ai.prototype.choose_action = function(board)
	{
		var emptyCells = board.get_emptyCells();
		if (Math.random() * (0 - 1) + 1 < this.exploring_rate)
		{
			// exploration:
			var max = emptyCells.length;
			return emptyCells[Math.floor(Math.random() * (0 - max) + max)];
		}
		else
		{
			// exploitation:
			var vmax = -999;
			var index = 0;
			var hashState
			for (var i = emptyCells.length - 1; i >= 0; i--)
			{
				var nextState = board.get_nextState(emptyCells[i].r, emptyCells[i].c, this.symbol);
				var hashState = board.get_hashState(nextState);
				this.estimations[hashState] = !this.estimations[hashState] ? 0 : this.estimations[hashState];
				if (vmax < this.estimations[hashState])
				{
					vmax = this.estimations[hashState];
					index = i;
				}
			}

			return emptyCells[index];
		}
	};

	CVM.VFUNCTION.Ai.prototype.update_options = function(exploring_rate, learning_rate, is_train)
	{
		this.exploring_rate = exploring_rate;
		this.learning_rate = learning_rate;
		this.is_train = is_train;
	};

	CVM.VFUNCTION.Ai.prototype.update_history = function(hashState)
	{
		if (typeof this.estimations[hashState] == "undefined")
		{
			this.estimations[hashState] = 0;
		}
		this.history.push(hashState);
	};

	CVM.VFUNCTION.Ai.prototype.train = function(reward)
	{
		if (this.is_train === false)
		{
			return;
		}

		var target = reward;
		for (var i = this.history.length - 1; i >= 0; i--)
		{
			var hashState = this.history[i];
			var value = this.estimations[hashState] + this.learning_rate * (target - this.estimations[hashState]);
			this.estimations[hashState] = value;
			target = value;
		}
		this.history = [];
	};
}());