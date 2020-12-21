(function()
{
	"use strict";

	CVM.TOOLS.CanvasManager = function(){};

	CVM.TOOLS.CanvasManager.init_canvas = function(canvas, width, height)
	{
		canvas.width = width;
		canvas.height = height;
		return canvas.getContext("2d");
	};

	CVM.TOOLS.CanvasManager.draw_line = function(ctx, coordinates, optional)
	{
		ctx.beginPath();
		ctx.moveTo(coordinates[0][0], coordinates[0][1]);
		ctx.lineTo(coordinates[1][0], coordinates[1][1]);
		this.apply_color(ctx, optional);
	};

	CVM.TOOLS.CanvasManager.draw_shape = function(ctx, coordinates, optional)
	{	
		ctx.beginPath();
		ctx.moveTo(coordinates[0][0], coordinates[0][1]);

		for (var i = 1, length = coordinates.length; i < length; i++)
		{
			ctx.lineTo(coordinates[i][0], coordinates[i][1]);
		}

		if (optional)
		{
			if (optional.is_closePath)
			{
				ctx.closePath();
			}
			this.apply_color(ctx, optional);
		}
	};

	CVM.TOOLS.CanvasManager.draw_circle = function(ctx, x, y, r, optional)
	{
		ctx.beginPath();
		ctx.arc(x, y, r, 0, 2 * Math.PI);
		this.apply_color(ctx, optional);
	};

	CVM.TOOLS.CanvasManager.draw_rect = function(ctx, x, y, w, h, optional)
	{
		ctx.beginPath();
		ctx.rect(x, y, w, h);
		this.apply_color(ctx, optional);
	};

	CVM.TOOLS.CanvasManager.draw_text = function(ctx, x, y, content, optional)
	{
		var fontFam = !optional || !optional.fontFam ? "Arial" : optional.fontFam;
		var fontSize = !optional || !optional.fontSize ? 18 : optional.fontSize;
		var fontWeight = !optional || !optional.fontWeight ? "normal" : optional.fontWeight;
		var color = !optional || !optional.color ? "black" : optional.color;
		var align = !optional || !optional.align ? "left" : optional.align;

		ctx.font = fontWeight + " " + fontSize + "px " + fontFam;
		ctx.fillStyle = color;
		ctx.textAlign = align;
		ctx.fillText(content, x - (fontSize / 2), y + (fontSize / 2));
	};

	CVM.TOOLS.CanvasManager.apply_color = function(ctx, optional)
	{
		if (!optional)
		{
			ctx.stroke();
			return;
		}
		if (optional.fillColor)
		{
			ctx.fillStyle = optional.fillColor;
			ctx.fill();
		}
		if (optional.strokeColor)
		{
			ctx.strokeStyle = optional.strokeColor;
			ctx.lineWidth = !optional.lineWidth ? 1 : optional.lineWidth;
			ctx.stroke();
		}
	};

	CVM.TOOLS.CanvasManager.clear = function(ctx, canvas, color)
	{
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		if (color)
		{
			CVM.TOOLS.CanvasManager.draw_rect(ctx, 0, 0, canvas.width, canvas.height, {fillColor: color})
		}
	};
}());