const express = require('express');
const profileRoutes = require('./routes/profile-routes');
const authRoutes = require('./routes/auth-routes');
const path = require('path');
const passportSetup = require('./config/passport-setup');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const cookieSession = require('cookie-session');
const passport = require('passport');

const app = express();


// Once user logs in, cookie is sent with id stored
app.use(cookieSession({
	maxAge: 24 * 60 * 60 * 1000, // 1 day
	keys: [keys.session.cookieKey] // use key to encrypt the cookie
}));

// initialize passport
app.use(passport.initialize());
app.use(passport.session());

// connect to mongodb
mongoose.connect(keys.mongodb.dbURI, () => {
	console.log('connected!');
});

// Serve the static files from the React app; use nginx for production
app.use(express.static(path.join(__dirname, '/../client/build')));
// app.use('/favicon.ico', express.static('/../client/build/favicon.ico'));

// set up routes
app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);

// Handles any requests that don't match the ones above
// app.get('*', (req,res) =>{
// 	res.sendFile(path.join(__dirname+'/../client/build/index.html'));
// });

const port = process.env.PORT || 5000;
app.listen(port);
console.log('App is listening on port ' + port);

