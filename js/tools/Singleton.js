(function()
{
	"use strict";

	CVM.TOOLS.Singleton = (function()
	{
		var instances = {};

		var createInstance = function(classname, arg)
		{
			var that = Object.create(classname.prototype);
			return classname.apply(that, arg) || that;
		};
		return {
			getInstance: function()
			{
				var classname = Array.prototype.shift.apply(arguments);

				if (!instances[classname])
				{
					instances[classname] = createInstance(classname, arguments);
				}
				return instances[classname];
			}
		};
	})();
}());