const axios = require("axios")

class googlePlacesAPI {
    constructor() {
        this.api = axios.create({
            baseURL: `https://places.googleapis.com/v1/places:searchNearby`
        })

        this.api.interceptors.request.use((config) => {

            config.headers = {
                "X-Goog-Api-Key": process.env.GOOGLE_PLACES_API_KEY,
                "X-Goog-FieldMask": "*", //places.displayName
                "Content-Type": `application/json`
            }
            return config
        })


    }

    getPlaceBycoords(latitude, longitude, includedTypes = ["restaurant"]) {
        const body = {
            "includedTypes": includedTypes,
            "maxResultCount": 10,
            "locationRestriction": {
                "circle": {
                    "center": {
                        "latitude": latitude,
                        "longitude": longitude
                    },
                    "radius": 500.0
                }
            }
        }

        return this.api.post("/", body)
    }
}

const googlePlcesServices = new googlePlacesAPI()

module.exports = googlePlcesServices

