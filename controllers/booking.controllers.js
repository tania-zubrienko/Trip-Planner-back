const Booking = require('./../models/Booking.model')
const Trip = require('./../models/Trip.model')

function getBookings(req, res, next) {

    Booking
        .find()
        .then(() => res.sendStatus(200))
        .catch(err => next(err))
}

function saveBooking(req, res, next) {

    const { id } = req.params
    const { type, name, startDate, endDate, documents } = req.body

    Booking
        .create({ type, name, startDate, endDate, documents })
        .then(booking => {
            return Trip.findByIdAndUpdate(id, {
                $push: { bookings: booking._id }
            })
        })
        .then(() => res.sendStatus(201))
        .catch(err => next(err))
}

function editBooking(req, res, next) {

    const { id } = req.params
    const { type, startDate, endDate, documents } = req.body

    Booking
        .findByIdAndUpdate(id, { type, startDate, endDate, documents })
        .then(() => res.sendStatus(200))
        .catch(err => next(err))
}

function deleteBooking(req, res, next) {

    const { id } = req.params

    Booking
        .findByIdAndDelete(id)
        .then(() => res.sendStatus(202))
        .catch(err => next(err))
}

function filterBooking(req, res, next) {
    const { tripId } = req.params
    const { bookingDate, bookingType } = req.body

    if (!bookingDate && !bookingType) {

        Trip
            .findById({ _id: tripId }, { project: { bookings: 1 } })
            .populate('bookings')
            .then(response => res.json(response.bookings))
            .catch(err => next(err))
    }
    if (bookingDate && !bookingType) {
        Trip
            .findById({ _id: tripId }, { project: { bookings: 1 } })
            .populate('bookings')
            .then((data) => data.bookings.filter(booking => booking.startDate <= new Date(bookingDate) && booking.endDate >= new Date(bookingDate)))
            .then(filteredBookings => res.json(filteredBookings))
            .catch(err => next(err))
    }
    if (!bookingDate && bookingType) {
        Trip
            .findById({ _id: tripId }, { project: { bookings: 1 } })
            .populate('bookings')
            .then((data) => data.bookings.filter(booking => booking.type === bookingType))
            .then(filteredBookings => res.json(filteredBookings))
            .catch(err => next(err))
    }
    if (bookingDate && bookingType) {
        Trip
            .findById({ _id: tripId }, { project: { bookings: 1 } })
            .populate('bookings')
            .then((data) => data.bookings.filter(booking => booking.startDate <= new Date(bookingDate) && booking.endDate >= new Date(bookingDate) && booking.type === bookingType))
            .then(filteredBookings => res.json(filteredBookings))
            .catch(err => next(err))
    }
}

module.exports = {
    getBookings,
    saveBooking,
    editBooking,
    deleteBooking,
    filterBooking
}