const Trip = require('./../models/Trip.model')

function getAll(req, res, next) {

    const { _id: userId } = req.payload

    Trip
        .find({ participants: { $in: userId } })
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

module.exports = {
    getAll,
    createTrip,
    deleteTrip,
    editTrip
}