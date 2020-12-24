# IoT Control Panel
Dashboard to control and monitor machines connected to smart plugs.

Connect machines or devices to smart plugs and control (turn them on or off) and monitor them (see their power consumption).

Tested and developed connecting 4 machines and devices to Wemo Insight Smart Plug.

See https://github.com/iancmcc/ouimeaux for the API used to interact with the Wemo plugs.

Should work with any smart plug that works under webSocket protocols and understands the following commands:
*toggle: to switch between on and off states
*power: to send power consumption data

In the smartplug folder it is included a Python file to start a webSocket server from a Wemo smart plug. Set up the Wemo device using their app, change the name variable in the Python script to the name of your device and run the script. Copy the IP address of your webSocket.

Finally, add your device to the database through the web GUI and all is set.

See example at https://iot-control.herokuapp.com/control

Example dashboard (no connections established):

![dashboard](https://github.com/javierb07/IoT_Control_Panel/blob/master/Example_Panel.jpg)

