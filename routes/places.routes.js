const { getNearbyPlaces } = require('../controllers/googlePlaces.controlers')
const router = require('express').Router()

router.get('/', getNearbyPlaces)


module.exports = router