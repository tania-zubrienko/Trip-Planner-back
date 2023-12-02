const Trip = require('./../models/Trip.model')

function getAll(req, res, next) {
    const { _id: userId } = req.payload

    Trip
        .find({ participants: { $in: userId } })
        .then(result => res.status(200).json(result))
        .catch(err => next(err))

}

function getFutureTrips(req, res, next) {
    const { _id: userId } = req.payload

    Trip
        .find({ participants: { $in: userId }, endDate: { $gt: new Date() } })
        .then(result => res.status(200).json(result))
        .catch(err => next(err))
}

function getPastTrips(req, res, next) {
    const { _id: userId } = req.payload

    Trip
        .find({ participants: { $in: userId }, endDate: { $lt: new Date() } })
        .then(result => res.status(200).json(result))
        .catch(err => next(err))
}

function createTrip(req, res, next) {

    const { _id: userId } = req.payload
    const { destination, startDate, endDate, tripImage, destinationCoords } = req.body

    Trip
        .create({ destination, startDate, endDate, participants: [userId], tripImage, destinationCoords })
        .then(response => res.status(201).json({ message: 'New trip added' }))
        .catch(err => next(err))

}

function deleteTrip(req, res, next) {

    const { tripID } = req.params

    Trip
        .findByIdAndDelete({ tripID })
        .then(res => res.status(204).json({ message: 'Trip deleted' }))
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
        .then(result => res.status(200).json(result))
        .catch(err => next(err))
}

function addExpensetoTrip(req, res, next) {

    const { concept, cost } = req.body
    const { id } = req.params

    Trip
        .findByIdAndUpdate(id, { $push: { expenses: { concept, cost } } }, { new: true })
        .then(result => {
            res.status(200).json({ message: 'Expense created successfully' })
        })
        .catch(err => next(err))

}

function getTripById(req, res, next) {

    const { id } = req.params

    Trip
        .findById(id)
        .then(result => res.status(200).json({ result }))
        .catch(err => next(err))
}


module.exports = {
    getAll,
    getFutureTrips,
    getPastTrips,
    createTrip,
    deleteTrip,
    getTripDates,
    deleteTrip,
    addExpensetoTrip,
    getTripById
}