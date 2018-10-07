var express = require("express")
var router = express.Router()

var passport = require("passport")
var User = require("../models/user")

// ====================
// AUTHORIZATION ROUTES
// ====================

// show register form
router.get("/register", function(req, res) {
    // res.send("Register route!")
    console.log("GET /register route")
    res.render("users/register")
})

// Temporary function to assign avatars to new registrants (need to figure out how to move this Models or somewhere more appropriate?)
function avatarAssign(fact) {
    switch(fact) {
        case "New Conglomerate":
            return "https://www-cdn.planetside2.com/images/empires/nc/nc-soldier-right.png?v=3304520529"
        case "Terran Republic":
            return "https://www-cdn.planetside2.com/images/empires/tr/tr-soldier-right.png?v=157706187"
        case "Vanu Sovereignty":
            return "https://www-cdn.planetside2.com/images/empires/vs/vs-soldier-right.png?v=616336742"
        default: 
            return "https://vignette.wikia.nocookie.net/planetside2/images/9/93/Auraxis.jpg/revision/latest/scale-to-width-down/220?cb=20150129141914"
    }
}

// handle new registration
router.post("/new", function(req, res) {
    // make new user
    console.log("POST /users/new route")
    var newUser = new User({ username: req.body.username, faction: req.body.faction, avatar: avatarAssign(req.body.faction)})
    // register new user in database
    User.register(newUser, req.body.password, function(err, user) {
        if (err) {
            console.log(err)
            return res.redirect("/users/register")
        }
        // authenticate this user in session
        passport.authenticate("local")(req, res, function() {
            res.redirect("/")
        })
    })
})

// show login form
router.get("/login", function(req, res) {
    // res.send("Login route!")
    console.log("GET /users/login route")
    res.render("users/login", {currentUser: req.user})
})

// handle login
// app.post("route", middleware, callback)
router.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/",
        failureRedirect: "/users/register"
    }), function(req, res) {
})

// handle logout
router.get("/logout", function(req, res) {
    console.log("GET /users/logout route")
    req.logout()
    res.redirect("/")
})

// show profile of individual user
router.get("/:id", function(req, res) {
    console.log("GET /users/:id/profile route")
    User.findById(req.params.id, function(err, foundUser) {
        if (err) {
            console.log(err)
        } else {
            res.render("users/show", {user: foundUser})
        }
    })
})

// edit profile of individual user
router.get("/:id/edit", function(req, res) {
    console.log("GET /users/:id/edit route hit")
    User.findById(req.params.id, function(err, foundUser) {
        if (err) {
            console.log(err)
        } else {
            res.render("users/edit", { user: foundUser })
        }
    })
})

// /users/:id - accept updates to an individual user
router.put("/:id", function(req, res) {
     console.log("PUT /users/:id route hit")
    // find and update the correct user
    User.findByIdAndUpdate(req.params.id, req.body.user, function(err, updatedUser) {
        if (err) {
            console.log(err)
            res.redirect("/users/edit")
        } else {
            console.log("User updated!")
            res.redirect("/users/" + req.params.id)
        }
    })
})

module.exports = router