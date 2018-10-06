// ROUTE with index as /bases

// require express and initialize router
var express = require("express")
var router = express.Router()

// import models
var Base = require("../models/base")

// routes
// /bases - show all bases
router.get("/", function(req, res) {
    // res.send("/bases route reached!")
    Base.find({}, function(err, allBases) {
        if (err) {
            console.log(err)
        } else {
            res.render("bases/index", {bases: allBases})
        }
    })
})

// /bases/:id - show a base based off id
router.get("/:id", function(req, res) {
    Base.findById(req.params.id, function(err, foundBase) {
        if (err) {
            console.log(err)
        } else {
            res.render("bases/show", {base: foundBase} )
        }
    })
})

// /bases/new - show form to create a new base
router.get("/new", function(req, res) {
    res.send("/bases/new route reached!")
})

module.exports = router