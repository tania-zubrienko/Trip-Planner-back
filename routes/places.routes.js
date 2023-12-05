const placePhotoService = require('../services/placePhoto.services')
const searchDetailsService = require('../services/searchDetails.services')
const router = require('express').Router()

// router.get('/getPhoto/:photoRef', (req, res, next) => {
//     console.log("REEEEEEEEEEEEEEEEEEEEF")
//     const { photoRef } = req.params

//     placePhotoService
//         .getPhoto(photoRef)
//         .then(response => res.json(response.request.res.responseUrl))
//         .catch(err => next(err))
// })

router.get('/:planId', (req, res, next) => {

    const { planId } = req.params


    searchDetailsService
        .getDetailsPlace(planId)
        .then(({ data }) => {
            const { website, url, name, formatted_address, rating } = data.result

            const place = { website, url, formatted_address, name, rating }
            place.hours = data.result.opening_hours.weekday_text[0].split(' ').slice(1)
            place.photoRef = data.result.photos[0].photo_reference




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

})
module.exports = router