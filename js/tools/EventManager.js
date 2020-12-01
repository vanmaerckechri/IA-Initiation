(function()
{
	"use strict";

	CVM.TOOLS.EventManager = function()
	{
		this.list = {};
	};

	CVM.TOOLS.EventManager.prototype.add = function(name, elem, event, method, params)
	{	
		if (this.list[name])
		{
			this.remove[name];
		}

		this.list[name] = {elem: elem, event: event, method: method, params: params};

		if (params)
		{
			elem.addEventListener(event, method, params);
		}
		else
		{
			elem.addEventListener(event, method);
		}
	};

	CVM.TOOLS.EventManager.prototype.cleanList = function()
	{
		for (var name in this.list)
		{
			if (!document.body.contains(this.list[name].elem))
			{
				this.remove(name);
			}
		}
	};

	CVM.TOOLS.EventManager.prototype.remove = function(name)
	{
		if (this.list[name])
		{
			if (this.list[name].params)
			{
				this.list[name].elem.removeEventListener(this.list[name].event, this.list[name].method, this.list[name].params);
			}
			else
			{
				this.list[name].elem.removeEventListener(this.list[name].event, this.list[name].method);
			}

			delete this.list[name];
		}
	};

	CVM.TOOLS.EventManager.prototype.removeAll = function()
	{
		for (var name in this.list)
		{
			this.remove(name);
		}
	};
}());