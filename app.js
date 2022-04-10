const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
require("dotenv").config();
const bodyParser = require("body-parser");
const session = require("express-session");
const passport = require("passport");
const auth = require("./config/auth");

const app = express();

//view engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//public folder
app.use(express.static(path.join(__dirname, "public")));
console.log(path.join(__dirname, "public"));

//set global value
app.locals.categories = null;
//body parser middleware
//body parser middleware
//body parser middleware

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

//express session middleware
app.use(
  session({
    secret: "keyboard cat",
    resave: true,
    saveUninitialized: true,
    // cookie: { secure: true },
  })
);

//express message

app.use(require("connect-flash")());
app.use(function (req, res, next) {
  res.locals.messages = require("express-messages")(req, res);
  next();
});
//connect DB
mongoose.connect(
  process.env.MONGODB_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) throw err;
    console.log("connect to DB");
  }
);

//passport config
require("./config/passport")(passport);
//passport middleware

app.use(passport.initialize());
app.use(passport.session());

app.get("*", function (req, res, next) {
  res.locals.user = req.user || null;
  next();
});

// //Routes
app.use("/login", require("./routes/userRoute"));
app.use("/", auth.isUser, require("./routes/staffRoute"));
app.use("/admin", auth.isAdmin, require("./routes/adminRoute"));
app.use("/qam", auth.isQAM, require("./routes/qamRoute"));
app.use("/campaigns", auth.isUser, require("./routes/campaignRoute"));
app.use("/list_ideas", auth.isUser, require("./routes/idealRoute"));

//start server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening to port ${port}`));
