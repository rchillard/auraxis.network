
// Model for a Single Post

var mongoose = require("mongoose")

var postSchema = new mongoose.Schema({
    title: String,
    content: String,
    date: Date,
    author: String
    // author: {
    //     id: {
    //         type: mongoose.Schema.Types.ObjectId,
    //         ref: "User"
    //     },
    //     username: String
    // }
})

// Compose a model from the schema
var Post = mongoose.model("Post", postSchema)

module.exports = Post