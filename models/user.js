var mongoose = require("mongoose")
var passportLocalMongoose = require("passport-local-mongoose")

var UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    faction: String,
    avatar: String,
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post"
        }
    ]
})

// Future method to automatically assign avatar based off of the faction selected.  This is broken right now!

// var nc_avatar = "https://www-cdn.planetside2.com/images/empires/nc/nc-soldier-right.png?v=3304520529"
// var tr_avatar = "https://www-cdn.planetside2.com/images/empires/tr/tr-soldier-right.png?v=157706187"
// var vs_avatar = "https://www-cdn.planetside2.com/images/empires/vs/vs-soldier-right.png?v=616336742"

// UserSchema.methods.avatarAssign = function avatarAssign(fact) {
//     switch(fact) {
//         case "New Conglomerate":
//             this.avatar = nc_avatar
//             break
//         case "Terran Republic":
//             this.avatar = tr_avatar
//             break
//         case "Vanu Sovereignty":
//             this.avatar = vs_avatar
//             break
//         default: 
//             this.avatar = "https://vignette.wikia.nocookie.net/planetside2/images/9/93/Auraxis.jpg/revision/latest/scale-to-width-down/220?cb=20150129141914"
//     }
// }

UserSchema.plugin(passportLocalMongoose)

module.exports = mongoose.model("User", UserSchema)