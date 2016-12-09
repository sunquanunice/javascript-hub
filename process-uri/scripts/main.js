"use strict";

$(document).ready(function () {
	var uriElement = "#uri",
		uriAutoHeightProcess =  MyAutoHeightProcessor.init(uriElement);
		
		$(uriElement).text(window.location.href).trigger("input");
});
