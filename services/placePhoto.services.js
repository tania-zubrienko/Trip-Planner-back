const axios = require('axios')

class PlacePhoto {

    constructor() {
        this.api = axios.create({
            baseURL: 'https://maps.googleapis.com/maps/api/place'
        })
    }

    getPhoto(photoRef) {
        return this.api.get(`/photo?maxwidth=2500&photo_reference=${photoRef}&key=${process.env.GOOGLE_PLACES_API_KEY}`)
    }
}

const placePhotoService = new PlacePhoto()

module.exports = placePhotoService
