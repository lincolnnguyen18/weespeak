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
		// check if user already exists in db
		User.findOne({googleId: profile._json.sub}).then((currentUser) => {
			if (currentUser) {
				// already have user
				console.log('user is: ', currentUser);
			} else {
				// if not, create user in db
				console.log(profile);
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
			}
		})
	})
)
