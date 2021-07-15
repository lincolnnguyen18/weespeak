const router = require('express').Router()
const { response } = require('express')
const User = require('../models/user-model')
const FriendRelationship = require('../models/friend-relationship-model')

function checkSignedIn(req, res, next) {
    if (!req.user) res.redirect('/auth/google')
    else next()
} 

// Basic Profile display
router.get('/', checkSignedIn, (req, res) => {
    res.status(200).send(`This is your information: ${req.user}`)
})

// // Register user with username
// router.patch('/registerUsername', checkSignedIn, async (req, res) => {
//     // res.status(200).send(`This is your information: ${req.user}`)
//     console.log(req.body.username)
// })

// Register user with username; testing
router.patch('/registerUsername', async (req, res) => {
    // res.status(200).send(`This is your information: ${req.user}`)
    console.log(req.body.username)
})

// Use to check if user has registered
router.get('/getRegistrationStatus', (req, res) => {
    if (req.user === undefined) {
        // res.json({status: "unregistered"})
        res.redirect('/auth/google');
    } else if (req.user.username === "") {
        // res.json({status: "incomplete"})
        res.redirect('/register');
    } else {
        // res.json({status: "complete"})
        res.redirect('/');
    }
})

router.get('/friends', checkSignedIn, (req, res, next) => {
    if (!req.query.fid) res.status(400).send('Missing required parameters')
    else next()
},
(req, res) => {
    const fid = req.query.fid
    // Check if fid is valid
    User.findById(fid).then((user) => {
        new FriendRelationship({
            requester: req.user._id, 
            recipient: user._id,
            status: 1}).save()
            res.send('Friend Request Sent')
    })
    .catch((error) => {
        res.send(error)
    })
})



module.exports = router