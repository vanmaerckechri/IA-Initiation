(function()
{
	"use strict";

	CVM.ASTAR.Main = function()
	{
		this.graph;
		this.astar;

		this.path;
		this.history;
		this.index = 0;

		this.stepInterval = null;
		this.is_astarAlreadyInit = false;

		this.init();
	};

	CVM.ASTAR.Main.prototype.init = function()
	{
		this.graph = new CVM.ASTAR.Graph(document.getElementById('graph-canvas'), document.getElementById('graph-colors-canvas'), document.getElementById('graph-weights-canvas'));
		var graphDefault = {
			'start': { r: 7, c: 3 },
			'end': { r: 6, c: 12 },
			'walls': ['4-6', '4-7', '4-8', '4-9', '5-9', '6-6', '6-7', '6-8', '6-9', '7-6', '8-6', '9-6', '7-9', '8-9', '9-9']
		}
		// configure(rows, cols, tileSize, graphDefault).
		this.graph.configure(15, 15, graphDefault);
		this.graph.draw_graph();

		this.astar = new CVM.ASTAR.Astar();
		this.astar.init(this.graph.matrix);

		this.init_events();
	};

	CVM.ASTAR.Main.prototype.init_events = function()
	{
		// Bouton pour afficher l'étape suivante de la recherche en cours.
		var nextStep = document.getElementById('nextStep');
		nextStep.ontouchstart = nextStep.onmousedown = function(e)
		{
			e.preventDefault();
			this.launch_astar(50, true);
		}.bind(this);

		// Bouton pour afficher toutes les étapes de la recherche en cours.
		document.getElementById('allSteps').addEventListener('click', function()
		{
			this.launch_astar(1, false);
		}.bind(this));

		// Modification du graphe.
		var canvas = document.getElementById('graph-canvas');
		canvas.ontouchstart = canvas.onmousedown = function(e)
		{
			// Arrêter les étapes en cours.
			this.clear_stepInterval();
			// Reinitialisation d'astar nécessaire.
			this.is_astarAlreadyInit = false;
			// Reinitialiser le graphe.
			this.graph.update_cell(e);

			// Fin de la modification.
			window.ontouchend = window.onmouseup = function()
			{
				window.ontouchend = null;
				window.onmouseup = null;
				canvas.ontouchmove = null;
				canvas.onmousemove = null;
			}

			// Bouger/Dessiner/Effacer des éléments du graphe.
			canvas.ontouchmove = canvas.onmousemove = function(e)
			{
				e.preventDefault();
				this.graph.update_cell(e);
			}.bind(this);

		}.bind(this);
	};

	CVM.ASTAR.Main.prototype.launch_astar = function(time ,stepByStep)
	{
		// Si l'affichage automatique de toutes les étapes n'est pas activé.
		if (!this.stepInterval)
		{	
			// Calculer le trajet si ça n'est pas encore fait ou si le graphe a été modifié.
			if (this.is_astarAlreadyInit === false)
			{
				this.is_astarAlreadyInit = true;

				this.graph.draw_graph();
				this.astar.init(this.graph.matrix);

				var result = this.astar.search_path();
				this.path = result.path;
				this.history = result.history;
				this.index = 0;
			}
			// Afficher l'étape suivante tous les times * ms.
			this.stepInterval = setInterval(function()
			{
				if (this.index === this.history.selections.length)
				{
					this.show_finalPath();
				}

				this.graph.draw_colorsAndWeights(this.history.preselections[this.index], "rgb(150, 150, 180)");
				this.graph.draw_colorsAndWeights(this.history.selections[this.index], "cyan");
				this.index += 1;
			}.bind(this), time);
			
			// Si l'affichage est en mode étape par étape, interrompre l'affichage automatique.
			if (stepByStep === true)
			{
				window.ontouchend = window.onmouseup = function()
				{
					window.ontouchend = null;
					window.onmouseup = null;
					this.clear_stepInterval();
				}.bind(this);
			}
		}
	};

	CVM.ASTAR.Main.prototype.show_finalPath = function()
	{
		this.clear_stepInterval();
		this.graph.draw_path(this.path, "red");
		this.is_astarAlreadyInit = false;
	};

	CVM.ASTAR.Main.prototype.clear_stepInterval = function()
	{
		clearInterval(this.stepInterval);
		this.stepInterval = null;		
	};
}());