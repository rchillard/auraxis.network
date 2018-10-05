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
    res.render("bases/index")
})

// /bases/new - show form to create a new base
router.get("/new", function(req, res) {
    res.send("/bases/new route reached!")
})

module.exports = router