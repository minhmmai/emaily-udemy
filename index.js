const express = require('express');
const app = express();
const keys = require('./config/keys');
const authRoutes = require("./routes/authRoutes");
const mongoose = require('mongoose');
const cookieSession = require("cookie-session");
const passport = require("passport");
const bodyParser = require('body-parser');
require("./models/User");
require("./services/passport");


app.use(bodyParser.json()); // support json encoded bodies

app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.use(
    cookieSession({
        maxAge: 30*24*60*60*1000,
        keys: [keys.cookieKey]
    })
);

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(keys.mongoURI, { useNewUrlParser: true});

authRoutes(app);

//Use Heroku PORT in prod or 5000 in local environment
const PORT = process.env.PORT || 5000;
app.listen(PORT);