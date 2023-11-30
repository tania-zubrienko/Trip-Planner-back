const User = require('../models/User.model')


function getByEmail(req, res, next) {
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

}

function addFriend(req, res, next) {
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

}

function getFriendList(req, res, next) {

    const loggedUser = req.payload

    User
        .findById(loggedUser)
        .populate('friends')
        .then(result => res.json(result.friends))
        .catch(err => next(err))

}

function saveDocument(req, res, next) {
    const loggedUser = req.payload
    const { type, link } = req.body

    User
        .findByIdAndUpdate(loggedUser._id, { $push: { documents: { type, link } } })
        .then(() => res.status(200).json())
        .catch(err => console.log(err))
}

function getDocuments(req, res, next) {
    const loggedUser = req.payload
    
    User
        .findById(loggedUser._id, 'documents')
        .then((response) => res.json(response))
        .catch(err => console.log(err))
}

module.exports = {
    getByEmail,
    addFriend,
    getFriendList,
    saveDocument,
    getDocuments
}