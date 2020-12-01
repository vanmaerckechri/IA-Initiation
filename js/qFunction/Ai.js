(function()
{
	"use strict";

	CVM.QFUNCTION.Ai = function()
	{
		this.epsilon;
		this.alpha;
		this.gamma;
		this.q_table;
	};

	CVM.QFUNCTION.Ai.prototype.reset_qTable = function(states_n, actions_n, value)
	{
		var q_table = [];
		for (var s = 0; s < states_n; s++)
		{
			q_table[s] = [];
			for (var a = 0; a < actions_n; a++)
			{
				q_table[s][a] = value;
			}
		}
		this.q_table = q_table;
	};

	CVM.QFUNCTION.Ai.prototype.choose_action = function(state)
	{
		return Math.random() > this.epsilon ? this.argmax(this.q_table[state]) : Math.floor(Math.random() * 3);
	};

	CVM.QFUNCTION.Ai.prototype.update_options = function(exploring_rate, learning_rate, discount_factor)
	{
		this.epsilon = exploring_rate;
		this.alpha = learning_rate;
		this.gamma = discount_factor;
	};

	CVM.QFUNCTION.Ai.prototype.train = function(state, next_state, action, reward)
	{
		this.q_table[state][action] = (1 - this.alpha) * this.q_table[state][action] + this.alpha * (reward + this.gamma * Math.max.apply(null, this.q_table[next_state]));
	};

	CVM.QFUNCTION.Ai.prototype.argmax = function(array)
	{
		var max = -Infinity;
		var index;
		for (var i = array.length - 1; i >= 0; i--)
		{
			if (array[i] > max)
			{
				max = array[i];
				index = i;
			}
		}
		return index;
    }
}());