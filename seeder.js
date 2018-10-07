var mongoose = require("mongoose")
var Base = require("./models/base")
var Idea = require("./models/idea")
var User = require("./models/user")
var Post = require("./models/post")

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

var post_data = [
    {
        title: "An Explanation of Nanites",
        content: "But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?",
        date: Date.now(),
        author: "Gily Vrys"
    },
    {
        title: "How to Take Over Bases",
        content: "On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain. These cases are perfectly simple and easy to distinguish. In a free hour, when our power of choice is untrammelled and when nothing prevents our being able to do what we like best, every pleasure is to be welcomed and every pain avoided. But in certain circumstances and owing to the claims of duty or the obligations of business it will frequently occur that pleasures have to be repudiated and annoyances accepted. The wise man therefore always holds in these matters to this principle of selection: he rejects pleasures to secure other greater pleasures, or else he endures pains to avoid worse pains.",
        date: Date.now(),
        author: "Solron Vrys"
    },
    {
        title: "Why Papa Vanu Left Us",
        content: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc",
        date: Date.now(),
        author: "1st Disciple of Vanu"
    },    
    {
        title: "Why Papa Vanu Left Us, Part 2",
        content: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc",
        date: Date.now(),
        author: "1st Disciple of Vanu"
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
    Post.remove({}, function(err) {
        if(err) {
            console.log(err)
        } else {
            console.log("Removed posts!")
            post_data.forEach(function(seed){
                Post.create(seed, function(err, post) {
                    if(err) {
                        console.log(err)
                    } else {
                        console.log("POST: added new : " + post.title)
                        post.save()
                    }
                })
            })
        }
    })
}
 
module.exports = seedDB;