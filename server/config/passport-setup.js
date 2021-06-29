const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('./keys');
const User = require('../models/user-model');

passport.use(
	new GoogleStrategy({
		// options for google strategy
		callbackURL: '/auth/google/redirect',
		clientID: keys.google.clientID,
		clientSecret: keys.google.clientSecret
	}, (accessToken, refreshToken, profile, done) => {
		// passport callback function
		console.log(profile);
		new User({
			username: profile.displayName,
			googleId: profile.id
		}).save().then((newUser) => {
			console.log('new user created: ' + newUser);
		});
	})
)
