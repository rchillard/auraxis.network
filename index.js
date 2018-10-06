
// Setup Express
var express         = require("express")
var bodyParser      = require("body-parser")
var methodOverride  = require("method-override")

// Import Models
var Base = require("./models/base")

// Import Routes
var baseRoutes = require("./routes/bases")

// Initialize Express
var app = express()

// Configure Express
app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}))
app.use(methodOverride("_method"))

// Setup Database, Dependencies, and Connection
var mongoose = require("mongoose")
mongoose.connect('mongodb://localhost:27017/auraxis_network', { useNewUrlParser: true })

// Seed the database - comment this out when done testing
var SeedDB = require("./seeder")
SeedDB() //seed the database

// Basic index route
app.get("/", function(req, res){
    res.render("index")
})

// Use routes and pass that the index in bases.js is now /bases
app.use("/bases", baseRoutes)

// Start server
// app.listen(port, IP, function)
app.listen(process.env.PORT, process.env.IP, function () {
    console.log("Auraxis network online at " + process.env.IP + ":" + process.env.PORT)
})