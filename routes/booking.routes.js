const router = require('express').Router()
const { verifyToken } = require('../middlewares/verifyToken')
const {
    getBookings,
    saveBooking,
    editBooking,
    deleteBooking,
    filterBooking
} = require('./../controllers/booking.controllers')

router.get('/', verifyToken, getBookings)

router.post('/add/:id', verifyToken, saveBooking)

router.post('/edit/:id', verifyToken, editBooking)

router.post('/delete/:id', verifyToken, deleteBooking)

router.post('/filter/:tripId', verifyToken, filterBooking)

module.exports = router