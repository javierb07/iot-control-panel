var mongoose = require("mongoose");
var Device = require("./models/device");

var data = [
    {
        name: "Demo Device",
        localURL: "wss://websocket-example-jb.herokuapp.com",
    }
]

function seedDB() {
    //Remove all devices
    Device.remove({}, function (err) {
        if (err) {
            console.log(err);
        }
        console.log("Removed devices!");
        // Add a few devices
        data.forEach(function (seed) {
            Device.create(seed, function (err, device) {
                if (err) {
                    console.log(err)
                } else {
                    console.log("Added a device");
                }
            });
        });
    });
}

module.exports = seedDB;