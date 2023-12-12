const router = require('express').Router()
const { verifyToken } = require('../middlewares/verifyToken')
const { getPlansByDate } = require('../controllers/plan.controllers')

router.post('/filter/:id', getPlansByDate)

module.exports = router