
// Setup Express
var express = require("express")

// Initialize Express
var app = express()

// Configure Express
app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/public'));

// Basic index route
app.get("/", function(req, res){
    res.render("index")
})

// Start server
// app.listen(port, IP, function)
app.listen(process.env.PORT, process.env.IP, function () {
    console.log("Auraxis network online at " + process.env.IP + ":" + process.env.PORT)
})