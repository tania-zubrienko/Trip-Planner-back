const { verifyToken } = require('../middlewares/verifyToken')
const router = require('express').Router()
const Trip = require('./../models/Trip.model')
const { getAll, createTrip, deleteTrip } = require('./../controllers/trip.controlers')

router.get('/', verifyToken, getAll)

router.post('/add', verifyToken, createTrip)

router.post('/:id/delete', verifyToken, deleteTrip)


module.exports = router