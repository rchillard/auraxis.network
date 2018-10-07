// ROUTE with index as /:author_id/posts

// require express and initialize router
var express = require("express")
var router = express.Router()

// import models
var Post = require("../models/post")

// routes
// /posts - show all posts
router.get("/", function(req, res) {
    console.log("GET /posts route hit")
    // res.send("/posts route reached!")
    Post.find({}, function(err, allPosts) {
        if (err) {
            console.log(err)
        } else {
            res.render("posts/index", {posts: allPosts})
        }
    })
})

// /posts - post a new post
router.post("/", function(req, res) {
    console.log("POST /posts route hit")
    // pull each of the variables out of the body
    var name = req.body.name
    var type = req.body.type
    var points = req.body.points
    var continent = req.body.continent
    var image = req.body.image
    var description = req.body.description
    // create a new object storing all the variables together
    var newPost = { name: name, type: type, points: points, continent: continent, image: image, description: description }
    // instantiate a new Post object
    Post.create(newPost, function(err, newlyCreated) {
        if (err) {
            console.log(err)
        } else {
            console.log(newlyCreated)
            res.redirect("/posts")
        }
    })
})

// /posts/new - show form to create a new post
router.get("/new", function(req, res) {
    console.log("GET /posts/new route hit")
    res.render("posts/new")
})


// /posts/:id - show a post postd off id
router.get("/:id", function(req, res) {
    console.log("GET /posts/:id/ show route hit")
    Post.findById(req.params.id, function(err, foundPost) {
        if (err) {
            console.log(err)
        } else {
            res.render("posts/show", {post: foundPost} )
        }
    })
})


// /posts/:id/edit - show form to edit an existing post
router.get("/:id/edit", function(req, res) {
    console.log("GET /posts/:id/edit route hit")
    console.log(req.params.id)
    Post.findById(req.params.id, function(err, foundPost) {
        if (err) {
            console.log(err)
        } else {
            res.render("posts/edit", { post: foundPost })
        }
    })
})

// /posts/:id - accept updates to an individual post
router.put("/:id", function(req, res) {
     console.log("PUT /posts/:id route hit")
    // find and update the correct post
    Post.findByIdAndUpdate(req.params.id, req.body.post, function(err, updatedPost) {
        if (err) {
            console.log(err)
            res.redirect("/posts")
        } else {
            res.redirect("/posts/" + req.params.id)
        }
    })
})

// /posts/:id - delete an individual post
router.delete("/:id", function(req, res) {
    Post.findByIdAndRemove(req.params.id, function(err) {
        if (err) {
            console.log(err)
            res.redirect("/posts")
        } else {
            res.redirect("/posts")
        }
    })
})

module.exports = router