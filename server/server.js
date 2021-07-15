const express = require('express');
const profileRoutes = require('./routes/profile-routes');
const authRoutes = require('./routes/auth-routes');
const path = require('path');
const passportSetup = require('./config/passport-setup');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const cookieSession = require('cookie-session');
const passport = require('passport');
const cors = require('cors')
const bodyParser = require('body-parser');

const app = express();

// For development; access api from react dev server
app.use(cors())
app.options('*', cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Once user logs in, cookie is sent with id stored
app.use(cookieSession({
	maxAge: 24 * 60 * 60 * 1000, // 1 day
	keys: [keys.session.cookieKey] // use key to encrypt the cookie
}));

// initialize passport
app.use(passport.initialize());
app.use(passport.session());

// connect to mongodb
mongoose.connect(keys.mongodb.dbURI, (err) => {
	if (err) {
		console.log(err);
	} else {
		console.log('connected!');
	}
});

// set up routes
app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);

// Serve the static files from the React app; use nginx for production
app.use(express.static(path.join(__dirname, '/../client/build'), { index : false }));
app.use('/favicon.ico', express.static('/../client/build/favicon.ico'));


app.get('/', (req, res) => {
	if (req.user === undefined || req.user.username === "") {
		res.redirect("/login")
	} else {
		res.sendFile(path.join(__dirname+'/../client/build/index.html'));
	}
})

app.get('/login', (req, res) => {
	if (req.user !== undefined && req.user.username !== "") {
		res.redirect("/")
	} else {
		res.sendFile(path.join(__dirname+'/../client/build/index.html'));
	}
	res.sendFile(path.join(__dirname+'/../client/build/index.html'));
})

app.get('/register', (req, res) => {
	if (req.user !== undefined && req.user.username === "") {
		res.sendFile(path.join(__dirname+'/../client/build/index.html'));
	} else {
		res.redirect("/")
	}
})

// Handles any requests that don't match the ones above
app.get('*', (req,res) =>{
	res.sendFile(path.join(__dirname+'/../client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);
console.log('App is listening on port ' + port);

