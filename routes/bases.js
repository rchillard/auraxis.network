// ROUTE with index as /bases

// require express and initialize router
var express = require("express")
var router = express.Router()

// middleware
var middleware = require("../middleware")

// import models
var Base = require("../models/base")

// routes
// /bases - show all bases
router.get("/", function(req, res) {
    console.log("GET /bases route hit")
    // res.send("/bases route reached!")
    Base.find({}, function(err, allBases) {
        if (err) {
            console.log(err)
        } else {
            res.render("bases/index", {bases: allBases})
        }
    })
})

// /bases - post a new base
router.post("/", middleware.isLoggedIn, function(req, res) {
    console.log("POST /bases route hit")
    // pull each of the variables out of the body
    var name = req.body.name
    var type = req.body.type
    var points = req.body.points
    var continent = req.body.continent
    var image = req.body.image
    var description = req.body.description
    // create a new object storing all the variables together
    var newBase = { name: name, type: type, points: points, continent: continent, image: image, description: description }
    // instantiate a new Base object
    Base.create(newBase, function(err, newlyCreated) {
        if (err) {
            console.log(err)
        } else {
            console.log(newlyCreated)
            res.redirect("/bases")
        }
    })
})

// /bases/new - show form to create a new base
router.get("/new", middleware.isLoggedIn, function(req, res) {
    console.log("GET /bases/new route hit")
    res.render("bases/new")
})


// /bases/:id - show a base based off id
router.get("/:id", function(req, res) {
    console.log("GET /bases/:id/ show route hit")
    Base.findById(req.params.id, function(err, foundBase) {
        if (err) {
            console.log(err)
        } else {
            res.render("bases/show", {base: foundBase} )
        }
    })
})


// /bases/:id/edit - show form to edit an existing base
router.get("/:id/edit", middleware.isLoggedIn, function(req, res) {
    console.log("GET /bases/:id/edit route hit")
    console.log(req.params.id)
    Base.findById(req.params.id, function(err, foundBase) {
        if (err) {
            console.log(err)
        } else {
            res.render("bases/edit", { base: foundBase })
        }
    })
})

// /bases/:id - accept updates to an individual base
router.put("/:id", middleware.isLoggedIn, function(req, res) {
     console.log("PUT /bases/:id route hit")
    // find and update the correct base
    Base.findByIdAndUpdate(req.params.id, req.body.base, function(err, updatedBase) {
        if (err) {
            console.log(err)
            res.redirect("/bases")
        } else {
            res.redirect("/bases/" + req.params.id)
        }
    })
})

// /bases/:id - delete an individual base
router.delete("/:id", middleware.isLoggedIn, function(req, res) {
    Base.findByIdAndRemove(req.params.id, function(err) {
        if (err) {
            console.log(err)
            res.redirect("/bases")
        } else {
            res.redirect("/bases")
        }
    })
})

module.exports = router