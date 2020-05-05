'use strict';

var os = require('os');
var ifaces = os.networkInterfaces();
var hostname = "";

Object.keys(ifaces).forEach(function (ifname) {
  var alias = 0;
  ifaces[ifname].forEach(function (iface) {
    if ('IPv4' !== iface.family || iface.internal !== false) {
      // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
      return;
    }
    if (alias >= 1) {
      // this single interface has multiple ipv4 addresses
      console.log(ifname + ':' + alias, iface.address);
      
    } else {
      // this interface has only one ipv4 adress
      console.log(ifname, iface.address);
      if(ifname=="Ethernet 3"){
        hostname = iface.address;
      }
    }
    ++alias;
  });
});

var express = require("express"),
    app = express(),
    server = require("http").Server(app),
    path = require('path');

const PORT = 80;
app.use(express.static(__dirname + '/views'));

// RESTFUL ROUTES
app.get("/", function(req, res){
    res.redirect("/control");
});

// INDEX ROUTE (It should display control panel)
app.get("/control", function(req, res){
    res.sendFile(path.join(__dirname + "/views/IoTControl.html"));
 });

 // Catch all routes
 app.get('/*', function(req,res){
    res.redirect("/control");
});

server.listen(PORT,hostname,function(eer){
    if (eer){
        console.log("Something went wrong.");
    } else {
        console.log("Server is running.");
    }
});