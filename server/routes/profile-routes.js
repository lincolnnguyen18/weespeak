const router = require('express').Router()

function checkSignedIn(req, res, next) {
    if (!req.user) res.redirect('/auth/google')
    else next()
} 

// Basic Profile display
router.get('/', checkSignedIn, (req, res) => {
    res.status(200).send(`This is your information: ${req.user}`)
}) 

router.put('/friends', checkSignedIn, (req, res, next) => {
    if (!req.query.fid) res.status(400).send('Missing required parameters')
    else next()
},
(req, res) => {
    if ()
})



module.exports = router