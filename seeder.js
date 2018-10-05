var mongoose = require("mongoose");
var Base = require("./models/base");

var data = [
    {
        name: "Tawrich Tech Plant", 
        image: "https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg",
        type: "Tech Plant",
        continent: "Indar",
        description: "Weapons Manufacturing Plant West of the South-Eastern Warpgate",
        points: "3"
    },    
    {
        name: "Rashnu Bio Lab", 
        image: "https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg",
        type: "Bio-Lab",
        continent: "Indar",
        description: "Food Production Laboratory North of the South-Eastern Warpgate",
        points: "3"
    },    
    {
        name: "Zurvan Amp Station", 
        image: "https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg",
        type: "Amp Station",
        continent: "Indar",
        description: "Energy Creation Facility North-West of the South-Eastern Warpgate",
        points: "3"
    },    
    {
        name: "Crossroads Watchtower", 
        image: "https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg",
        type: "Large Outpost",
        continent: "Indar",
        description: "Outpost between South-Eastern and South-Western warpgates. The outpost is used by either faction controlling it as basement to attack The Crown with mechanized units",
        points: "3"
    },    
    {
        name: "Feldspar Canyon Base", 
        image: "https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg",
        type: "Large Outpost",
        continent: "Indar",
        description: "Outpost close to South-Eastern warpgate",
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