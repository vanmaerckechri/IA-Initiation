(function()
{
	"use strict";

	CVM.QFUNCTION.Description = function()
	{
		this.snakeOrientation;
		this.speed;
		this.is_on;
	};

	CVM.QFUNCTION.Description.prototype.reset = function(orientation, is_on)
	{
		this.snakeOrientation = orientation;
		this.is_on = is_on;
	};

	CVM.QFUNCTION.Description.prototype.resize = function()
	{
		var container = document.getElementById("stateDescription");
		var height = Math.floor(container.getBoundingClientRect().width);
		container.style.height = height + "px";
	};

	CVM.QFUNCTION.Description.prototype.update = function(stateLastDatas, speed, qTable, action)
	{
		if (this.is_on != true)
		{
			return;
		}
		this.speed = speed;
		this.update_snakeOrientation(action);
		var surroundingState = this.update_snakeSurrounding(stateLastDatas.surrounding);
		this.update_appleDirection(stateLastDatas.appleDirection, stateLastDatas.appleOrientation);
		this.update_finalState(surroundingState, stateLastDatas.appleDirection, stateLastDatas.finalState);
		this.update_action(qTable, stateLastDatas.finalState);
	};

	CVM.QFUNCTION.Description.prototype.update_snakeOrientation = function(action)
	{
		this.snakeOrientation += (action - 1);

		var layer = document.getElementById("layer1");

		if ((window.navigator.userAgent).indexOf('Trident/') === -1)
		{
			layer.style.transition = "transform " + this.speed / 2000 + "s";
			layer.style.transformOrigin = "center center";
			layer.style.transform = "rotate3d(0, 0, 1, " + this.snakeOrientation * 90 + "deg)";
		}
		else
		{
			// ie <= 11
			layer.setAttribute("transform", "rotate(" + this.snakeOrientation * 90 + ", 200, 200)");
		}
	};

	CVM.QFUNCTION.Description.prototype.update_snakeSurrounding = function(surrounding)
	{
		var mult = 1;
		var result = 0;
		for (var i = surrounding.length - 1; i >= 0; i--)
		{
			this.update_content("description_surrounding" + i, surrounding[i] ? 1 : 0);
			this.update_content("surrounding" + i, surrounding[i] ? 1 : 0);

			result += surrounding[i] * mult;
			mult *= 2;
		}
		this.update_content("description_surroundingResult", result);
		return result;
	};

	CVM.QFUNCTION.Description.prototype.update_appleDirection = function(appleState, appleOrientation)
	{
		for (var i = 7; i >= 0; i--)
		{
			var color = appleOrientation == i ? "red" : "white";
			var apple = document.getElementById("apple" + i);
			apple.style.fill = color;
		}

		var container = document.getElementById("appleDirectionResult");
		container.textContent = appleState;
	};

	CVM.QFUNCTION.Description.prototype.update_finalState = function(surroundingState, appleState, finalState)
	{
		this.update_content("finalState0", surroundingState);
		this.update_content("finalState1", appleState);
		this.update_content("finalStateResult", finalState);
	};

	CVM.QFUNCTION.Description.prototype.update_action = function(qTable, finalState)
	{
		this.update_content("description_qTableState", finalState);

		var max = -Infinity;
		var index;
		for (var i = qTable[finalState].length - 1; i >= 0; i--)
		{
			var target = document.getElementById("description_qTableAction" + i);
			target.textContent = Math.round(qTable[finalState][i] * 100000) / 100000;
			target.classList.remove("active");

			if (qTable[finalState][i] > max)
			{
				max = qTable[finalState][i];
				index = i;
			}
		}
		target = document.getElementById("description_qTableAction" + index);
		target.classList.add("active");

		this.update_content("description_action", index);
	};

	CVM.QFUNCTION.Description.prototype.update_content = function(id, content)
	{
		var target = document.getElementById(id);
		target.textContent = content;
	};
}());