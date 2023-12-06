const axios = require('axios')

class SearchDetails {

    constructor() {
        this.api = axios.create({
            baseURL: 'https://maps.googleapis.com/maps/api/place/details'
        })
    }

    getDetailsPlace(placeId) {
        return this.api.get(`/json?place_id=${placeId}&key=${process.env.GOOGLE_PLACES_API_KEY}`)
    }

}

const searchDetailsService = new SearchDetails()

module.exports = searchDetailsService
