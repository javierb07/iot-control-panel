$(document).ready(function() {
	// Establish websoscket communication with each device
	var devicesNames = [];
	$('.device-name').each(function(index, obj) {
		devicesNames.push($(this).text());
	});
	var devicesURLs = [];
	$('.device-URL').each(function(index, obj) {
		devicesURLs.push($(this).text());
	});
	var websockets = {};
	for(var i = 0; i < devicesNames.length; i++) {
		websockets[devicesNames[i]] = new WebSocket(devicesURLs[i]);
	}
	for (const [name, websocket] of Object.entries(websockets)) {
		websocket.onerror = function (event) {
			alert("Problem establishing communication with " + name);
		}
		// Listen for clicks on power control button
		var modName = name.replace(" ", "-");
		var nameButton = "#" + modName + "-button";
		$(nameButton).click(function(event){
			if( websocket.readyState == 1 ){
				websocket.send("toggle");
			}	
		});
	}

	// Call websocket waiter function and websocket communication
	websocketWaiter(Object.values(websockets)[0]);
	retrivedPowerData(websockets);

});

function retrivedPowerData(websockets){
	for (const [name, websocket] of Object.entries(websockets)) {
		if (websocket.readyState == 1) {
			websocket.send("power");
		}
		// When data from power consumption
		websocket.onmessage = function (event) {
			var modName = name.replace(" ", "-");
			var nameButton = "#" + modName + "-button";
			var nameID = "#" + modName + "power";
			$(nameID).innerHTML = event.data;
			retrivedPowerData(websockets);
		}
	}
}

function websocketWaiter(websocket){
    setTimeout(function(){
		if (websocket.readyState === 1) {
                console.log("Connection is made")
            } else {
                console.log("wait for connection...")
                websocketWaiter(websocket);
            }
        }, 5); // wait 5 milisecond for the connection...
};