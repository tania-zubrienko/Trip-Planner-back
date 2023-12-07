const countryServices = require("./../services/country.services")


function getCountryInfo(req, res, next) {
    const { country } = req.params

    countryServices
        .getInfo(country)
        .then(result => res.json(result.data))
        .catch(err => next(err))
}

module.exports = { getCountryInfo }