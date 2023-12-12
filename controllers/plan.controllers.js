const Trip = require('../models/Trip.model')

function getPlansByDate(req, res, next) {
    const { id: tripId } = req.params
    const date = req.body
}

module.exports = { getPlansByDate }