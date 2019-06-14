const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const keys = require("../config/keys");
const mongoose = require('mongoose');
const User = mongoose.model('users');

//turn user into indetifying info and put in cookie
passport.serializeUser((user, done) => {
    done(null, user.id);
})

//get id from cookie and turn into user
passport.deserializeUser((id, done) => {
    User.findById(id)
    .then(user => {
        done(null, user);
    })
})

passport.use(new GoogleStrategy(
    {
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: "/auth/google/callback"
    },
    (accessToken, refreshToken, profile, done )=> {
        User.findOne({googleId: profile.id})
        //asychronous findOne() function response is passed to then(), that response is called existingUser
        .then((existingUser) => {
            if (existingUser) {
                done(null, existingUser);
            }else {
                new User ({ googleId: profile.id}).save()
                //same thing happens again for asynchronous function save(), response is called user.
                .then(user => done(null, user));
            }
        })

    }));