var mongoose = require("mongoose")
var Base = require("./models/base")
var Idea = require("./models/idea")
var User = require("./models/user")

var base_data = [
    {
        name: "Tawrich Tech Plant", 
        image: "https://vignette.wikia.nocookie.net/planetside2/images/8/81/Tawrich_Tech_Plant.png/revision/latest/scale-to-width-down/480?cb=20180308205755",
        type: "Tech Plant",
        continent: "Indar",
        description: "The Tawrich Tech Plant is a Tech Plant, located on the south of Indar",
        points: "3"
    },    
    {
        name: "Rashnu Bio Lab", 
        image: "https://vignette.wikia.nocookie.net/planetside2/images/7/79/Rashnu_Bio_Lab.png/revision/latest/scale-to-width-down/480?cb=20180307141619",
        type: "Bio-Lab",
        continent: "Indar",
        description: "The Rashnu Bio Lab is a Bio Lab, located on the southeast of Indar, close to Indar Eastern Warpgate",
        points: "3"
    },    
    {
        name: "Zurvan Amp Station", 
        image: "https://vignette.wikia.nocookie.net/planetside2/images/1/10/Zurvan_Amp_Station.png/revision/latest/scale-to-width-down/480?cb=20180310182232",
        type: "Amp Station",
        continent: "Indar",
        description: "The Zurvan Amp Station is an Amp Station, located on the southeast of Indar close to the centre",
        points: "3"
    },    
    {
        name: "Snake Ravine Lookout", 
        image: "https://vignette.wikia.nocookie.net/planetside2/images/b/b1/Snake_Ravine_Lookout.png/revision/latest/scale-to-width-down/480?cb=20180304233445",
        type: "Large Outpost",
        continent: "Indar",
        description: "The Snake Ravine Lookout is an Outpost located on Indar, between Vanu Archives and Crossroads Watchtower.",
        points: "3"
    },    
    {
        name: "Feldspar Canyon Base", 
        image: "https://vignette.wikia.nocookie.net/planetside2/images/e/e4/Feldspar_Canyon_Base.png/revision/latest/scale-to-width-down/480?cb=20180307132037",
        type: "Large Outpost",
        continent: "Indar",
        description: "The Feldspar Canyon Base is a Large Outpost on Indar, located to the northwest of the Indar Eastern Warpgate.",
        points: "3"
    }
]

var idea_data = [
    {
        name: "Implement better CSS",
        author: "Kesl",
        description: "You should implement better CSS for the site!",
        score: 5
    },
    {
        name: "Add a Chemical Actuator",
        author: "Gily",
        description: "Seriously, we need to continue our research into nanites and how they interact with various chemical processes.  This is not small work.  We will need advanced equipment to do this correct.",
        score: 2
    },
    {
        name: "Build a Flux Capacitor",
        author: "Solron",
        description: "We need propre time travel up in here!",
        score: 12
    }
]

var user_data = [
    {
        username: "testnc",
        password: "testtest",
        faction: "New Conglomerate",
        avatar: "https://www-cdn.planetside2.com/images/empires/nc/nc-soldier-right.png?v=3304520529"
    },
    {
        username: "testtr",
        password: "testtest",
        faction: "Terran Republic",
        avatar: "https://www-cdn.planetside2.com/images/empires/tr/tr-soldier-right.png?v=157706187"
    },
    {
        username: "testvs",
        password: "testtest",
        faction: "Vanu Sovereignty",
        avatar: "https://www-cdn.planetside2.com/images/empires/vs/vs-soldier-right.png?v=616336742"
    }
]

function seedDB(){
    // Remove all bases by dropping that collection
    Base.remove({}, function(err) {
        if(err) {
            console.log(err)
        } else {
            console.log("Removed bases!")
            base_data.forEach(function(seed){
                Base.create(seed, function(err, base) {
                    if(err) {
                        console.log(err)
                    } else {
                        console.log("BASE: added new : " + base.name)
                        base.save()
                    }
                })
            })
        }
    })    
    Idea.remove({}, function(err) {
        if(err) {
            console.log(err)
        } else {
            console.log("Removed ideas!")
            idea_data.forEach(function(seed){
                Idea.create(seed, function(err, idea) {
                    if(err) {
                        console.log(err)
                    } else {
                        console.log("IDEA: added new : " + idea.name)
                        idea.save()
                    }
                })
            })
        }
    })    
    User.remove({}, function(err) {
        if(err) {
            console.log(err)
        } else {
            console.log("Removed users!")
            user_data.forEach(function(seed){
                User.create(seed, function(err, user) {
                    if(err) {
                        console.log(err)
                    } else {
                        console.log("USER: added new : " + user.username)
                        user.save()
                    }
                })
            })
        }
    })
}
 
module.exports = seedDB;