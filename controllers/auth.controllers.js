const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User.model')

function signup(req, res, next) {
    const { name, email, password, avatar } = req.body
    let newAvatar
    avatar === "" ? newAvatar = './../../Trip-planner-front/public/profileDefault.png' : newAvatar = avatar

    User
        .create({ name, email, password, avatar: newAvatar })
        .then(() => res.sendStatus(201))
        .catch(err => next(err))
}

function login(req, res, next) {
    const { email, password } = req.body

    if (email === '' || password === '') {
        res.sendStatus(400)
        return
    }

    User
        .findOne({ email })
        .then((foundUser) => {

            if (!foundUser) {
                res.sendStatus(401)
                return
            }

            if (foundUser.validatePassword(password)) {

                const { _id, email, avatar, name } = foundUser;
                const payload = { _id, email, avatar, name }

                const authToken = foundUser.signToken()

                res.status(200).json({ authToken })

            }
            else {
                res.sendStatus(401)
            }
        })
        .catch(err => next(err))
}

function verify(req, res, next) {
    const loggedUser = req.payload

    res.json({ loggedUser })
}

module.exports = {
    signup,
    login,
    verify
}