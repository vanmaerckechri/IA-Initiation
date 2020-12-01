(function()
{
	"use strict";

	CVM.TOOLS.ArrayManager = function(){};

	CVM.TOOLS.ArrayManager.average_array = function(array)
	{
		var sum = 0;
		for (var i = array.length - 1; i >= 0; i--)
		{
			sum += array[i];
		}
		return sum / array.length;
	}

	CVM.TOOLS.ArrayManager.convert_array2dTo1d = function(array)
	{
		var newArray = [];
		for(var i = 0; i < array.length; i++)
		{
		    newArray = newArray.concat(array[i]);
		}
		return newArray;
	}

	CVM.TOOLS.ArrayManager.sum_colFromArray2d = function(array, c)
	{
		var sum = 0;
		for (var r = 0, rLength = array.length; r < rLength; r++)
		{
			sum += array[r][c];
		}
		return sum;
	}

	CVM.TOOLS.ArrayManager.sum_rowFromArray2d = function(array, r)
	{
		var sum = 0;
		for (var c = 0, cLength = array[r].length; c < cLength; c++)
		{
			sum += array[r][c];
		}
		return sum;
	}

	CVM.TOOLS.ArrayManager.sum_array = function(array)
	{
		var sum = 0;
		for (var i = 0, length = array.length; i < length; i++)
		{
			sum += array[i];
		}
		return sum;
	}

	CVM.TOOLS.ArrayManager.zeros = function(board_rows, board_cols)
	{
		var array = [];
		for (var r = board_rows - 1; r >= 0; r--)
		{
			array[r] = [];
			for (var c = board_cols - 1; c >= 0; c--)
			{
				array[r][c] = 0;
			}
		}
		return array;
	}
}());