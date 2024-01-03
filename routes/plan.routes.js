const router = require('express').Router()
const { verifyToken } = require('../middlewares/verifyToken')
const { getPlansByDate, getPlanDate } = require('../controllers/plan.controllers')

router.post('/filter/:id', getPlansByDate)

router.get('/planDate/:tripId', getPlanDate)

module.exports = router