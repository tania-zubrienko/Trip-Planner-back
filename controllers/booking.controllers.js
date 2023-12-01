const Booking = require('./../models/Booking.model')
const Trip = require('./../models/Trip.model')

function getBookings(req, res, next) {

    Booking
        .find()
        .then(bookings => res.status(200).json({ bookings }))
        .catch(err => next(err))
}

// TODO: ADECUAR ESTADOS HTTP
function saveBooking(req, res, next) {

    const { id, booking } = req.body
    const { type, name, startDate, endDate, documents } = booking

    Booking
        .create({ type, name, startDate, endDate, documents })
        .then(booking => {
            return Trip.findByIdAndUpdate(id, {
                $push: { bookings: booking._id }
            })
        })
        .then(() => res.status(201).json({ message }))
        .catch(err => next(err))
}

function editBooking(req, res, next) {

    const { id } = req.params
    const { type, startDate, endDate, documents } = req.body

    Booking
        .findByIdAndUpdate(id, { type, startDate, endDate, documents })
        .then(() => res.status(200).json({ message: 'booking edited succesfully' }))
        .catch(err => next(err))
}

function deleteBooking(req, res, next) {

    const { id } = req.params

    Booking
        .findByIdAndDelete(id)
        .then(() => res.status(200).json({ message: 'booking deleted succesfully' }))
        .catch(err => next(err))
}

module.exports = {
    getBookings,
    saveBooking,
    editBooking,
    deleteBooking
}