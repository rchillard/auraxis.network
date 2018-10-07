
// models
var Base = require("../models/base")
var User = require("../models/user")

// all the middleware goes here
var middlewareObj = {}

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next()
    }
    // req.flash("error", "You need to be logged in to do that")
    res.redirect("/users/login")
}

// middlewareObj.checkCampgroundOwnership = function(req, res, next) {
//     if(req.isAuthenticated()) {
//         Campground.findById(req.params.id, function(err, foundCampground) {
//             if (err) {
//                 req.flash("error", "We could not find the campground requested")
//                 res.redirect("/campgrounds")
//             } else {
//                 // does user own the campground?
//                 if(foundCampground.author.id.equals(req.user._id)) {
//                     next()
//                 } else {
//                     req.flash("error", "You need to own the campground to do that")
//                     res.redirect("back")
//                 }
//             }
//         })
//     } else {
//         req.flash("error", "You need to be logged in to do that")
//         res.redirect("back")
//     }
// }

// middlewareObj.checkCommentOwnership = function(req, res, next) {
//     if(req.isAuthenticated()) {
//         Comment.findById(req.params.comment_id, function(err, foundComment) {
//             if (err) {
//                 console.log(err)
//                 req.flash("error", "We could not find the comment requested")
//                 res.redirect("/campgrounds/" + req.params.id)
//             } else {
//                 // does user own the campground?
//                 if(foundComment.author.id.equals(req.user._id)) {
//                     next()
//                 } else {
//                     req.flash("error", "You can only edit your own comments")
//                     res.redirect("back")
//                 }
//             }
//         })
//     } else {
//         req.flash("error", "You need to be logged in to do that")
//         res.redirect("back")
//     }    
// }

module.exports = middlewareObj