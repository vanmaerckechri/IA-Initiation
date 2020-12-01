(function()
{
	"use strict";

	CVM.TOOLS.DomManager = function(){};

	CVM.TOOLS.DomManager.createElement = function(tag, attributes, container, content)
	{
		var elem = document.createElement(tag);

		if (attributes)
		{
			for (var attribute in attributes)
			{
				elem.setAttribute(attribute, attributes[attribute]);
			}
		}
		if (content)
		{
			elem.textContent = content;
		}
		if (container)
		{
			container.appendChild(elem);
		}

		return elem;
	};

	CVM.TOOLS.DomManager.removeDomElement = function(element)
	{	
		if (element)
		{
			element = typeof element != 'object' ? [element] : element;
			for (var i = element.length - 1; i >= 0; i--)
			{
				if (element[i].parentNode)
				{
					element[i].parentNode.removeChild(element[i]);
				}
			}
		}
	};
}());