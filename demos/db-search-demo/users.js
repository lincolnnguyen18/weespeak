const mongoose = require('mongoose')

// const userSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true
//   }
// })

const userSchema = new mongoose.Schema({
	username: String,
	name: String,
	googleId: String,
	email: String,
	emailVerified: Boolean,
	picture: String,
	locale: String,
	friends: [{type: mongoose.Schema.Types.ObjectId, ref: 'friend'}],
});

module.exports = mongoose.model('User', userSchema)