const router = require('express').Router()
const { response } = require('express')
const User = require('../models/user-model')
const FriendRelationship = require('../models/friend-relationship-model')

// Utility functions

function checkSignedIn(req, res, next) {
    if (!req.user) res.redirect('/auth/google')
    else next()
}

// API endpoints for "user" resource

/**
 * GET whether or not a username is available
 * Example: http://localhost:5000/user/isUsernameAvailable?username=joe
 */
router.get('/isUsernameAvailable', async (req, res) => {
    const usernameExists = await User.exists({ username: '@' + unescape(req.query.username) });
    if (usernameExists) {
        res.json({available: "false"})
    } else {
        res.json({available: "true"})
    }
}) 

/**
 * GET info of user
 * Example: http://localhost:5000/user/info
 */
router.get('/info', checkSignedIn, (req, res) => {
    res.json({ name: req.user.name, email: req.user.email, username: req.user.username })
})

/**
 * POST new username for user
 * Example: http://localhost:5000/user/username
 */
router.post('/username', checkSignedIn, async (req, res) => {
    console.log(req.body.username)
    console.log(req.user)
    const usernameExists = await User.exists({ username: req.body.username });
    if (/^[a-zA-Z0-9_]{1,15}$/.test(req.body.username) && !usernameExists) {
        console.log(`Username is available so updating username of user with id: '${req.user._id}' with new username: '${req.body.username}'`)
        const filter = { _id: req.user._id }
        const update = { username: '@' + req.body.username }
        await User.findOneAndUpdate(filter, update)
        res.json({status: "success"})
    } else {
        console.log(`Username is not available. Please pick a different username.`)
        res.json({status: "failure"})
    }
})

/**
 * GET registration status of user and redirect them to appropriate route
 * Example: http://localhost:5000/user/registrationStatus
 */
router.get('/registrationStatus', (req, res) => {
    if (req.user === undefined) {
        res.redirect('/auth/google');
    } else if (req.user.username === "") {
        res.redirect('/register');
    } else {
        res.redirect('/');
    }
})

/**
 * GET whether or not user is signed in
 * Example: http://localhost:5000/user/isSignedIn
 */
router.get('/isSignedIn', (req, res) => {
    if (req.user === undefined || req.user.username === "") {
        res.json({signedIn: "false"})
    } else {
        res.json({signedIn: "true"})
    }
})

/**
 * POST request on friends endpoint
 * sends a friend request to another user
 * required: friend id (fid)
 */
router.post('/friends', checkSignedIn, (req, res, next) => {
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
            res.status(200).send('Friend Request Sent')
    })
    .catch((error) => {
        res.send(error)
    })
})

/**
 * GET the list of friends and friend requests
 */
router.get('/friends', checkSignedIn, async (req, res) => {
    const friends = await User.findById(req.user._id, 'friends').exec()
    const friendRequests = await FriendRelationship.find({recipient: req.user._id}).exec()

    res.status(200).send({friends: friends.friends, friendRequests})
})

/**
 * Respond to a friend request with either decline or accept
 * REQUIRES: fid, accept (does not do anything but just set to true)
 */
router.put('/friends', checkSignedIn, (req, res, next) => {
    if (!req.query.fid || !req.query.accept) res.status(400).send('Missing required parameters')
    else next()
},
(req, res, next) => {
    FriendRelationship.findOneAndDelete({requester: req.query.fid, recipient: req.user._id})
    .then(deletedDocument => {
        if (!deletedDocument) res.status(400).send('No friend request exists')
        else next() 
    })
},
(req, res) => {

    // Updates current user document
    User.findByIdAndUpdate(req.user._id, {$push: {friends: req.query.fid}})
    
    // Updates friend user document
    User.findByIdAndUpdate(req.query.fid, {$push: {friends: req.user._id}})
    .then(updatedDocument => {
        if (updatedDocument) res.send('Successfully added')
        else res.send('Failed added')
    })


})


module.exports = router