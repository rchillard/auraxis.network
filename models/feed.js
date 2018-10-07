
// Model for a Single Feed

var mongoose = require("mongoose")

var feedSchema = new mongoose.Schema({
    name: String,
    description: String,
    faction: String,
    updated: Date
})

// Compose a model from the schema
var Feed = mongoose.model("Feed", feedSchema)

module.exports = Feed