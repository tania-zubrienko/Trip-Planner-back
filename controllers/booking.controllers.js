const Booking = require('./../models/Booking.model')
const Trip = require('./../models/Trip.model')

function getBookings(req, res, next) {

    Booking
        .find()
        .then(bookings => res.status(200).json({ bookings }))
        .catch(err => next(err))
}

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
        .then(() => res.status(201).json({ message: 'Booking created successfully' }))
        .catch(err => next(err))
}

function editBooking(req, res, next) {

    const { id } = req.params
    const { type, startDate, endDate, documents } = req.body

    Booking
        .findByIdAndUpdate(id, { type, startDate, endDate, documents })
        .then(() => res.status(200).json({ message: 'Booking edited successfully' }))
        .catch(err => next(err))
}

function deleteBooking(req, res, next) {

    const { id } = req.params

    Booking
        .findByIdAndDelete(id)
        .then(() => res.status(204).json({ message: 'Booking deleted successfully' }))
        .catch(err => next(err))
}

function filterBookingByDay(req, res, next) {
    const { tripId, bookingDate } = req.body

    Trip
        .findById({ _id: tripId }, { project: { bookings: 1 } })
        .populate('bookings')
        .then((data) => data.bookings.filter(booking => booking.startDate <= new Date(bookingDate) && booking.endDate >= new Date(bookingDate)))
        .then(filteredBookings => res.json(filteredBookings))
        .catch(err => next(err))
}

module.exports = {
    getBookings,
    saveBooking,
    editBooking,
    deleteBooking,
    filterBookingByDay
}