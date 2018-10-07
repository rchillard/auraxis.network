// ROUTE with index as /feeds

// require express and initialize router
var express = require("express")
var router = express.Router()

// import models
var Feed = require("../models/feed")

// routes
// /feeds - show all feeds
router.get("/", function(req, res) {
    console.log("GET /feeds route hit")
    // res.send("/feeds route reached!")
    Feed.find({}, function(err, allFeeds) {
        if (err) {
            console.log(err)
        } else {
            res.render("feeds/index", {feeds: allFeeds})
        }
    })
})

// /feeds - post a new feed
router.post("/", function(req, res) {
    console.log("POST /feeds route hit")
    // pull each of the variables out of the body
    var name = req.body.name
    var description = req.body.description
    // create a new object storing all the variables together
    var newFeed = { name: name, description: description }
    // instantiate a new Feed object
    Feed.create(newFeed, function(err, newlyCreated) {
        if (err) {
            console.log(err)
        } else {
            console.log(newlyCreated)
            res.redirect("/feeds")
        }
    })
})

// /feeds/new - show form to create a new feed
router.get("/new", function(req, res) {
    console.log("GET /feeds/new route hit")
    res.render("feeds/new")
})

// /feeds/:id - show a feed feedd off id
router.get("/:id", function(req, res) {
    console.log("GET /feeds/:id/ show route hit")
    Feed.findById(req.params.id, function(err, foundFeed) {
        if (err) {
            console.log(err)
        } else {
            res.render("feeds/show", {feed: foundFeed} )
        }
    })
})

// /feeds/:id/edit - show form to edit an existing feed
router.get("/:id/edit", function(req, res) {
    console.log("GET /feeds/:id/edit route hit")
    console.log(req.params.id)
    Feed.findById(req.params.id, function(err, foundFeed) {
        if (err) {
            console.log(err)
        } else {
            res.render("feeds/edit", { feed: foundFeed })
        }
    })
})

// /feeds/:id - accept updates to an individual feed
router.put("/:id", function(req, res) {
     console.log("PUT /feeds/:id route hit")
    // find and update the correct feed
    Feed.findByIdAndUpdate(req.params.id, req.body.feed, function(err, updatedFeed) {
        if (err) {
            console.log(err)
            res.redirect("/feeds")
        } else {
            res.redirect("/feeds/" + req.params.id)
        }
    })
})

// /feeds/:id - delete an individual feed
router.delete("/:id", function(req, res) {
    Feed.findByIdAndRemove(req.params.id, function(err) {
        if (err) {
            console.log(err)
            res.redirect("/feeds")
        } else {
            res.redirect("/feeds")
        }
    })
})

module.exports = router