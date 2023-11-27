const router = require('express').Router()
const {
    getBookings,
    saveBooking,
    editBooking,
    deleteBooking
} = require('./../controllers/booking.controllers')

router.get('/', getBookings)

router.post('/add', saveBooking)

router.post('/edit/:id', editBooking)

router.post('/delete/:id', deleteBooking)