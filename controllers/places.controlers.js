const placePhotoService = require('../services/placePhoto.services')
const searchDetailsService = require('../services/searchDetails.services')

function getPlaceObject(req, res, next) {
    const { planId } = req.params

    searchDetailsService
        .getDetailsPlace(planId)
        .then(({ data }) => {

            const { url, name, formatted_address, rating } = data.result

            const website = data.result.website || "Este sitio no tiene página web"

            const place = { website, url, formatted_address, name, rating }

            place.hours = data.result.opening_hours?.weekday_text[0].split(' ').slice(1) || 'No hay información del horario'

            place.photoRef = data.result.photos[0]?.photo_reference //no tocar!!!

            return place
        })
        .then(placeInfo =>
            placePhotoService
                .getPhoto(placeInfo.photoRef)
                .then(result => {

                    const img = result.request.res.responseUrl
                    const place = placeInfo
                    place.img = img
                    return place

                })
                .catch(err => next(err))
        )
        .then(result => res.json(result))
        .catch(err => next(err))

}

module.exports = { getPlaceObject } 