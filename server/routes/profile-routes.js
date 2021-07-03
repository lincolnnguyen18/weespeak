const router = require('express').Router()


// Basic Profile display
router.get('/', (req, res, next) => {
    // TODO need to redirect to login page. Not google
    if (!req.user) res.redirect('/auth/google')
    else next()
}, 
(req, res) => {
    res.status(200).send(`This is your information: ${req.user}`)
}) 



module.exports = router