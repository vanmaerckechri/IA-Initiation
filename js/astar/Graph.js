(function()
{
	"use strict";

	CVM.ASTAR.Graph = function(canvas, canvasColors, canvasWeights)
	{
		this.canvas = canvas;
		this.ctx = canvas.getContext('2d');
		this.canvasColors = canvasColors;
		this.ctxColors = canvasColors.getContext('2d');
		this.canvasWeights = canvasWeights;
		this.ctxWeights = canvasWeights.getContext('2d');

		this.matrix;
		this.rows;
		this.cols;
		this.tileSize;
		this.start;
		this.end;
		this.busy;
	};

	CVM.ASTAR.Graph.prototype.configure = function(r, c, graphDefault)
	{
		this.matrix = [];
		this.rows = r;
		this.cols = c;
		this.start = { r: graphDefault.start.r, c: graphDefault.start.c };
		this.end = { r: graphDefault.end.r, c: graphDefault.end.c };

		this.canvasColors.width = this.canvas.width;
		this.canvasColors.height = this.canvas.width;
		this.canvasWeights.width = this.canvas.width;
		this.canvasWeights.height = this.canvas.width;

		this.tileSize = this.canvas.width / r;

		this.build_map(graphDefault['walls']);
		this.draw_graph();
	};

	CVM.ASTAR.Graph.prototype.build_map = function(walls)
	{
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

		for (var r = this.rows - 1; r >= 0; r--)
		{
			this.matrix[r] = [];
			for (var c = this.cols - 1; c >= 0; c--)
			{
				if (this.start.r == r && this.start.c == c)
				{
					this.matrix[r][c] = 'start';
				}
				else if (this.end.r == r && this.end.c == c)
				{
					this.matrix[r][c] = 'end';					
				}
				else
				{
					if (walls.indexOf(r + '-' + c) != -1)
					{
						this.matrix[r][c] = 'wall'
					}
					else
					{
						this.matrix[r][c] = 'empty';
					}
				}

				CVM.TOOLS.CanvasManager.draw_rect(this.ctx, c * this.tileSize, r * this.tileSize, this.tileSize, this.tileSize, { lineWidth: 1, strokeColor: "black" });
			}	
		}
	};

	CVM.ASTAR.Graph.prototype.update_cell = function(e)
	{
		var gridPosition = this.get_gridPosition(e);

		if (this.matrix[gridPosition.r] && this.matrix[gridPosition.r][gridPosition.c])
		{
			this.update_cellStatus(gridPosition.r, gridPosition.c);
			this.draw_graph();
		}
	};

	CVM.ASTAR.Graph.prototype.get_gridPosition = function(e)
	{
		var rect = e.target.getBoundingClientRect();
		var clientX = (e.clientX || e.touches[0].clientX) - rect.left;
		var clientY = (e.clientY || e.touches[0].clientY) - rect.top;
		var tileSize = this.canvas.offsetWidth / this.cols;
		var c = Math.floor(clientX / tileSize);
		var r = Math.floor(clientY / tileSize);

		return { r: r, c: c};
	};

	CVM.ASTAR.Graph.prototype.update_cellStatus = function(r, c)
	{
		var optionCellType = this.get_optionCellType();

		// Effacer le mur.
		if (this.matrix[r][c] == 'wall' && optionCellType == 'empty')
		{
			this.matrix[r][c] = 'empty';
		}
		// Bouger (départ/destination) ou dessiner un mur.
		else if (this.matrix[r][c] == 'empty')
		{
			if (optionCellType == 'start' || optionCellType == 'end')
			{
				this.matrix[this[optionCellType].r][this[optionCellType].c] = 'empty';
				this[optionCellType].r = r;
				this[optionCellType].c = c;
			}

			this.matrix[r][c] = optionCellType;
		}
	};

	CVM.ASTAR.Graph.prototype.get_optionCellType = function()
	{
		var cellType = document.querySelectorAll('[name=option-cellType]');
	
		for (var i = cellType.length - 1; i >= 0; i--)
		{
			if (cellType[i].checked === true)
			{
				return cellType[i].value;
			}
		}		
	};

	CVM.ASTAR.Graph.prototype.draw_graph = function(is_deleteWalls)
	{
		this.ctxColors.clearRect(0, 0, this.canvasColors.width, this.canvasColors.height);
		this.ctxWeights.clearRect(0, 0, this.canvasWeights.width, this.canvasWeights.height);

		for (var r = this.rows - 1; r >= 0; r--)
		{
			for (var c = this.cols - 1; c >= 0; c--)
			{
				switch (this.matrix[r][c])
				{
					case 'start':
						CVM.TOOLS.CanvasManager.draw_rect(this.ctxColors, c * this.tileSize, r * this.tileSize, this.tileSize, this.tileSize, { fillColor: "blue" });
						break;
					case 'end':
						CVM.TOOLS.CanvasManager.draw_rect(this.ctxColors, c * this.tileSize, r * this.tileSize, this.tileSize, this.tileSize, { fillColor: "green" });
						break;
					case 'wall':
						if (is_deleteWalls)
						{
							this.matrix[r][c] = "empty";
						}
						else
						{
							CVM.TOOLS.CanvasManager.draw_rect(this.ctxColors, c * this.tileSize, r * this.tileSize, this.tileSize, this.tileSize, { fillColor: "black" });
						}
						break;
				}
			}
		}
	};

	CVM.ASTAR.Graph.prototype.draw_colorsAndWeights = function(nodes, color)
	{
		var fontSize = Math.floor(this.tileSize / 4);
		var marginTop = Math.floor(this.tileSize / 4);
		var marginLeftG = Math.floor(this.tileSize / 5);
		var marginLeftH = Math.floor(this.tileSize * 1.08);

		var fontsizeF = Math.floor(this.tileSize / 3);
		var marginF = Math.floor(this.tileSize / 1.5);

		for (var node in nodes)
		{
				var coordinates = node.split('-');
				var r = coordinates[0];
				var c = coordinates[1];
				var x = c * this.tileSize;
				var y = r * this.tileSize;

				if (this.matrix[r][c] == 'empty')
				{
					// colors
					CVM.TOOLS.CanvasManager.draw_rect(this.ctxColors, x, y, this.tileSize, this.tileSize, { lineWidth: 1, strokeColor: "black", fillColor: color });

					// weights
					this.ctxWeights.clearRect(x, y, this.tileSize, this.tileSize);
					CVM.TOOLS.CanvasManager.draw_text(this.ctxWeights, x + marginLeftG, y + marginTop, nodes[node]['g'], { fontSize: fontSize, color: "black", align: "left" });
					CVM.TOOLS.CanvasManager.draw_text(this.ctxWeights, x + marginLeftH, y + marginTop, nodes[node]['h'], { fontSize: fontSize, color: "black", align: "right" });
					CVM.TOOLS.CanvasManager.draw_text(this.ctxWeights, x + marginF, y + marginF, nodes[node]['f'], { fontSize: fontsizeF, color: "black", align: "center" });
				}
		}
	};

	CVM.ASTAR.Graph.prototype.draw_path = function(path, color)
	{
		for (var i = path.length - 1; i >= 0; i--)
		{
			if (typeof path[i] == 'string')
			{
				var coordinates = path[i].split('-');
				var r = coordinates[0];
				var c = coordinates[1];
				if (this.matrix[r][c] == 'empty')
				{
					CVM.TOOLS.CanvasManager.draw_rect(this.ctxColors, c * this.tileSize, r * this.tileSize, this.tileSize, this.tileSize, { lineWidth: 1, strokeColor: "black", fillColor: color });
				}
			}
		}
	};
}());