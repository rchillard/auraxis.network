var mongoose = require("mongoose");
var Base = require("./models/base");

var data = [
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

function seedDB(){
    // Remove all bases by dropping that collection
    Base.remove({}, function(err) {
        if(err) {
            console.log(err)
        } else {
            console.log("Removed bases!")
            data.forEach(function(seed){
                Base.create(seed, function(err, base) {
                    if(err) {
                        console.log(err)
                    } else {
                        console.log("Added a new base!")
                        base.save()
                    }
                })
            })
        }
    })
}
 
module.exports = seedDB;