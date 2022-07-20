var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    methodOverride = require("method-override"),
    seedDB = require("./seeds"),
    Device = require("./models/device");

// Set up default mongoose connection
const host = process.env.HOST || "mongodb://localhost:27017/iot-panel";
mongoose.connect(host, { useNewUrlParser: true, useUnifiedTopology: true }, function (err) {
    if (err) {
        console.log("Conection error to database")
    } else {
        console.log("Connected to database")
    }
});
// Get the default connection
var db = mongoose.connection;
// Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// App configuration
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());
app.use(methodOverride('_method'));
app.set("view engine", "ejs");
app.use(express.static(__dirname));

seedDB(); // Seed the database

// RESTFUL ROUTES
app.get("/", function (req, res) {
    res.redirect("/control");
});

// INDEX ROUTE (It should display control panel)
app.get("/control", function (req, res) {
    Device.find({}, function (err, devices) {
        if (err) {
            req.flash("error", "Problem finding devices in database");
            console.log(err);
            res.send("error", { error: err });
        } else {
            res.render("IoTControl", { devices: devices });
        }
    })
});

// Create route: It creates a new device
app.post("/devices", function (req, res) {
    var device = req.body.device;
    // Validate websocket URL
    let re = /(wss?):\/\/[0-2]?[0-9]?[0-9].[0-2]?[0-9]?[0-9].[0-2]?[0-9]?[0-9].[0-2]?[0-9]?[0-9]:[0-6]?[0-9]?[0-9]?[0-9]?[0-9]/;
    if (re.test(device.IP)) {
        var newDevice = { name: device.name, localURL: device.IP }
        // Create a new device and save to DB
        Device.create(newDevice, function (err, newlyCreated) {
            if (err) {
                console.log(err);
                res.send("error", { error: err });
            } else {
                //redirect back to home page
                if (req.body.device == undefined) {
                    res.send(newlyCreated._id);
                } else {
                    res.redirect("/control");
                }
            }
        });
    } else if (device.URL) {
        var newDevice = { name: device.name, localURL: device.URL }
        // Create a new device and save to DB
        Device.create(newDevice, function (err, newlyCreated) {
            if (err) {
                console.log(err);
                res.send("error", { error: err });
            } else {
                //redirect back to home page
                if (req.body.device == undefined) {
                    res.send(newlyCreated._id);
                } else {
                    res.redirect("/control");
                }
            }
        });
    } else {
        res.send("Invalid regular expression");
    }
})

// Destroy route: Deletes a device
app.delete("/devices/:id", function (req, res) {
    Device.findByIdAndRemove(req.params.id, function (err) {
        if (err) {
            console.log(err);
            res.send("error", { error: err });
        } else {
            res.redirect("/control");
        }
    });
});

// Catch all routes
app.get('/*', function (req, res) {
    res.redirect("/control");
});

const PORT = process.env.PORT || 80;

app.listen(PORT, function (eer) {
    if (eer) {
        console.log("Something went wrong.");
    } else {
        console.log("Server is running.");
    }
});