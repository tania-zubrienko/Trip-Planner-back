const User = require('../models/User.model')

const router = require('express').Router()

router.get('/:email', (req, res, next) => {
    console.log("params", req.params)
    const { email } = req.params
    User
        .find({
            email: new RegExp(`^${email}`)
        })
        .then(found => res.json(found))
        .catch(err => next(err))
})

module.exports = router