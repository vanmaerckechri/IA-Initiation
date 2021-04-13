(function()
{
	"use strict";

	CVM.PRIMDIJKSTRA.Graph = function(container)
	{
		this.canvasContainer = container;
		this.canvasSize = 750;
		this.canvas;
		this.ctx;

		this.canvasResult;
		this.ctxResult;

		this.init();
	};

	CVM.PRIMDIJKSTRA.Graph.prototype.init = function()
	{
		this.init_canvas();

		var r = Math.floor(this.canvas.width / 3);
		var x0 = Math.floor(this.canvas.height / 2);
		var y0 = Math.floor(this.canvas.width / 2);

		var coordinates = this.calculate_regularPolygonCoordinates(x0, y0, r, 6);
		var config = { lineWidth: 3, strokeColor: "white", fillColor: "black", is_closePath: true };

		// Dessiner les chemins exterieurs.
		CVM.TOOLS.CanvasManager.draw_shape(this.ctx, this.convert_coordinatesToArray(coordinates), config);
		// Ajouter un noeud central au graphe.
		coordinates.push({ x: x0, y: y0, index: coordinates.length });

		this.init_nodesName(coordinates);
		this.init_distInputs(config, coordinates, x0, y0);
		this.init_nodes(this.ctx, coordinates, config);
		this.init_distances();
		this.resize();
	};

	CVM.PRIMDIJKSTRA.Graph.prototype.convert_coordinatesToArray = function(coordinates)
	{
		var output = [];
		for (var p in coordinates)
		{
			output.push([coordinates[p].x, coordinates[p].y]);
		}
		return output;
	};

	CVM.PRIMDIJKSTRA.Graph.prototype.init_canvas = function()
	{
		var canvasList = ["Result", ""];

		for (var i = canvasList.length - 1; i >= 0; i--)
		{
			var canvas = "canvas" + canvasList[i];
			this[canvas] = CVM.TOOLS.DomManager.createElement("canvas", {"class": canvas, "width": this.canvasSize, "height": this.canvasSize}, this.canvasContainer)

			var ctx = "ctx" + canvasList[i];
			this[ctx] = this[canvas].getContext('2d');
		}		
	};


	CVM.PRIMDIJKSTRA.Graph.prototype.init_nodesName = function(coordinates)
	{
		// Organiser par position en x pour ajouter le nom des noeuds de gauche à droite.
		coordinates.sort(function (a, b)
		{
			return a.x - b.x
		});
		// Ajouter le nom des noeuds.
		for (var i = 0, length = coordinates.length; i < length; i++)
		{
			coordinates[i].id = String.fromCharCode(65 + i);
		}
		// Organiser par index.
		coordinates.sort(function (a, b)
		{
			return a.index - b.index;
		});
	};

	CVM.PRIMDIJKSTRA.Graph.prototype.init_nodes = function(ctx, coordinates, config)
	{
		for (var i = 0, length = coordinates.length; i < length; i++)
		{
			// Dessiner un cercle avec le nom du noeud.
			CVM.TOOLS.CanvasManager.draw_circle(this.ctx, coordinates[i].x, coordinates[i].y, 30, config);
			var nodeName = CVM.TOOLS.DomManager.createElement("div", { "id": "graph_" + coordinates[i].id, "class": "nodeName", "data-left": coordinates[i].x, "data-top": coordinates[i].y, "style": "{left: " + coordinates[i].x + "px; top: " + coordinates[i].y + "px;}"}, this.canvasContainer, coordinates[i].id);
		}
	};

	CVM.PRIMDIJKSTRA.Graph.prototype.init_distInputs = function(config, coordinates, x0, y0)
	{
		// Ajouter les inputs de distances situés à l'exterieur.
		for (var i = 0, length = coordinates.length - 1; i < length; i++)
		{
			this.create_input(coordinates, i, (i + 1), coordinates[i + 2]);
		}

		for (var i = 0, length = coordinates.length - 1; i < length; i++)
		{
			if (coordinates[i].id != "A")
			{
				// Dessiner les lignes et ajouter les inputs distances situés à l'intérieur.
				CVM.TOOLS.CanvasManager.draw_line(this.ctx, [ [x0, y0], [coordinates[i].x, coordinates[i].y] ], config);
				this.create_input(coordinates, i, length, (i + 1));
			}
		}
	}

	CVM.PRIMDIJKSTRA.Graph.prototype.create_input = function(coordinates, i, i2, isNextIndex)
	{
		var x, y, id;

		if (isNextIndex)
		{
			x = Math.floor((coordinates[i].x + coordinates[i2].x) / 2);
			y = Math.floor((coordinates[i].y + coordinates[i2].y) / 2);
			id = (coordinates[i].id).charCodeAt(0) < (coordinates[i2].id).charCodeAt(0) ? coordinates[i].id + coordinates[i2].id : coordinates[i2].id + coordinates[i].id;
		}
		else
		{
			x = Math.floor((coordinates[i].x + coordinates[0].x) / 2);
			y = Math.floor((coordinates[i].y + coordinates[0].y) / 2);
			id = (coordinates[i].id).charCodeAt(0) < (coordinates[i2].id).charCodeAt(0) ? coordinates[i].id + coordinates[0].id : coordinates[0].id + coordinates[i].id;
		}

		var input = CVM.TOOLS.DomManager.createElement("input", { "id": id, "class": "pathDist", "type": "text", "data-left": x, "data-top": y, "style": "{left: "+x+"px, top: "+y+"px}" }, this.canvasContainer);
	};

	CVM.PRIMDIJKSTRA.Graph.prototype.init_distances = function()
	{
		var inputs = document.querySelectorAll(".pathDist");

		for (var i = inputs.length - 1; i >= 0; i--)
		{
			inputs[i].value = Math.round(Math.random() * (9 - 1) + 1);
		}
	};
	
	CVM.PRIMDIJKSTRA.Graph.prototype.calculate_regularPolygonCoordinates = function(x0, y0, r, sides_n)
	{
		var output = [];

		for (var i = 0; i < sides_n; i++)
		{
			var angle = (360 / sides_n) * (i + 1) * (Math.PI / 180);
			var x = Math.floor(x0 + r * Math.cos(angle));
			var y = Math.floor(y0 + r * Math.sin(angle));

			output.push( { x: x, y: y, index: i } );
		}

		return output;
	};

	CVM.PRIMDIJKSTRA.Graph.prototype.resize = function()
	{
		this.update_elemsPosition(document.querySelectorAll(".pathDist"));
		this.update_elemsPosition(document.querySelectorAll(".nodeName"));
	};

	CVM.PRIMDIJKSTRA.Graph.prototype.update_elemsPosition = function(elems)
	{
		var ratio = this.canvas.offsetWidth / this.canvasSize;

		for (var i = elems.length - 1; i >= 0; i--)
		{
			var x = elems[i].getAttribute('data-left');
			var y = elems[i].getAttribute('data-top');

			x = x * ratio;
			y = y * ratio;

			elems[i].style.cssText = "left: " + x + "px; top: " + y + "px;";
		}
	};

	CVM.PRIMDIJKSTRA.Graph.prototype.updateDist = function(e)
	{
		e.target.value = parseInt(e.target.value);

		if (isNaN(e.target.value))
		{
			e.target.value = Math.round(Math.random() * (9 - 1) + 1);;
		}
		else if (e.target.value > 9)
		{
			e.target.value = 9;
		}
		else if (e.target.value < 1)
		{
			e.target.value = 1;
		}
	};

	CVM.PRIMDIJKSTRA.Graph.prototype.show_result = function(previous, current, color)
	{
		var previous = document.getElementById('graph_' + previous);
		var x0 = previous.getAttribute('data-left');
		var y0 = previous.getAttribute('data-top');

		var current = document.getElementById('graph_' + current);
		var x1 = current.getAttribute('data-left');
		var y1 = current.getAttribute('data-top');

		CVM.TOOLS.CanvasManager.draw_circle(this.ctxResult, x0, y0, 30, { lineWidth: 3, strokeColor: color, fillColor: color });
		CVM.TOOLS.CanvasManager.draw_circle(this.ctxResult, x1, y1, 30, { lineWidth: 3, strokeColor: color, fillColor: color });
		CVM.TOOLS.CanvasManager.draw_line(this.ctxResult, [[x0, y0], [x1, y1]], { lineWidth: 3, strokeColor: color });
	};

	CVM.PRIMDIJKSTRA.Graph.prototype.delete_result = function()
	{
		this.canvasResult.width = this.canvasResult.width;
		this.canvasResult.height = this.canvasResult.height;
	};

	CVM.PRIMDIJKSTRA.Graph.prototype.get_nodes = function()
	{
		var inputs = document.querySelectorAll(".pathDist");
		var paths = {};

		for (var i = inputs.length - 1; i >= 0; i--)
		{
			paths[(inputs[i].id)[0]] = paths[(inputs[i].id)[0]] ? paths[(inputs[i].id)[0]] : {}; 
			paths[(inputs[i].id)[1]] = paths[(inputs[i].id)[1]] ? paths[(inputs[i].id)[1]] : {}; 

			paths[(inputs[i].id)[0]][(inputs[i].id[1])] = parseInt(inputs[i].value);
			paths[(inputs[i].id)[1]][(inputs[i].id[0])] = parseInt(inputs[i].value);
		}

		return paths;
	};
}());