const axios = require('axios')

class PlacePhoto {

    constructor() {
        this.api = axios.create({
            baseURL: 'https://maps.googleapis.com/maps/api/place',
            params: {
                maxwidth: 2500,
                key: process.env.GOOGLE_PLACES_API_KEY
            }
        })
    }

    getPhoto(photoRef) {
        return this.api.get(`/photo`, {
            params: {
                photo_reference: photoRef
            }
        })
    }
}

const placePhotoService = new PlacePhoto()

module.exports = placePhotoService
