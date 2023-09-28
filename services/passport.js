const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

passport.serializeUser( (user, done) => {
  done(null, user.id);
} );

passport.deserializeUser( (id, done) => {
  console.log('deserializing id:', id);
  User.findById(id)
    .then(
      (foundUser) => {
        done(null, foundUser);
      }
    )
} );

// Setup passport to use a particualr strategy.
passport.use(
  new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback'
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ googleId: profile.id })
        .then( (existingUser) => {
          if(existingUser) {
            // we already have a record with the given google id
            console.log('user already exists');
            done(
              null, // everything went ok
              existingUser
            );
          } else {
            // we dont have a user record with this ID.
            new User( { googleId: profile.id }) // create a new model intance
              .save()                           // save the model to the DB and get back another model instance
              .then(
                (newUser) => {                  // use the 2nd model instance of the user that was returned from the save
                  done(null, newUser);
                }
              );

          }
        });
    })
);