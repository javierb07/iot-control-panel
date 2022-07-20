$(document).ready(function () {
	// Establish websocket communication with each device
	var devicesNames = [];
	$('.device-name').each(function (index, obj) {
		devicesNames.push($(this).text());
	});
	var devicesURLs = [];
	$('.device-URL').each(function (index, obj) {
		devicesURLs.push($(this).text());
	});
	var websockets = {};
	for (var i = 0; i < devicesNames.length; i++) {
		websockets[devicesNames[i]] = new WebSocket(devicesURLs[i]);
	}
	for (const [name, websocket] of Object.entries(websockets)) {
		websocket.onerror = function (event) {
			alert("Problem establishing communication with " + name);
		}
		websocket.onopen = function (event) {
			setTimeout(function () { retrievePowerData(websockets); }, 500);
			// Listen for clicks on control button
			var modName = name.replaceAll(" ", "-");
			var nameButton = "#" + modName + "-button";
			$(nameButton).click(function (event) {
				console.log(websocket.readyState);
				var modName = name.replaceAll(" ", "-");
				var nameID = "#" + modName + "-power";
				var nameIDBut = "#" + modName + "-button button";
				if (websocket.readyState == 1) {
					console.log("socket ready");
					websocket.send($(nameIDBut).text() == "ON" ? "off" : "on");
					retrievePowerData(websocket);
				} else {
					$(nameIDBut).text("TERMINATED");
					$(nameID).text("-");
				}
			});
		}
	}
});

function retrievePowerData(websockets) {
	for (const [name, websocket] of Object.entries(websockets)) {
		if (websocket.readyState == 1) {
			websocket.send("power");
			// When data from power consumption
			websocket.onmessage = function (event) {
				var modName = name.replaceAll(" ", "-");
				var nameID = "#" + modName + "-power";
				var nameIDBut = "#" + modName + "-button button";
				$(nameID).text(event.data);
				if (event.data != 0) {
					$(nameIDBut).text("ON");
				} else {
					$(nameIDBut).text("OFF");
				}
				retrievePowerData(websockets);
			}
		}
	}
}