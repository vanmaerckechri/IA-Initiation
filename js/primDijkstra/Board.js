(function()
{
	"use strict";

	CVM.PRIMDIJKSTRA.Board = function(container)
	{
		this.boardContainer = container;

		this.step;
		this.neighbours;
		this.selectedCell;
	};

	CVM.PRIMDIJKSTRA.Board.prototype.load = function(nodes)
	{
		this.boardContainer.innerHTML = "";
		this.step = 1;
		this.list = {};
		this.neighbours = {};
		this.selectedCell = {};

		var nodesName = [];

		// Trier les noeuds par ordre alphabétique.
		for (var node in nodes)
		{
			nodesName.push(node);
		}
		nodesName.sort();

		// Construire le tableau dans le dom.
		for (var c = 0, c_length = nodesName.length; c <= c_length; c++)
		{
			var colAttribute, cellAttribute;

			// Les attributs des colonnes et des cellules...
			if (c < c_length)
			{
				// ... pour les colonnes classiques.
				colAttribute = { "id": "board_" + nodesName[c], "class": "cell board-nodeName" };
				cellAttribute = { "id": "temp", "class": "cell board-cell" };
			}
			else
			{
				// ... pour la dernière colonnes (étapes numérotées).
				colAttribute = { "class": "cell board-nodeName" };
				cellAttribute = { "class": "cell board-step" };	
			}

			// Les colonnes.
			var col = CVM.TOOLS.DomManager.createElement("div", { "class": "board-column" });
			CVM.TOOLS.DomManager.createElement("div", colAttribute, col, nodesName[c]);
			// Les cellules.
			for (var r = 0, r_length = nodesName.length; r < r_length; r++)
			{
				var rowTitle = r + 1;

				// Mise à jour de l'id des cellules avec le numéro de la rangée.
				if (cellAttribute["id"])
				{
					cellAttribute["id"] = "board_" + nodesName[c] + rowTitle;
					// Suppression du contenu de la variable rowTitle (la valeur ayant besoin uniquement de s'appliquer sur la dernière colonnes).
					rowTitle = "";
				}
				CVM.TOOLS.DomManager.createElement("div", cellAttribute, col, rowTitle);
			}

			this.boardContainer.appendChild(col);
		}

		this.resize();
	};

	CVM.PRIMDIJKSTRA.Board.prototype.update = function(current, color)
	{
		var node = current.node;

		// Parcourir les noeuds voisins.
		for (var neighbour in current.neighbours)
		{
			var value = current.neighbours[neighbour];
			// Mise à jour des noeuds voisin avec la plus petite valeur.
			this.neighbours[neighbour] = typeof this.neighbours[neighbour] == "undefined" || value < this.neighbours[neighbour].value ? {"previous": node, "value": value} : this.neighbours[neighbour];

			// Mise à jour de la distance entre le noeud séléctionné et le noeud voisin.
			var cell = document.getElementById("board_" + neighbour + this.step);
			if (cell)
			{
				cell.textContent = value + "-" + node;
			}
		}

		// Fermer le noeud séléctionné.
		this.close_column(current, color);
		this.step += 1;

		// Retourner le couple de noeud pour le graphe.
		return this.step > 2 ? this.neighbours[node].previous + '-' + node : node + "-" + node;
	};

	CVM.PRIMDIJKSTRA.Board.prototype.resize = function()
	{
		var cells = document.querySelectorAll(".cell");
		var canvas = document.querySelector("canvas");
		var boardColumn = document.querySelectorAll(".board-column")
		var length = boardColumn.length;

		var size = canvas.offsetWidth / length;

		for (var i = cells.length - 1; i >= 0; i--)
		{
			cells[i].style.width = size + "px";
			cells[i].style.height = size + "px";
		}
	};

	CVM.PRIMDIJKSTRA.Board.prototype.close_column = function(choice, color)
	{
		// Afficher la plus petite valeur dans la colonne du noeud séléctionné. S'il s'agit du noeud de départ, la valeur vaut 0.
		var cellId = "board_" + choice.node + this.step;
		var cell = document.getElementById(cellId);	
		cell.textContent = this.step > 1 ? this.neighbours[choice.node].value + '-' + this.neighbours[choice.node].previous : 0;
		cell.style.color = color;

		this.selectedCell[choice.node] = choice.node + this.step;

		// Griser les cellules suivantes dans la colonne du noeud séléctionné.
		var boardColumns = document.querySelectorAll(".board-column");
		var col_length = boardColumns.length - 1;
		var row_length = col_length - this.step;

		for (var i = 0; i < row_length; i++)
		{
			var column = document.getElementById("board_" + choice.node + (this.step + i + 1));
			column.classList.add("board-cellClose");
		}
	};

	CVM.PRIMDIJKSTRA.Board.prototype.update_pathColor = function(nodes, color)
	{
		var nodes = nodes.split("-");
		var cellId = "board_" + this.selectedCell[nodes[1]];
		var cell = document.getElementById(cellId);
		cell.style.color = color;
	};
}());