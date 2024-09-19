const passport = require('passport');
const googleStrategy = require('passport-google-oauth20');
const twitterStrategy = require('passport-twitter')

const db = require('../db');
const { Users } = db.models;
require('dotenv').config();

const googleStrategyOptions = {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:5000/User/Google/Callback"
}

passport.use(new googleStrategy(googleStrategyOptions, async(accessToken, refreshToken, profile, done) => {
    try {
        const userCheck = await Users.findOne({where: {Username: profile.displayName.replace(" ", "")}});
        if(!userCheck){
            const user = await Users.create({
                Username: profile.displayName.replace(" ", ""),
                Email: profile._json.email,
                Portrait: profile.photos[0].value,
                Password: process.env.GOOGLE_AUTH_PWD, // Passwords Pre-defined in environment variables
                confirmedPassword: process.env.GOOGLE_AUTH_PWD,
                isGoogleAuth: true
            })
            done(null, user);        
            return 
        }
        done(null, userCheck);        
    } catch (error) {
        done(null, error);
    }
}))

const twitterStrategyOptions = {
    consumerKey: process.env.TWITTER_CONSUMER_KEY,
    consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
    includeEmail: true,
    callbackURL: "http://localhost:5000/User/Twitter/Callback"
}

passport.use(new twitterStrategy(twitterStrategyOptions, async(token, tokenSecret, profile, done) => {
    try {
        const userCheck = await Users.findOne({where: {Username: profile.username}});
        if(!userCheck){
            const user = await Users.create({
                Username: profile.username,
                Email: profile.emails[0].value,
                Portrait: profile.photos[0].value,
                Password: process.env.TWITTER_AUTH_PWD, // Passwords Pre-defined in environment variables
                confirmedPassword: process.env.TWITTER_AUTH_PWD,
                isTwitterAuth: true
            })
            done(null, user);        
            return 
        }
        done(null, userCheck);        
    } catch (error) {
        done(null, error);
    }
}))
