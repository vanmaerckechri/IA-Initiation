(function()
{
	"use strict";

	CVM.TOOLS.Math = function(){};

	CVM.TOOLS.Math.modulo = function(a, b)
	{
    	return ((a % b) + b) % b;
	}
}());