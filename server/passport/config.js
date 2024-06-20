const passport = require('passport');
const googleStrategy = require('passport-google-oauth20');

const db = require('../db');
const User = require('../db/models/User');
const { where } = require('sequelize');
const { Google } = db.models;
require('dotenv').config();

const strategyOptions = {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/Google/Redirect"
}

passport.serializeUser((user, done)=>{
    done(null, user.Username)
})
passport.deserializeUser(async (username, done)=>{
    await Google.findOne({ where: { Username: username }})
    .then((user) => done(null, user))
})
passport.use(new googleStrategy(strategyOptions, async(accessToken, refreshToken, profile, done) => {
    try {
        const user = await Google.create({
            Username: profile.displayName.replace(" ", ''),
            Email: profile._json.email,
        })
        done(null, user);        
    } catch (error) {
        done(null, error);
    }
}))
