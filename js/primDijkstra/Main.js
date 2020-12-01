(function()
{
	"use strict";

	CVM.PRIMDIJKSTRA.Main = function(algo)
	{
		this.graph;
		this.board;
		this.primDijkstra;

		this.nodes;
		this.path;
		this.history;
		this.neighbours;

		this.algo = algo;

		this.init(algo);
	};

	CVM.PRIMDIJKSTRA.Main.prototype.init = function()
	{
		this.graph = new CVM.PRIMDIJKSTRA.Graph(document.getElementById('graph-container'));
		this.nodes = this.graph.get_nodes();
		
		this.board = new CVM.PRIMDIJKSTRA.Board(document.getElementById('board-container'));
		this.board.load(this.nodes);
		
		this.primDijkstra = new CVM.PRIMDIJKSTRA[this.algo]();
		this.primDijkstra.load(this.nodes, "A", "G");

		this.path = null;
		this.history = null;

		this.init_events();
	};

	CVM.PRIMDIJKSTRA.Main.prototype.init_events = function()
	{
		// Les boutons.
		var randomWeights = document.getElementById("randomWeights");
		randomWeights.addEventListener("click", this.reset.bind(this, true));

		var reset = document.getElementById("reset");
		reset.addEventListener("click", this.reset.bind(this));

		var nextStep = document.getElementById("nextStep");
		nextStep.addEventListener("click", this.show_result.bind(this, true));

		var allSteps = document.getElementById("allSteps");
		allSteps.addEventListener("click", this.show_result.bind(this));

		// Les inputs (coût).
		var inputs = document.querySelectorAll(".pathDist");
		for (let i = inputs.length - 1; i >= 0; i--)
		{
			inputs[i].addEventListener("change", function(e)
			{
				this.graph.updateDist(e);
				this.reset();
			}.bind(this));
		}

		// Resize.
		window.addEventListener('resize', function()
		{
			this.graph.resize();
			this.board.resize();
		}.bind(this));
	};

	CVM.PRIMDIJKSTRA.Main.prototype.show_result = function(is_stepByStep)
	{
		var stepColor = "#00a8a8";
		var pathColor = "red";
		var stepColor = this.algo == "Prim" ? pathColor : stepColor;

		// Charger le chemin (path) et les étapes effectuées pour y parvenir (history).
		if (this.path === null)
		{
			var result = this.primDijkstra.search_path();
			this.path = result.path;
			this.history = result.history;
			this.format_path();
		}
		if (this.history.length === 0)
		{
			return;
		}

		// Afficher les étapes.
		if (is_stepByStep === true)
		{
			this.show_nextStep(this.history, this.board.update(this.history[0], stepColor), stepColor);
		}
		else
		{
			for (var node = this.history.length - 1; node >= 0; node--)
			{
				this.show_nextStep(this.history, this.board.update(this.history[0], stepColor), stepColor);
			}
		}
		// Mise à jour des couleurs pour le chemin final.
		if (this.history.length === 0)
		{
			for (var node = this.path.length - 1; node >= 0; node--)
			{
				this.board.update_pathColor(this.path[0], pathColor);
				this.show_nextStep(this.path, this.path[0], pathColor);
			}
		}
	};

	CVM.PRIMDIJKSTRA.Main.prototype.format_path = function()
	{
		// S'il s'agit d'un chemin issu de l'algorithme de Dijkstra, le convertir en couple de noeuds.
		if (this.algo == "Dijkstra")
		{
			var newPath = [];
			for (var i = 0, length = this.path.length - 1; i < length; i++)
			{
				newPath.push(this.path[i] + "-" + this.path[i + 1]);
			}
			this.path = newPath;
		}

		// Ajouter une étape d'initialisation.
		this.path.unshift('A-A');
	};

	CVM.PRIMDIJKSTRA.Main.prototype.show_nextStep = function(nodesList, nodes, color)
	{
		var nodes = nodes.split('-');
		var previous = nodes[0];
		var current = nodes[1];

		this.graph.show_result(previous, current, color);
		nodesList.shift();
	};

	CVM.PRIMDIJKSTRA.Main.prototype.reset = function(is_newDistances)
	{
		if (is_newDistances === true)
		{
			this.graph.init_distances();
		}
		this.graph.delete_result();
		this.nodes = this.graph.get_nodes();
		this.board.load(this.nodes);
		this.primDijkstra.load(this.nodes, "A", "G");
		this.path = null;
		this.history = null;
	};
}());