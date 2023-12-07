const axios = require('axios')

class CountryServices {

    constructor() {
        this.api = axios.create({
            baseURL: 'https://travel-info-api.p.rapidapi.com',
        })
        this.api.interceptors.request.use((config) => {

            config.headers = {

                'X-RapidAPI-Key': '8f74e3f97fmshf93686b78f75e8ep15ebf0jsn3dcf906e84b3',
                'X-RapidAPI-Host': 'travel-info-api.p.rapidapi.com'

            }
            return config
        })
    }

    getInfo(country) {
        return this.api.get(`/country-details?country=${country}`)
    }
}

const countryServices = new CountryServices()

module.exports = countryServices