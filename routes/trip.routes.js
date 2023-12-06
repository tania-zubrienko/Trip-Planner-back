const { verifyToken } = require('../middlewares/verifyToken')
const searchDetailsService = require('../services/searchDetails.services')
const router = require('express').Router()
const {
    getAll,
    createTrip,
    getTripDates,
    deleteTrip,
    addExpensetoTrip,
    getTripById,
    addPlantoTrip,
    editTrip,
    getListParticipants,
    deleteParticipants,
    deletePlan
} = require('./../controllers/trip.controlers')

router.get('/', verifyToken, getAll)

router.post('/add', verifyToken, createTrip)

router.post('/:id/delete', verifyToken, deleteTrip)

router.post('/:id/edit', verifyToken, editTrip)

router.get('/:id/dates', verifyToken, getTripDates)

router.post('/:id/expenses', verifyToken, addExpensetoTrip)

router.post('/:id/plan', verifyToken, addPlantoTrip)

router.get('/:id/participants', verifyToken, getListParticipants)

router.post('/:tripId/deleteMember', deleteParticipants)

router.post('/:tripId/deletePlan', verifyToken, deletePlan)

router.get('/:id', verifyToken, getTripById)


module.exports = router