(function()
{
	"use strict";

	CVM.QFUNCTION.Main = function()
	{
		this.description = new CVM.QFUNCTION.Description();

		this.exploring_rate;
		this.learning_rate;
		this.discount_factor;
		this.trainNumber;

		this.status;
		this.speed;
		this.is_pause;
		this.tempoTest;
		this.tempoUiSpeed;
		this.workerLoop;
		this.lastState;

		this.game;
		this.ai;

		this.init();
	};

	CVM.QFUNCTION.Main.prototype.init = function()
	{
		// Initialiser la vitesse du jeu pour le test.
		this.speed = 400;
		this.is_pause = 0;

		// Initialiser IA. 
		this.ai = new CVM.QFUNCTION.Ai();
	    this.ai.reset_qTable(64, 3, 0);

		// Initialiser la partie. 
	    this.game = new CVM.SNAKE.Game(10, 10, this.ai);

		// Modifier le taux d'exploration.
		var exploring_rate = document.getElementById("exploringRate");
		exploring_rate.addEventListener("change", this.update_aiOptions.bind(this, "exploring_rate"));

		exploring_rate.value = 0.9;
		this.update_aiOptions("exploring_rate", exploring_rate.value);

		// Modifier le taux d'apprentissage.
		var learningRate = document.getElementById("learningRate");
		learningRate.addEventListener("change", this.update_aiOptions.bind(this, "learning_rate"));

		learningRate.value = 0.2;
		this.update_aiOptions("learning_rate", learningRate.value);

		// Modifier le facteur d'actualisation.
		var discountFactor = document.getElementById("discountFactor");
		discountFactor.addEventListener("change", this.update_aiOptions.bind(this, "discount_factor"));

		discountFactor.value = 0.4;
		this.update_aiOptions("discount_factor", discountFactor.value);

		// Modifier le nombre d'entrainements IA contre IA.
		var trainNumber = document.getElementById("trainNumber");
		trainNumber.addEventListener("change", this.update_aiOptions.bind(this, "trainNumber"));

		trainNumber.value = 100;
		this.update_aiOptions("trainNumber", trainNumber.value);

		// Entrainer IA.
		var btn_trainAi = document.getElementById("btn_trainAi");
		btn_trainAi.addEventListener("click", this.train.bind(this));

		// Tester IA.
		var btn_testAi = document.getElementById("btn_testAi");
		btn_testAi.addEventListener("click", this.test.bind(this, 1, 0));

		// Modifier la vitesse du test IA.
		var btn_speedDownTestAi = document.getElementById("btn_speedDownTestAi");
		btn_speedDownTestAi.addEventListener("click", this.update_speed.bind(this, -1));

		var btn_speedUpTestAi = document.getElementById("btn_speedUpTestAi");
		btn_speedUpTestAi.addEventListener("click", this.update_speed.bind(this, 1));

		var btn_pauseTestAi = document.getElementById("btn_pauseTestAi");
		btn_pauseTestAi.addEventListener("click", this.toggle_pause.bind(this));

		window.addEventListener("resize", this.resize.bind(this));
		this.resize();
	};

	CVM.QFUNCTION.Main.prototype.update_aiOptions = function(name, e)
	{
		var value = typeof e.target == "undefined" ? e : e.target.value;

		switch (name)
		{
			case 'exploring_rate':
				value = !value || isNaN(value) == true || value < 0 || value > 1 ? this[name] : value;
				break;
			case 'learning_rate':
				value = !value || isNaN(value) || value < 0 || value > 1 ? this[name] : value;
				break;
			case 'discount_factor':
				value = !value || isNaN(value) || value < 0 || value > 1 ? this[name] : value;
				break;
			case 'trainNumber':
				value = !value || isNaN(value) || value < 100 || value > 10000 ? this[name] : value;
				break;
		}

		if (e.target)
		{
			e.target.value = value;
		}
		this[name] = value;
	};

	CVM.QFUNCTION.Main.prototype.train = function()
	{
		this.stop();
		this.status = "train";

	    var epoch_size = this.trainNumber;
	    var batch_size = epoch_size;
		var progression = epoch_size / 100;
		var progress = document.getElementById("progress");

	    this.ai.update_options(this.exploring_rate, this.learning_rate, this.discount_factor);
		this.description.reset(this.game.snake.orientation, false);

		this.workerLoop = new Worker('js/workers/Loop.js');
		this.workerLoop.postMessage([0, epoch_size]);

		this.workerLoop.onmessage = function(e)
		{
	    	progress.textContent = " - " + Math.round((100 / epoch_size) * e.data) + "%";

	    	// Diminuer le taux d'apprentissage (α).
	        this.ai.alpha -= this.learning_rate / epoch_size;
	        // Diminuer le taux d'exploration (ε).
	       	this.ai.epsilon -= this.exploring_rate / epoch_size;

	        for (var i = 0; i < batch_size; i++)
	        {
	            var state = this.game.restart();
	            var done = false;
	            while (done === false)
	            {
	                var action = this.ai.choose_action(state);
	                var gameInfos = this.game.step(action);
	                var next_state = gameInfos.s;
	                var reward = gameInfos.r;
	               	this.ai.train(state, next_state, action, reward);
					done = gameInfos.done;
					state = next_state;
	            }
	        }

			this.game.board.draw_items(this.game.apple, this.game.snake);

			// Fin de la boucle.
			if (e.data === epoch_size - 1)
			{
				this.stop_train();
			}
		}.bind(this);
	};

	CVM.QFUNCTION.Main.prototype.test = function()
	{	
		this.stop();
		this.status = "test";

		this.ai.update_options(0, this.learning_rate, this.discount_factor);
		this.lastState = this.game.restart(this.speed, true);
		this.game.board.draw_items(this.game.apple, this.game.snake);
		this.description.reset(this.game.snake.orientation, true);

		this.step_test();
	};

	CVM.QFUNCTION.Main.prototype.step_test = function()
	{	
		this.tempoTest = setTimeout(function()
		{
			if (this.is_pause)
			{
				return;
			}

			var action = this.ai.argmax(this.ai.q_table[this.lastState]);		
			var gameInfos = this.game.step(action);
			var next_state = gameInfos.s;
			var reward = gameInfos.r;
			//this.ai.train(this.lastState, next_state, action, reward);
			this.lastState = next_state;

			if (gameInfos.done === true)
			{
				this.stop_test();
				return;
			}

			this.description.update(this.game.board.state.lastDatas, this.speed, this.ai.q_table, action);
			this.game.board.draw_items(this.game.apple, this.game.snake);

			this.step_test();

		}.bind(this), this.speed);
	};

	CVM.QFUNCTION.Main.prototype.stop = function()
	{	
		this.unpause();
		this.stop_train();
		this.stop_test();
		this.status = null;
		this.is_pause = false;
	};

	CVM.QFUNCTION.Main.prototype.stop_train = function()
	{	
		if (!this.workerLoop)
		{
			return;
		}
		this.workerLoop.terminate();
		this.workerLoop = null;
		var progress = document.getElementById("progress");
		progress.textContent = "";
	};

	CVM.QFUNCTION.Main.prototype.stop_test = function()
	{	
		if (!this.tempoTest)
		{
			return;
		}
		clearTimeout(this.tempoTest);
		this.tempoTest = null;
	};

	CVM.QFUNCTION.Main.prototype.update_speed = function(direction)
	{
		if (this.status != "test" || this.is_pause === true)
		{
			return;
		}

		if (direction === 1)
		{
			// Accélérer.
			this.speed /= 2;
			if (this.speed <= 50)
			{
				this.speed = 50;
			}
		}
		else
		{
			// Ralentir
			this.speed *= 2;
			if (this.speed >= 1600)
			{
				this.speed = 1600;
			}
		}

		this.display_uiSpeed();
	};

	CVM.QFUNCTION.Main.prototype.display_uiSpeed = function()
	{
		if (this.is_pause == true)
		{
			return
		}

		clearTimeout(this.tempoUiSpeed);
		this.tempoUiSpeed = null;

		var uiGameSpeed = document.getElementById("uiGameSpeed");
		uiGameSpeed.textContent = 400 / this.speed + "X";
		uiGameSpeed.classList.add("active");

		this.tempoUiSpeed = setTimeout(function()
		{
			uiGameSpeed.classList.remove("active");
			clearTimeout(this.tempoUiSpeed);
			this.tempoUiSpeed = null;

		}.bind(this), 1000);
	};

	CVM.QFUNCTION.Main.prototype.toggle_pause = function()
	{
		if (this.is_pause === false)
		{
			this.pause();
		}
		else
		{
			this.unpause();
		}
	};

	CVM.QFUNCTION.Main.prototype.pause = function()
	{
		if (this.status != "test")
		{
			return;
		}

		if (this.is_pause == false)
		{
			this.is_pause = true;
			this.stop_test();
			this.toggle_uiGameSpeed("PAUSE");
		}
	};

	CVM.QFUNCTION.Main.prototype.unpause = function()
	{
		if (this.status != "test")
		{
			return;
		}

		if (this.is_pause == true)
		{
			this.is_pause = false;
			this.step_test();
			this.toggle_uiGameSpeed();
			this.display_uiSpeed();
		}
	};

	CVM.QFUNCTION.Main.prototype.toggle_uiGameSpeed = function(content)
	{
		var uiGameSpeed = document.getElementById("uiGameSpeed");
		var btn_pauseTestAi = document.getElementById("btn_pauseTestAi");

		if (content == "PAUSE")
		{
			uiGameSpeed.classList.add("active");
			btn_pauseTestAi.textContent = "REPRENDRE";
			uiGameSpeed.textContent = content;
		}
		else
		{
			uiGameSpeed.classList.remove("active");
			btn_pauseTestAi.textContent = "PAUSE";
			uiGameSpeed.textContent = "";
		}
	};

	CVM.QFUNCTION.Main.prototype.resize = function()
	{
		this.game.board.resize(this.apple, this.snake);
		this.description.resize();
	};	
}());