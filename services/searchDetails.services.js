const axios = require('axios')
class SearchDetails {

    constructor() {
        this.api = axios.create({
            baseURL: 'https://maps.googleapis.com/maps/api/place/details'
        })


    }

    getDetailsPlace(placeId) {
        return this.api.get(`/json?place_id=${placeId}&key=AIzaSyBDuPHmeT2hJFxWwcM2p7abZU05Gau84Pw`)
    }

}

const searchDetailsService = new SearchDetails()

module.exports = searchDetailsService
