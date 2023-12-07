const router = require('express').Router()
const { verifyToken } = require('../middlewares/verifyToken')
const { getCountryInfo } = require('./../controllers/country.controllers')

router.get('/:country', getCountryInfo)

module.exports = router