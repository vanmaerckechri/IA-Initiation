(function()
{
	"use strict";

	CVM.TOOLS.Numpy = function(){};

	CVM.TOOLS.Numpy.random = function(){};

	CVM.TOOLS.Numpy.random.randn = function(rows_n, cols_n)
	{
	    var output = [];
	    for (var r = 0; r < rows_n; r++)
	    {
	    	output[r] = [];
		    for (var c = 0; c < cols_n; c++)
		    {
		        output[r].push(this.gaussianRand());
		    }
	    }
	    return output;
	};

	CVM.TOOLS.Numpy.random.normal = function(size)
	{
		var output = [];
		for (var i = size -1; i >= 0; i--)
		{
			output.push(this.gaussianRand());
		}
		return output;
	};

	CVM.TOOLS.Numpy.random.gaussianRand = function()
	{
	    var r1, r2, w, X1, X2;
	 
	    do
	    {
	        r1 = 2 * Math.random() - 1;
	        r2 = 2 * Math.random() - 1;
	        w = r1 * r1 + r2 * r2;
	    }
	    while ( w >= 1 );
	 
	    w = Math.sqrt((-2 * Math.log(w)) / w);
	    X1 = r1 * w;
	    X2 = r2 * w;
	 
	    return X1;
	};

	CVM.TOOLS.Numpy.shape = function(array)
	{
		var rows_n = array.length;
		var cols_n = array[0].length;
		return [rows_n, cols_n];
	};

	CVM.TOOLS.Numpy.zeros = function(cols_n, value)
	{
		var output = [];
		for (var i = 0; i < cols_n; i++)
		{
			output[i] = value ? value : 0;
		}
		return output;
	};

	CVM.TOOLS.Numpy.round = function(array)
	{
		var output = []
		for (var i = array.length - 1; i >= 0; i--)
		{
			output[i] = Math.round(array[i]);
		}
		return output;
	};

	CVM.TOOLS.Numpy.dot = function(array1, array2)
	{
		var output = [];
		var cols_n = array2.length;
		for (var r = array1.length - 1; r >= 0; r--)
		{
			output[r] = 0;
			for (var c = 0; c < cols_n; c++)
			{
				output[r] += array1[r][c] * array2[c];
			}
		}
		return output;
	};

	CVM.TOOLS.Numpy.array = function(){};

	CVM.TOOLS.Numpy.array.sum = function(values, array)
	{
		for (var r = array.length - 1; r >= 0; r--)
		{	
			if (typeof array[r] == "number")
			{
				array[r] += values[0];				
			}
			else
			{
				for (var c = array[r].length - 1; c >= 0; c--)
				{
					array[r][c] += values[c];
				}	
			}
		}
		return array;
	};

	CVM.TOOLS.Numpy.array.compare_values = function(array1, array2)
	{
		var output = [];
		for (var i = array1.length - 1; i >= 0; i--)
		{	
			output[i] = array1[i] === array2[i];
		}
		return output;
	};

	CVM.TOOLS.Numpy.array.mean = function(array)
	{
		var output = 0;
		for (var i = array.length - 1; i >= 0; i--)
		{
			output += array[i];
		}
		return output / array.length;
	};
}());