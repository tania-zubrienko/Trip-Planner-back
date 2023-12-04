const { verifyToken } = require('../middlewares/verifyToken')
const router = require('express').Router()
const {
    getAll,
    getFutureTrips,
    getPastTrips,
    createTrip,
    getTripDates,
    deleteTrip,
    addExpensetoTrip,
    getTripById,
    editTrip,
    getListParticipants,
    deleteParticipants
} = require('./../controllers/trip.controlers')

router.get('/', verifyToken, getAll)

router.get('/future', verifyToken, getFutureTrips)

router.get('/past', verifyToken, getPastTrips)

router.post('/add', verifyToken, createTrip)

router.post('/:id/delete', verifyToken, deleteTrip)

router.post('/:id/edit', verifyToken, editTrip)

router.get('/:id/dates', verifyToken, getTripDates)

router.post('/:id/expenses', verifyToken, addExpensetoTrip)

router.get('/:id/participants', verifyToken, getListParticipants)

router.post('/:tripId/deleteMember', deleteParticipants)

router.get('/:id', verifyToken, getTripById)

module.exports = router