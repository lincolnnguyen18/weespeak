const router = require('express').Router();
const passport = require('passport');

// Auth logout
router.get('/logout', (req, res) => {
	// Handle with passport
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
