const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
	username: String,
	name: String,
	googleId: String,
	email: String,
	emailVerified: Boolean,
	loggedIn: Boolean,
	picture: String,
	locale: String,
	friends: [{type: Schema.ObjectId, ref: 'friendRelationship'}],
	// friendRequests: [{type: Schema.ObjectId, ref: 'user'}],
});

const User = mongoose.model('user', userSchema);

module.exports = User;