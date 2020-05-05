var PrinterSocket = new WebSocket("ws://192.168.100.2:8100/");
var LaserCutterSocket = new WebSocket("ws://192.168.100.2:8200/");
var CNCSocket = new WebSocket("ws://192.168.100.2:8300/");
var RPi4Socket = new WebSocket("ws://192.168.100.2:8400/");
PrinterSocket.onerror = function (event) {
	alert("Problem establishing communication with 3D Printer WebSocket")
}
LaserCutterSocket.onerror = function (event) {
	alert("Problem establishing communication with Laser Cutter WebSocket")
}
CNCSocket.onerror = function (event) {
	alert("Problem establishing communication with CNC WebSocket")
}
RPi4Socket.onerror = function (event) {
	alert("Problem establishing communication with RPi4 WebSocket")
}
websocketWaiter();
webScocketCom(PrinterSocket);
webScocketCom(LaserCutterSocket);
webScocketCom(CNCSocket);
webScocketCom(RPi4Socket);
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
CNCSocket.onmessage = function (event) {
	let CNCMessage = event.data;
	let messageElem = document.createElement('div');
	messageElem.textContent = CNCMessage;
	document.getElementById('CNCMessage').innerHTML = messageElem.textContent;
	setButton('CNCMessage','5AxisCNCButton')
	webScocketCom(CNCSocket);
}
RPi4Socket.onmessage = function (event) {
	let RPi4Message = event.data;
	let messageElem = document.createElement('div');
	messageElem.textContent = RPi4Message;
	document.getElementById('RPi4Message').innerHTML = messageElem.textContent;
	setButton('RPi4Message','RPi4')
	webScocketCom(RPi4Socket);
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