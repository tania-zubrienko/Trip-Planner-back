const User = require('../models/User.model')
const { verifyToken } = require('../middlewares/verifyToken')
const { getByEmail, addFriend, deleteFriend, getFriendList, saveDocument, getDocuments } = require('../controllers/user.controlers')
const router = require('express').Router()

router.get('/find/:email', verifyToken, getByEmail)

router.get('/add/:fiendId', verifyToken, addFriend)

router.get('/delete/:fiendId', verifyToken, deleteFriend)

router.get('/friends', verifyToken, getFriendList)

router.post('/documents/new', verifyToken, saveDocument)

router.get('/documents', verifyToken, getDocuments)

module.exports = router