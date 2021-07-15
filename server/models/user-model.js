const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
	username: String,
	name: String,
	googleId: String,
	email: String,
	emailVerified: Boolean,
	picture: String,
	locale: String,
	friends: [{type: mongoose.Schema.Types.ObjectId, ref: 'friend'}],
});

const User = mongoose.model('user', userSchema);

module.exports = User;