const express = require('express');
const app = express();
const keys = require('./config/keys');
const authRoutes = require("./routes/authRoutes");
const mongoose = require('mongoose');
require("./models/User");
require("./services/passport");

mongoose.connect(keys.mongoURI, { useNewUrlParser: true});

authRoutes(app);

//Use Heroku PORT in prod or 5000 in local environment
const PORT = process.env.PORT || 5000;
app.listen(PORT);