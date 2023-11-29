const { verifyToken } = require('../middlewares/verifyToken')
const router = require('express').Router()
const {
    getAll,
    getFutureTrips,
    getPastTrips,
    createTrip,
    deleteTrip,
    getTrip
} = require('./../controllers/trip.controlers')

router.get('/', verifyToken, getAll)

router.get('/future', verifyToken, getFutureTrips)

router.get('/past', verifyToken, getPastTrips)

router.post('/add', verifyToken, createTrip)

router.post('/:id/delete', verifyToken, deleteTrip)

router.get('/:id', verifyToken, getTrip)


module.exports = router