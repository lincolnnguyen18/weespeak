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
		console.log(profile._json);
		console.log(profile._json.email_verified);
		verified = profile._json.email_verified;
		new User({
			username: profile._json.name,
			googleId: profile._json.sub,
			email: profile._json.email,
			emailVerified: profile._json.email_verified,
			picture: profile._json.picture,
			locale: profile._json.locale
		}).save().then((newUser) => {
			console.log('new user created: ' + newUser);
		});
	})
)
