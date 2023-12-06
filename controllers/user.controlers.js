const User = require('../models/User.model')

function getByEmail(req, res, next) {

    const { payload: loggedUser } = req
    const { email } = req.params

    User
        .find({
            $and:
                [
                    { email: new RegExp(`^${email}`) },
                    { email: { $ne: loggedUser.email } }
                ]
        })
        .then(found => res.status(200).json(found))
        .catch(err => next(err))
}

function addFriend(req, res, next) {

    const { payload: loggedUser } = req
    const { fiendId } = req.params

    const promises = [
        User.findByIdAndUpdate(loggedUser, { $push: { friends: fiendId } }),
        User.findByIdAndUpdate(fiendId, { $push: { friends: loggedUser } })
    ]

    Promise
        .all(promises)
        .then(() => res.sendStatus(200))
        .catch(err => next(err))
}

function deleteFriend(req, res, next) {

    const { payload: loggedUser } = req
    const { fiendId } = req.params

    const promises = [
        User.findByIdAndUpdate(loggedUser._id, { $pull: { friends: fiendId } }),
        User.findByIdAndUpdate(fiendId, { $pull: { friends: loggedUser._id } })
    ]

    Promise
        .all(promises)
        .then(() => res.sendStatus(202))
        .catch(err => next(err))

}

function getFriendList(req, res, next) {

    const { payload: loggedUser } = req

    User
        .findById(loggedUser)
        .populate('friends')
        .then(result => res.json(result.friends))
        .catch(err => next(err))

}

function saveDocument(req, res, next) {

    const { payload: loggedUser } = req
    const { type, link } = req.body

    User
        .findByIdAndUpdate(loggedUser._id, { $push: { documents: { type, link } } })
        .then(() => res.sendStatus(200))
        .catch(err => next(err))
}

function getDocuments(req, res, next) {

    const { payload: loggedUser } = req

    User
        .findById(loggedUser._id)
        .select({ documents: 1 })
        .then((response) => res.json(response))
        .catch(err => next(err))
}

function deleteDocument(req, res, next) {
    const { payload: loggedUser } = req
    const { documentId } = req.params

    User
        .findByIdAndUpdate(loggedUser._id, { $pull: { documents: { _id: documentId } } })
        .then(() => res.sendStatus(202))
        .catch(err => next(err))
}

module.exports = {
    getByEmail,
    addFriend,
    deleteFriend,
    getFriendList,
    saveDocument,
    getDocuments,
    deleteDocument
}