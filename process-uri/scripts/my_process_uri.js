"use strict";
/*
 * This file is to get a json format object representing the url hash and search and sent a property
 * into the global object so that the other parts can use it.
 *
 * 06/12/2016 
***/
var MyProcessURI = (function () {
		var uriHash = window.location.hash,
		    uriSearch = window.location.search,
			result = {};
		 
		function uriformParams(params) {
			// The first letter of "hash" and "search" is just a symbol such as "#" and "?"
			if (params && (params.length > 1)) {
				//decode the uri parameters which may contain some special characters, then ... and split the params
				return decodeURI(params.substring(1)).replace(/"/g, '\\"').split("&");
			} else {
				return null;
			}
		}

		function getJsonObjectFromParams(params) {
			let obj = {};
			if (params && params.length > 0) {
				params.forEach ((element) => {
					let paraEntry = element.split("=");
					if (paraEntry.length === 2) {
						if (obj.hasOwnProperty(paraEntry[0])) {
							let entrySet = obj[paraEntry[0]];
							if (Array.isArray(entrySet)) { //The param contains a list other than a value
								entrySet.push(paraEntry[1]);
							} else {
								obj[paraEntry[0]] = [entrySet, paraEntry[1]];
							}
						} else {
							obj[paraEntry[0]] = paraEntry[1];
						}
					}
				});
			}

			if (Object.keys(obj).length > 0 && obj.constructor === Object) {
				return obj;
			} else {
				return null;
			}
		}

		function convertParamsToJsonObject() {
			var searchJson = getJsonObjectFromParams(uriformParams(uriSearch)),
				hashJson = getJsonObjectFromParams(uriformParams(uriHash));

			if (searchJson) {
				result["search"] = searchJson;
			}

			if (hashJson) {
				result["hash"] = hashJson;
			}
			return result;
		} 

		return convertParamsToJsonObject();
})();