(function()
{
	"use strict";

	CVM.QFUNCTION.State = function(cols, rows)
	{
		this.cols = cols;
		this.rows = rows;
		this.lastDatas = {};
	};

	CVM.QFUNCTION.State.prototype.get_surrounding = function(x, y, snake)
	{
		// Présence des murs ou d'une partie de la queue aux alentours des actions possibles (2**3).
		var surrounding = [0, 0, 0];

		for (var i = surrounding.length - 1; i >= 0; i--)
		{
			var new_ori = CVM.TOOLS.Math.modulo((snake.orientation + i - 1), 4);
			var new_pos = [x + snake.moves[new_ori][0], y + snake.moves[new_ori][1]];
			surrounding[i] = (this.check_wallCollision(new_pos) || this.check_tailCollision(new_pos, snake.matrix));
		}

		this.lastDatas.surrounding = surrounding;

		return surrounding[0] * 4 + surrounding[1] * 2 + surrounding[2];
	};

	CVM.QFUNCTION.State.prototype.get_appleDirection = function(x, y, orientation, apple)
	{
		// Direction de la pomme en fonction de l'orientatation du serpent (8**1).
		var state;
        var ax = apple[0];
        var ay = apple[1];
        // Nord.
        if (ax == x && ay < y)
        {
        	this.lastDatas.appleOrientation = 0;
        	state = CVM.TOOLS.Math.modulo((0 + 2 * orientation), 8);
        }
        // Nord-Est.
        else if (ax > x && ay < y)
        {
        	this.lastDatas.appleOrientation = 1;
        	state = CVM.TOOLS.Math.modulo((7 + 2 * orientation), 8);
        }
        // Est.
        else if (ax > x && ay == y)
        {
        	this.lastDatas.appleOrientation = 2;
        	state = CVM.TOOLS.Math.modulo((6 + 2 * orientation), 8);
		}
        // Sud-Est.
        else if (ax > x && ay > y)
        {
	        this.lastDatas.appleOrientation = 3;
 			state = CVM.TOOLS.Math.modulo((5 + 2 * orientation), 8);
        }
        // Sud.
        else if (ax == x && ay > y)
        {
        	this.lastDatas.appleOrientation = 4;
        	state = CVM.TOOLS.Math.modulo((4 + 2 * orientation), 8);
        }
        // Sud-Ouest.
        else if (ax < x && ay > y)
        {
        	this.lastDatas.appleOrientation = 5;
        	state = CVM.TOOLS.Math.modulo((3 + 2 * orientation), 8);
        }
        // Ouest.
        else if (ax < x && ay == y)
        {
        	this.lastDatas.appleOrientation = 6;
        	state = CVM.TOOLS.Math.modulo((2 + 2 * orientation), 8);
        }
        // Nord-Ouest.
        else if (ax < x && ay < y)
        {
        	this.lastDatas.appleOrientation = 7;
        	state = CVM.TOOLS.Math.modulo((1 + 2 * orientation), 8);
        }

		this.lastDatas.appleDirection = state;

        return state;
	};

	CVM.QFUNCTION.State.prototype.get_tailDirections = function(x, y, snake)
	{
		// Présence da la queue dans les 3 directions possibles. 2**3
		var tail = [0, 0, 0];

		for (var i = 1, length = snake.matrix.length; i < length; i++)
		{
			var pos = snake.matrix[i];
			if (pos[0] == x)
			{
				// Bas.
				if (pos[1] > y && snake.orientation !== 0)
				{
					tail[CVM.TOOLS.Math.modulo((2 - snake.orientation + 1), 4)] = 1;
				}
				// Haut.
				else if (pos[1] < y && snake.orientation !== 2)
				{
                    tail[CVM.TOOLS.Math.modulo((0 - snake.orientation + 1), 4)] = 1;
				}
			}
            else if (pos[1] == y)
            {
				// Droite.
                if (pos[0] > x && snake.orientation !== 3)
                {
                    tail[CVM.TOOLS.Math.modulo((1 - snake.orientation + 1), 4)] = 1;
                }
				// Gauche.
                else if (pos[0] < x && snake.orientation !== 1)
                {
                    tail[CVM.TOOLS.Math.modulo((3 - snake.orientation + 1), 4)] = 1;
                }
            }
		}
		
		return tail[0] * 4 + tail[1] * 2 + tail[2];
	};

	CVM.QFUNCTION.State.prototype.get_state = function(snake, apple)
	{
		// Coordonnées de la tête du serpent.
		var x = snake.matrix[0][0];
		var y = snake.matrix[0][1];

		// Présence des murs ou d'une partie de la queue aux alentours des actions possibles (2**3).
		var st1 = this.get_surrounding(x, y, snake);

		// Direction de la pomme (8**1).get_appleDirection
		var st2 = this.get_appleDirection(x, y, snake.orientation, apple);

		// Présence da la queue dans les 3 directions possibles. 2**3
		//var st3 = this.get_tailDirections(x, y, snake);

		/*
		 * Unir tous les états précédent en un état unique.
		 * st1 * b + st2 * a + st3.
		 * a = st3 = 8 états possibles.
		 * b = st2 * a = 8 * 8 = 64.
		 * c = st1 * b = 8 * 64 = 512.
		 */

		this.lastDatas.finalState = parseInt(st1 * 8 + st2);

		return this.lastDatas.finalState;
		//return parseInt(st1 * 8 + st3);
	};

	CVM.QFUNCTION.State.prototype.check_wallCollision = function(coordinates)
	{
		if ((coordinates[0] >= 0 && coordinates[0] < this.cols) && (coordinates[1] >= 0 && coordinates[1] < this.rows))
		{
			return false;
		}
		return true;
	};

	CVM.QFUNCTION.State.prototype.check_tailCollision = function(coordinates, snake)
	{
		for (var i = snake.length - 1; i >= 0; i--)
		{
			var pos = snake[i];
			if (coordinates[0] == pos[0] && coordinates[1] == pos[1])
			{
				return true;
			}
		}
		return false;
	};
}());