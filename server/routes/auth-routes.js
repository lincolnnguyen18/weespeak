const router = require('express').Router();
const User = require('../models/user-model')
const passport = require('passport');

// Auth logout
router.get('/logout', async (req, res) => {
	// Handle with passport
	await User.findByIdAndUpdate(req.user._id, { $set: { loggedIn: false } } )
	req.logout()
	res.redirect('/')
});

// Auth with google
router.get('/google', passport.authenticate('google', {
	scope: ['email', 'profile']
}));

// Callback route for google to redirect to
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
	res.redirect('/user/registrationStatus')
});

module.exports = router;
