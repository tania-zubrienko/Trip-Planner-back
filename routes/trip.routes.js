const { verifyToken } = require('../middlewares/verifyToken')
const Trip = require('./../models/Trip.model')
const router = require('express').Router()

router.get('/', verifyToken, (req, res, next) => {
    console.log("Esoty en trips")
    console.log(req.payload._id)
})


router.post('/add', verifyToken, (req, res, next) => {
    const { _id: userId } = req.payload
    const { destination, startDate, endDate } = req.body


    Trip
        .create({ destination, startDate, endDate, participants: [userId] })
        .then(res => console.log(res))
        .catch(err => console.log(err))
})

module.exports = router