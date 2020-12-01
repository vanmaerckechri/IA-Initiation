(function()
{
	"use strict";

	CVM.VFUNCTION.Main = function()
	{
		this.game;
		this.human;
		this.exploring_rate;
		this.learning_rate;
		this.trainNumber;
		this.is_busy;
		this.ai;

		this.init();
	};

	CVM.VFUNCTION.Main.prototype.init = function()
	{
		// Initialiser IA. 
		this.ai = new CVM.VFUNCTION.Ai();

		// Modifier le taux d'exploration.
		var exploring_rate = document.getElementById("exploringRate");
		exploring_rate.addEventListener("change", this.update_aiOptions.bind(this, "exploring_rate"));

		exploring_rate.value = 0.99;
		this.update_aiOptions("exploring_rate", 0.99);

		// Modifier le taux d'apprentissage.
		var learningRate = document.getElementById("learningRate");
		learningRate.addEventListener("change", this.update_aiOptions.bind(this, "learning_rate"));

		learningRate.value = 0.1;
		this.update_aiOptions("learning_rate", 0.1);

		// Modifier le nombre d'entrainements IA contre IA.
		var trainNumber = document.getElementById("trainNumber");
		trainNumber.addEventListener("change", this.update_aiOptions.bind(this, "trainNumber"));

		trainNumber.value = 10000;
		this.update_aiOptions("trainNumber", 10000);

		// Entrainer IA contre IA.
		var btn_trainAi = document.getElementById("btn_trainAi");
		btn_trainAi.addEventListener("click", this.train.bind(this));

		// Choix du joueur 1.
		var options = document.querySelectorAll('[name=option-player1]');
		for (var i = options.length - 1; i >= 0; i--)
		{
			options[i].addEventListener("change", this.change_orderPlayers.bind(this));
			options[i].checked = false;
		}

		options[0].checked = true;
		this.change_orderPlayers(options[0]);
	};

	CVM.VFUNCTION.Main.prototype.back_againstHuman = function()
	{
		if (this.is_busy)
		{
			return;
		}

		var options = document.querySelectorAll('[name=option-player1]');
		for (var i = options.length - 1; i >= 0; i--)
		{
			if (options[i].checked === true)
			{
				this.change_orderPlayers(options[i])
			}
		}
	};

	CVM.VFUNCTION.Main.prototype.change_orderPlayers = function(e)
	{
		if (this.is_busy)
		{
			return;
		}

		var target = typeof e.target == "undefined" ? e : e.target;
		var human = new CVM.TICTACTOE.Human();

		this.ai.update_options(0.05, 0.1, true);

		if (target.value == "human")
		{
			this.game = new CVM.TICTACTOE.Game(human, this.ai, true);
		}
		else
		{
			this.game = new CVM.TICTACTOE.Game(this.ai, human, true);
		}
	};

	CVM.VFUNCTION.Main.prototype.update_aiOptions = function(name, e)
	{
		var value = typeof e.target == "undefined" ? e : e.target.value;

		switch (name)
		{
			case 'exploring_rate':
				value = !value || isNaN(value) == true || value < 0 || value > 0.99 ? this[name] : value;
				break;
			case 'learning_rate':
				value = !value || isNaN(value) || value < 0.01 || value > 0.99 ? this[name] : value;
				break;
			case 'trainNumber':
				value = !value || isNaN(value) || value < 100 || value > 50000 ? this[name] : value;
				break;
		}

		if (e.target)
		{
			e.target.value = value;
		}
		this[name] = value;

		this.back_againstHuman();
	};

	CVM.VFUNCTION.Main.prototype.train = function()
	{
		if (this.is_busy)
		{
			return;
		}
		this.is_busy = true;

		var p1 = new CVM.VFUNCTION.Ai(this.exploring_rate, this.learning_rate, true);
		var p2 = new CVM.VFUNCTION.Ai(this.exploring_rate, this.learning_rate, true);
		var game = new CVM.TICTACTOE.Game(p1, p2, true);
		var ep = this.trainNumber;
		var progression = ep / 100;
		var progress = document.getElementById("progress");

		// Raffraichir le dom durant la boucle à l'aide d'un worker.
		var workerLoop = new Worker('js/workers/Loop.js');
		workerLoop.postMessage([0, ep]);

		workerLoop.onmessage = function(e)
		{
			var i = e.data;
			// Diminuer régulièrement le taux d'apprentissage.
			if (i % progression === 0)
			{
				progress.textContent = " - " + Math.round((100 / ep) * i) + "%";
				p1.exploring_rate = Math.max(p1.exploring_rate * 0.996, 0.05);
				p2.exploring_rate = Math.max(p2.exploring_rate * 0.996, 0.05);
			}
			game.play();

			// Fin de la boucle.
			if (i === ep - 1)
			{
				workerLoop.terminate();
				workerLoop = null;
				progress.textContent = "";

				// Fusionner et sauver les acquis des deux IA.
				this.ai.estimations = this.merge_estimations(p1.estimations, p2.estimations);
				this.is_busy = false;
				this.back_againstHuman();
			}
		}.bind(this);
	};

	CVM.VFUNCTION.Main.prototype.merge_estimations = function(estimations1, estimations2)
	{
		var estimations = [];
		for (var i = estimations1.length - 1; i >= 0; i--)
		{
			estimations[i] = estimations1[i] === null ? estimations2[i] : estimations1[i];
		}
		return estimations;
	};
}());