
// Model for a Single Feed

var mongoose = require("mongoose")

var feedSchema = new mongoose.Schema({
    name: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    posts: []
})

// Compose a model from the schema
var Feed = mongoose.model("Feed", feedSchema)

module.exports = Feed