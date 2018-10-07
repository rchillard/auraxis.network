
// Import required packages for Express
var express         = require("express")
var bodyParser      = require("body-parser")
var methodOverride  = require("method-override")
var passport        = require("passport")
var localStrategy   = require("passport-local")

// Import Models
var Base = require("./models/base")
var Feed = require("./models/feed")
var Idea = require("./models/idea")
var User = require("./models/user")
var Post = require("./models/post")

// Import Routes
var baseRoutes = require("./routes/bases")
var feedRoutes = require("./routes/feeds")
var ideaRoutes = require("./routes/ideas")
var userRoutes = require("./routes/users")
var postRoutes = require("./routes/posts")

// Initialize Express
var app = express()

// Configure Express
app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}))
app.use(methodOverride("_method"))

// Setup Database, Dependencies, and Connection
var mongoose = require("mongoose")
mongoose.connect(process.env.DATABASEURL, { useNewUrlParser: true })

// Local development
// mongoose.connect('mongodb://localhost:27017/auraxis_network', { useNewUrlParser: true })

// Seed the database - comment this out when done testing
// WARNING - THIS WILL DESTROY ALL DATA
var SeedDB = require("./seeder")
SeedDB() //seed the database

// Express configuration for session support
app.use(require("express-session")({
    // secret: process.env.SESSIONSECRET
    // Local development
    secret: "This is a test secret only to be used in development",
    resave: false,
    saveUninitialized: false
}))

// Express configuration for passport support
app.use(passport.initialize())
app.use(passport.session())
passport.use(new localStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

// Middleware added to pass the currentUser on every route
app.use(function(req, res, next){
    res.locals.currentUser = req.user
    next()
})

// Basic index route
app.get("/", function(req, res){
    console.log("GET / root route")
    res.render("index")
})

// Use routes and pass that the index in <route>.js is now /bases /feeds /ideas /users etc.
app.use("/bases", baseRoutes)
app.use("/feeds", feedRoutes)
app.use("/ideas", ideaRoutes)
app.use("/users", userRoutes)
app.use("/posts", postRoutes)

// Start server
// app.listen(port, IP, function)
app.listen(process.env.PORT, process.env.IP, function () {
    console.log("Auraxis network online at " + process.env.IP + ":" + process.env.PORT)
})