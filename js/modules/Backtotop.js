(function()
{
	"use strict";

	CVM.MODULES.BackToTop = function()
	{
		this.interval = null;
		this.container = null;

		this.init();
	};

	CVM.MODULES.BackToTop.prototype.init = function()
	{
		var main = document.getElementById("main");
		this.container = CVM.TOOLS.DomManager.createElement("div", {"class": "container-large backToTop-container disable"}, main);
		var btnLaunch = CVM.TOOLS.DomManager.createElement("button", {"class": "btn backToTop-btn", "aria-label": "retourner en haut de la page"}, this.container);
		btnLaunch.addEventListener("click", this.smoothToTop.bind(this));
		window.addEventListener("scroll", this.toggleDisplayBtn.bind(this));
	};

	CVM.MODULES.BackToTop.prototype.toggleDisplayBtn = function()
	{
		var body = document.body;
		var height = Math.round(window.innerHeight / 4);

		if (document.body.scrollTop > height || document.documentElement.scrollTop > height)
		{
			this.container.classList.remove("disable");
		}
		else
		{
			this.container.classList.add("disable");
		}
	}
	
	CVM.MODULES.BackToTop.prototype.smoothToTop = function(e)
	{
		e.preventDefault();

		if (this.interval) 
		{
			return;
		}

		var distance = window.pageYOffset;
		var startAt = new Date();

		this.interval = setInterval(function()
		{ 
			window.scrollTo(0, distance)
			distance -= 100;

			if (distance <= 0 || (new Date() - startAt > 1000))
			{
				window.scrollTo(0, 0)
				clearInterval(this.interval);
				this.interval = null;
			}
		}.bind(this));
	}

	var backToTop = new CVM.MODULES.BackToTop();
}());