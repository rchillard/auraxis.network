
// Model for a Single Idea

var mongoose = require("mongoose")

var ideaSchema = new mongoose.Schema({
    name: String,
    author: String,
    type: String,
    description: String,
    score: Number
})

// Compose a model from the schema
var Idea = mongoose.model("Idea", ideaSchema)

module.exports = Idea