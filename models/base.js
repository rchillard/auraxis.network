
// Model for a Single Base

var mongoose = require("mongoose")

var baseSchema = new mongoose.Schema({
    name: String,
    image: String,
    type: String,
    continent: String,
    description: String,
    points: String
})

// Compose a model from the schema
var Base = mongoose.model("Base", baseSchema)

module.exports = Base