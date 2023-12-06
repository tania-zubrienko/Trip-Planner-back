const axios = require('axios')

class SearchDetails {

    constructor() {
        this.api = axios.create({
            baseURL: 'https://maps.googleapis.com/maps/api/place/details',
            params: {
                key: process.env.GOOGLE_PLACES_API_KEY
            }
        })
    }

    getDetailsPlace(placeId) {
        return this.api.get(`/json`, {
            params: {
                place_id: placeId
            }
        })
    }

}

const searchDetailsService = new SearchDetails()

module.exports = searchDetailsService
