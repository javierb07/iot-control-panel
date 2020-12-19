var mongoose = require("mongoose");
var Device = require("./models/device");

var data = [
    {
        name: "3D Printer", 
        localURL: "ws://192.168.0.9:8765/",
    },
    {
        name: "Laser Engraver", 
        localURL: "ws://192.168.0.9:8766/",
    },
    {
        name: "Intelligent Storage System", 
        localURL: "ws://192.168.0.9:8768/",
    },
    {
        name: "Smart Lamp", 
        localURL: "ws://192.168.0.9:8767/",
    }
]

function seedDB(){
   //Remove all devices
   Device.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("Removed devices!");
        // Add a few devices
        data.forEach(function(seed){
            Device.create(seed, function(err, device){
                if(err){
                    console.log(err)
                } else {
                    console.log("Added a device");
                }
            });
        });
    }); 
}

module.exports = seedDB;