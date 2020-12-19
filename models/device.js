var mongoose = require("mongoose");

// Define schemas
var deviceSchema = new mongoose.Schema({
    name: String,
    localURL: String
});

module.exports = mongoose.model("Device", deviceSchema);