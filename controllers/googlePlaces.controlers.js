const googlePlcesServices = require('./../services/googlePlacesAPI')

function getNearbyPlaces(req, res, next) {
    googlePlcesServices
        .getPlaceBycoords(37.7937, -122.3965)
        .then(({ data }) => {
            console.log(data)
            res.status(200).json(data)

        })
        .catch(err => next(err))
}

module.exports = {
    getNearbyPlaces
}