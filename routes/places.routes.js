const { getPlaceObject } = require('../controllers/places.controlers')

const router = require('express').Router()

router.get('/:planId', getPlaceObject)

module.exports = router