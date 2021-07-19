const express = require('express');
const userRoutes = require('./routes/user-routes');
const authRoutes = require('./routes/auth-routes');
const path = require('path');
const passportSetup = require('./config/passport-setup');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const cookieSession = require('cookie-session');
const passport = require('passport');
const cors = require('cors')
const bodyParser = require('body-parser');
const ws = require('ws');
require('dotenv').config()

// Instantiate express
const app = express();

// For development only; remove for production!!!
app.use(cors())
app.options('*', cors())

// Request body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Once user logs in, cookie is sent with id stored
app.use(cookieSession({
	maxAge: 24 * 60 * 60 * 1000, // 1 day
	keys: [keys.session.cookieKey] // use key to encrypt the cookie
}));

// Initialize passport
app.use(passport.initialize());
app.use(passport.session());

// Connect to mongodb
mongoose.connect(keys.mongodb.dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
	.catch( error => console.log(error));
console.log('MongoDB connected!');

// Set up routes
app.use('/auth', authRoutes);
app.use('/user', userRoutes);

// Serve the static files from the React app; use nginx for production, maybe
app.use(express.static(path.join(__dirname, '/../client/build'), { index : false }));
app.use('/favicon.ico', express.static('/../client/build/favicon.ico'));

// ------------------------ Websocket server --------------------------------

const socketServer = new ws.Server({ port: 5001 });
let clients = [];

console.log('Websocket server is listening on port ' + 5001);

socketServer.on('connection', client => {
  client.on('message', data => {
		data = JSON.parse(data)
		switch (data.req) {
			case 'message':
				console.log(`Received message: ${data.body}`)
				client.send(JSON.stringify({
					req: "message",
					body: "Message received"
				}))
				break;
			case 'identification':
				clients.push({
					id: data.body,
					client: client,
				})
				client.send(JSON.stringify({
					req: "message",
					body: "Client connection received"
				}))
				break;
			default:
				client.send("Invalid request")
		}
		// console.log(`Received ${data}`)
		// socketServer.clients.forEach(client => {
    //   if (client.readyState === ws.OPEN) {
    //     client.send(data);
    //   }
    // });
  });
});

// ------------------------ App Routing --------------------------------

// Dashboard
app.get('/', (req, res) => {
	if (req.user === undefined || req.user.username === "") {
		res.redirect("/login")
	} else {
		res.sendFile(path.join(__dirname+'/../client/build/index.html'));
	}
})

// Login/future landing page
app.get('/login', (req, res) => {
	if (req.user !== undefined && req.user.username !== "") {
		res.redirect("/")
	} else {
		res.sendFile(path.join(__dirname+'/../client/build/index.html'));
	}
	res.sendFile(path.join(__dirname+'/../client/build/index.html'));
})

// Registration page; only username for now, maybe more things like profile picture, profile description in the future
app.get('/register', (req, res) => {
	if (req.user !== undefined && req.user.username === "") {
		res.sendFile(path.join(__dirname+'/../client/build/index.html'));
	} else {
		res.redirect("/")
	}
})

// Handles any requests that don't match the ones above; 404 page
app.get('*', (req,res) =>{
	res.sendFile(path.join(__dirname+'/../client/build/index.html'));
});

// Start server
const port = process.env.PORT || 5000;
app.listen(port);
console.log('App is listening on port ' + port);