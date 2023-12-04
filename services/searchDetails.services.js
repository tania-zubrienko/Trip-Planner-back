import axios from 'axios'

class SearchDetails {

    constructor() {
        this.api = axios.create({
            baseURL: 'https://maps.googleapis.com/maps/api/place/details/json?place_id=ChIJA5xPiqYsDogRBBCptdwsGEQ&key=AIzaSyBDuPHmeT2hJFxWwcM2p7abZU05Gau84Pw'
        })


    }

    getDetailsPlace() {
        return this.api.get(`/`)
    }

}

const searchDetailsService = new SearchDetails()

export default searchDetailsService
