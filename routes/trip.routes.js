const { verifyToken } = require('../middlewares/verifyToken')
const searchDetailsService = require('../services/searchDetails.services')
const router = require('express').Router()
const {
    getAll,
    // getFutureTrips,
    // getPastTrips,
    createTrip,
    getTripDates,
    deleteTrip,
    addExpensetoTrip,
    getTripById,
    addPlantoTrip,
    editTrip,
    getListParticipants,
    deleteParticipants,
    // getPlaceInfo
} = require('./../controllers/trip.controlers')

router.get('/', verifyToken, getAll)

// router.get('/future', verifyToken, getFutureTrips)

// router.get('/past', verifyToken, getPastTrips)

router.post('/add', verifyToken, createTrip)

// router.get('/place/:planId', (req, res, next) => {
//     console.log("ESTOY EN RUUUUUUUUUUUUUUUUUUUUUUUUUUTA")
//     const { planId } = req.params
//     searchDetailsService
//         .getDetailsPlace(planId)
//         .then(response => res.status(200).json(response.data.result))
//         .catch(err => next(err))
// })

router.post('/:id/delete', verifyToken, deleteTrip)

router.post('/:id/edit', verifyToken, editTrip)

router.get('/:id/dates', verifyToken, getTripDates)

router.post('/:id/expenses', verifyToken, addExpensetoTrip)

router.post('/:id/plan', verifyToken, addPlantoTrip)

router.get('/:id/participants', verifyToken, getListParticipants)

router.post('/:tripId/deleteMember', deleteParticipants)

router.get('/:id', verifyToken, getTripById)


module.exports = router