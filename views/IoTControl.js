var PrinterSocket = new WebSocket("ws://192.168.0.9:8765/");
var LaserCutterSocket = new WebSocket("ws://192.168.0.9:8766/");
var StorageSystemSocket = new WebSocket("ws://192.168.0.9:8768/");
var SmartLampSocket = new WebSocket("ws://192.168.0.9:8767/");
PrinterSocket.onerror = function (event) {
	alert("Problem establishing communication with 3D Printer WebSocket")
}
LaserCutterSocket.onerror = function (event) {
	alert("Problem establishing communication with Laser Cutter WebSocket")
}
StorageSystemSocket.onerror = function (event) {
	alert("Problem establishing communication with RPi4 WebSocket")
}
SmartLampSocket.onerror = function (event) {
	alert("Problem establishing communication with RPi4 WebSocket")
}
websocketWaiter();
webScocketCom(PrinterSocket);
webScocketCom(LaserCutterSocket);
webScocketCom(StorageSystemSocket);
webScocketCom(SmartLampSocket);

PrinterSocket.onmessage = function (event) {
	let printerMessage = event.data;
	let messageElem = document.createElement('div');
  	messageElem.textContent = printerMessage;
	document.getElementById('printerMessage').innerHTML = messageElem.textContent;
	setButton('printerMessage','3DPrinterButton');
  	webScocketCom(PrinterSocket);
}

LaserCutterSocket.onmessage = function (event) {
	let LaserCutterMessage = event.data;
	let messageElem = document.createElement('div');
	messageElem.textContent = LaserCutterMessage;
	document.getElementById('laserCutterMessage').innerHTML = messageElem.textContent;
	setButton('laserCutterMessage','LaserCutterButton');
  	webScocketCom(LaserCutterSocket);
}

StorageSystemSocket.onmessage = function (event) {
	let StorageSystemMessage = event.data;
	let messageElem = document.createElement('div');
	messageElem.textContent = StorageSystemMessage;
	document.getElementById('storageSystemMessage').innerHTML = messageElem.textContent;
	setButton('storageSystemMessage','StorageSystemButton')
	webScocketCom(StorageSystemSocket);
}

SmartLampSocket.onmessage = function (event) {
	let SmartLampMessage = event.data;
	let messageElem = document.createElement('div');
	messageElem.textContent = SmartLampMessage;
	document.getElementById('smartLampMessage').innerHTML = messageElem.textContent;
	setButton('smartLampMessage','SmartLampButton')
	webScocketCom(SmartLampSocket);
}

function websocketWaiter(){
    setTimeout(function(){
		if (LaserCutterSocket.readyState === 1 & LaserCutterSocket.readyState === 1) {
                console.log("Connection is made")
            } else {
                console.log("wait for connection...")
                websocketWaiter();
            }
        }, 5); // wait 5 milisecond for the connection...
};

function webScocketCom (socket){
	if (socket.readyState === 1) {
		socket.send("Request data!");
	}
}

function doFunction(url){
	var xhr = new XMLHttpRequest();
	xhr.open('GET', url, true);
	xhr.send();
}

function setButton(machine,button){
	if(document.getElementById(machine).innerHTML == '0'){
		document.getElementById(button).value = 'OFF';
		document.getElementById(button).style.background='#FF0000';
	}
	else{
		document.getElementById(button).value = 'ON';
		document.getElementById(button).style.background='#008000';	
	}
}