const { unifyArray } = require('../utils/array-utils')
const User = require('./..//models/User.model')
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
    const { destination, startDate, endDate, tripImage, destinationCoords, country } = req.body

    Trip
        .create({ destination, startDate, endDate, participants: [userId], tripImage, destinationCoords, country })
        .then(() => res.sendStatus(201))
        .catch(err => next(err))

}

function deleteTrip(req, res, next) {

    const { id: tripID } = req.params

    Trip
        .findByIdAndDelete(tripID)
        .then(() => res.status(202))
        .catch(err => next(err))

}

function editTrip(req, res, next) {

    const { id: tripId } = req.params
    const participants = unifyArray(req.body)

    Trip
        .findByIdAndUpdate(tripId, { participants })
        .then(() => res.sendStatus(200))
        .catch(err => next(err))

}

function getTripDates(req, res, next) {

    const { id } = req.params

    Trip
        .findById(id)
        .select({ startDate: 1, endDate: 1 })
        .then(result => res.json(result))
        .catch(err => next(err))
}

function addExpensetoTrip(req, res, next) {

    const { concept, cost } = req.body
    const { id } = req.params

    if (!concept) {
        res.status(401).json({ errorMessage: ["Concepto es obligatorio"] })
        return
    }

    if (cost === 0) {
        res.status(401).json({ errorMessage: ["Cantidad es obligatoria"] })
        return
    }

    Trip
        .findByIdAndUpdate(id, { $push: { expenses: { concept, cost } } }, { new: true })
        .then(() => res.sendStatus(201))
        .catch(err => next(err))

}

function getTripById(req, res, next) {

    const { id } = req.params

    Trip
        .findById(id)
        .populate('participants')
        .then(result => res.json({ result }))
        .catch(err => next(err))
}


function addPlantoTrip(req, res, next) {

    const { placeId, name } = req.body
    const { id } = req.params

    Trip
        .findByIdAndUpdate(id, { $push: { placesOfInterest: { placeId, name, date } } }, { new: true })
        .then(() => res.sendStatus(201))
        .catch(err => next(err))
}


function getListParticipants(req, res, next) {

    const { id } = req.params

    Trip
        .findById(id)
        .select({ participants: 1 })
        .populate('participants')
        .then(result => res.json({ result }))
        .catch(err => next(err))
}

function deleteParticipants(req, res, next) {

    const { tripId } = req.params
    const { member } = req.body

    Trip
        .findByIdAndUpdate(tripId, { $pull: { participants: member } })
        .then(() => res.sendStatus(202))
        .catch(err => next(err))

}

function deletePlan(req, res, next) {

    const { tripId } = req.params
    const { planId } = req.body

    Trip
        .findByIdAndUpdate(tripId, { $pull: { placesOfInterest: { _id: planId } } })
        .then(() => res.sendStatus(202))
        .catch(err => next(err))
}

function deleteExpense(req, res, next) {
    const { tripId } = req.params
    const { expenseId } = req.body

    Trip
        .findByIdAndUpdate(tripId, { $pull: { expenses: { _id: expenseId } } })
        .then(() => res.sendStatus(202))
        .catch(err => next(err))
}


module.exports = {
    getAll,
    createTrip,
    deleteTrip,
    getTripDates,
    deleteTrip,
    addExpensetoTrip,
    getTripById,
    addPlantoTrip,
    editTrip,
    getListParticipants,
    deleteParticipants,
    deletePlan,
    deleteExpense
}