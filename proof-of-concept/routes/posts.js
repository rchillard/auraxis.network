// ROUTE with index as /:author_id/posts

// require express and initialize router
var express = require("express")
var router = express.Router()

// middleware
var middleware = require("../middleware")

// import models
var Post = require("../models/post")
var User = require("../models/user")

// routes
// /posts - show all posts
router.get("/", function(req, res) {
    console.log("GET /posts route hit")
    // res.send("/posts route reached!")
    Post.find({}, function(err, allPosts) {
        if (err) {
            console.log(err)
        } else {
            // console.log(allPosts)
            res.render("posts/index", {posts: allPosts})
        }
    })
})

// /posts - post a new post
router.post("/", middleware.isLoggedIn, function(req, res) {
    console.log("POST /posts route hit")
    User.findById(req.user._id, function(err, foundUser) {
        if (err) {
            console.log(err)
        } else {
            Post.create(req.body.post, function(err, post) {
                if (err) {
                    console.log(err)
                } else {
                    post.author.id = req.user._id
                    post.author.username = req.user.username
                    post.author.faction = req.user.faction
                    post.save()
                    foundUser.posts.push(post)
                    foundUser.save()
                    res.redirect("/posts")
                }
            })
        }
    })
})

// /posts/new - show form to create a new post
router.get("/new", function(req, res) {
    console.log("GET /posts/new route hit")
    res.render("posts/new")
})


// /posts/:id - show a post based off id
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