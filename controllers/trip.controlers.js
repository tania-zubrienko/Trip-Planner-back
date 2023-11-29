const Trip = require('./../models/Trip.model')

function getAll(req, res, next) {

    const { _id: userId } = req.payload

    Trip
        .find({ participants: { $in: userId } })
        .then(result => res.json(result))
        .catch(err => next(err))

}

function getFutureTrips(req, res, next) {
    const { _id: userId } = req.payload

    Trip
        .find({ participants: { $in: userId }, endDate: { $gt: new Date() } })
        .then(result => res.json(result))
        .catch(err => next(err))
}

function getPastTrips(req, res, next) {
    const { _id: userId } = req.payload

    Trip
        .find({ participants: { $in: userId }, endDate: { $lt: new Date() } })
        .then(result => res.json(result))
        .catch(err => next(err))
}

function createTrip(req, res, next) {

    const { _id: userId } = req.payload
    const { destination, startDate, endDate } = req.body

    Trip
        .create({ destination, startDate, endDate, participants: [userId] })
        .then(res => res.status(200).json({ message: 'New trip added' }))
        .catch(err => next(err))

}

function deleteTrip(req, res, next) {

    const { tripID } = req.params

    Trip
        .findByIdAndDelete({ tripID })
        .then(res => res.status(200).json({ message: 'Trip deleted' }))
        .catch(err => next(err))

}

function editTrip(req, res, next) {

    const { tripID } = req.params

}

function getTripDates(req, res, next) {
    const { id } = req.params
    Trip
        .findById(id)
        .select({ startDate: 1, endDate: 1 })
        .then(result => res.json(result))
        .catch(err => next(err))
}

module.exports = {
    getAll,
    getFutureTrips,
    getPastTrips,
    createTrip,
    deleteTrip,
    getTripDates
}