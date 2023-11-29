const User = require('../models/User.model')
const { verifyToken } = require('../middlewares/verifyToken')
const router = require('express').Router()

router.get('/find/:email', verifyToken, (req, res, next) => {
    const loggedUser = req.payload
    const { email } = req.params

    User
        .find({
            $and:
                [
                    { email: new RegExp(`^${email}`) },
                    { email: { $ne: loggedUser.email } }
                ]
        })
        .then(found => res.json(found))
        .catch(err => next(err))

})

router.get('/add/:fiendId', verifyToken, (req, res, next) => {
    const loggedUser = req.payload
    const { fiendId } = req.params

    const promises = [
        User.findByIdAndUpdate(loggedUser, { $push: { friends: fiendId } }),
        User.findByIdAndUpdate(fiendId, { $push: { friends: loggedUser } })
    ]

    Promise
        .all(promises)
        .then(() => res.status(200))
        .catch(err => next(err))

})

router.get('/friends', verifyToken, (req, res, next) => {

    const loggedUser = req.payload

    User
        .findById(loggedUser)
        .populate('friends')
        .then(result => res.json(result.friends))
        .catch(err => next(err))

})



module.exports = router