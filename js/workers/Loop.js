onmessage = function(e)
{
	var i = e.data[0];
	var e = e.data[1];

	for (var i = 0; i < e; i++)
	{
		postMessage(i);
	}
}