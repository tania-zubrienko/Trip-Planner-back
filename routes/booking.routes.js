const router = require('express').Router()
const { verifyToken } = require('../middlewares/verifyToken')
const {
    getBookings,
    saveBooking,
    editBooking,
    deleteBooking
} = require('./../controllers/booking.controllers')

router.get('/', verifyToken, getBookings)

router.post('/add', verifyToken, saveBooking)

router.post('/edit/:id', verifyToken, editBooking)

router.post('/delete/:id', verifyToken, deleteBooking)

module.exports = router