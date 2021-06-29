const express = require('express');
const authRoutes = require('./routes/auth-routes');
const path = require('path');
const passportSetup = require('./config/passport-setup');
const mongoose = require('mongoose');
const keys = require('./config/keys');

const app = express();

// connect to mongodb
mongoose.connect(keys.mongodb.dbURI, () => {
	console.log('connected!');
});

// Serve the static files from the React app; use nginx for production
app.use(express.static(path.join(__dirname, '/../client/build')));

// set up routes
app.use('/auth', authRoutes);

// Handles any requests that don't match the ones above
app.get('*', (req,res) =>{
	res.sendFile(path.join(__dirname+'/../client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);
console.log('App is listening on port ' + port);

