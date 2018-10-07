// ROUTE with index as /ideas

// require express and initialize router
var express = require("express")
var router = express.Router()

// import models
var Idea = require("../models/idea")

// routes
// /ideas - show all ideas
router.get("/", function(req, res) {
    console.log("GET /ideas route hit")
    // res.send("/ideas route reached!")
    Idea.find({}, function(err, allIdeas) {
        if (err) {
            console.log(err)
        } else {
            // allIdeas is an array of objects, each representing a single idea.  Each idea has a score
            // Sort in place the array of objects by the score of each idea and then return it
            allIdeas.sort(function(a, b){
                return b.score - a.score;
            })
            res.render("ideas/index", {ideas: allIdeas})
        }
    })
})

// /ideas - post a new idea
router.post("/", function(req, res) {
    console.log("POST /ideas route hit")
    // pull each of the variables out of the body
    var name = req.body.name
    var author = req.body.author
    var description = req.body.description
    var score = 0
    // create a new object storing all the variables together
    var newIdea = { name: name, author: author, description: description, score: score }
    // instantiate a new Idea object
    Idea.create(newIdea, function(err, newlyCreated) {
        if (err) {
            console.log(err)
        } else {
            console.log(newlyCreated)
            res.redirect("/ideas")
        }
    })
})

// /ideas/new - show form to create a new idea
router.get("/new", function(req, res) {
    console.log("GET /ideas/new route hit")
    res.render("ideas/new")
})


// /ideas/:id - show idea based off id
router.get("/:id", function(req, res) {
    console.log("GET /ideas/:id/ show route hit")
    Idea.findById(req.params.id, function(err, foundIdea) {
        if (err) {
            console.log(err)
        } else {
            res.render("ideas/show", {idea: foundIdea} )
        }
    })
})


// /ideas/:id/edit - show form to edit an existing idea
router.get("/:id/edit", function(req, res) {
    console.log("GET /ideas/:id/edit route hit")
    console.log(req.params.id)
    Idea.findById(req.params.id, function(err, foundIdea) {
        if (err) {
            console.log(err)
        } else {
            res.render("ideas/edit", { idea: foundIdea })
        }
    })
})

// /ideas/:id - accept updates to an individual idea
router.put("/:id", function(req, res) {
     console.log("PUT /ideas/:id route hit")
    // find and update the correct idea
    console.log(req.body)
    Idea.findByIdAndUpdate(req.params.id, req.body.idea, function(err, updatedIdea) {
        if (err) {
            console.log(err)
            res.redirect("/ideas")
        } else {
            res.redirect("/ideas")
        }
    })
})

// /ideas/:id - delete an individual idea
router.delete("/:id", function(req, res) {
    Idea.findByIdAndRemove(req.params.id, function(err) {
        if (err) {
            console.log(err)
            res.redirect("/ideas")
        } else {
            res.redirect("/ideas")
        }
    })
})

module.exports = router