const Trip = require('../models/Trip.model')

function getPlansByDate(req, res, next) {
    const { id: tripId } = req.params
    if (req.body.planDate) {
        const planDate = new Date(req.body.planDate)
        Trip
            .findById(tripId)
            .select({ placesOfInterest: 1 })
            .then(({ placesOfInterest }) => placesOfInterest.filter(e => new Date(e.date) <= planDate && new Date(e.date) >= planDate))
            .then(result => res.json(result))
            .catch(err => next(err))
    } else {
        Trip
            .findById(tripId)
            .select({ placesOfInterest: 1 })
            .then(result => res.json(result.placesOfInterest))
            .catch(err => next(err))
    }
}

function getPlanDate(req, res, next) {
    const placeId = Object.keys(req.query)[0]
    const { tripId } = req.params

    Trip
        .findById(tripId)
        .select({ placesOfInterest: 1 })
        .then(({ placesOfInterest }) => placesOfInterest.filter(e => e._id == placeId))
        .then(result => res.json(result))
        .catch(err => next(err))

}

module.exports = { getPlansByDate, getPlanDate }