const User = require('./..//models/User.model')
const Trip = require('./../models/Trip.model')

function getAll(req, res, next) {

    const { _id: userId } = req.payload

    Trip
        .find({ participants: { $in: userId } })
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

    const { id: tripID } = req.params

    Trip
        .findByIdAndDelete(tripID)
        .then(() => res.status(202))
        .catch(err => next(err))

}

function editTrip(req, res, next) {

    const { id: tripId } = req.params
    const members = Array.from(new Set(req.body))

    Trip
        .findByIdAndUpdate(tripId, { participants: members })
        .then(() => res.status(200))
        .catch(err => next(err))

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
        .populate('participants')
        .then(result => res.status(200).json({ result }))
        .catch(err => next(err))
}


function addPlantoTrip(req, res, next) {

    const { placeId } = req.body
    const { name } = req.body
    const { id } = req.params

    Trip
        .findByIdAndUpdate(id, { $push: { placesOfInterest: { placeId, name } } }, { new: true })
        .then(result => {
            res.status(200).json({ message: 'Plan created succesfully' })
        })
        .catch(err => next(err))
}

function getListParticipants(req, res, next) {

    const { id } = req.params

    Trip
        .findById(id)
        .select({ participants: 1 })
        .populate('participants')
        .then(result => res.status(200).json({ result }))
        .catch(err => next(err))
}

function deleteParticipants(req, res, next) {

    const { tripId } = req.params
    const { member } = req.body

    Trip
        .findByIdAndUpdate(tripId, { $pull: { participants: member } })
        .then(() => res.status(202).json({ message: 'Participante eliminado correctamente' }))
        .catch(err => next(err))

}

function deletePlan(req, res, next) {
    const { tripId } = req.params
    const { planId } = req.body

    console.log("entra aquí")

    Trip
        .findByIdAndUpdate(tripId, { $pull: { placesOfInterest: { _id: planId } } })
        .then(() => res.status(202).json({ message: 'Plan eliminado correctamente' }))
        .catch(err => next(err))
}

// function getPlaceInfo(req, res, next) {
//     console.log(req.params.planId)
// }


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
    deletePlan
    // getPlaceInfo
}