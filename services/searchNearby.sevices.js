import axios from "axios"


class SearchNearby {
    constructor() {
        this.api = axios.create({
            baseURL: 'https://places.googleapis.com/v1/places:searchNearby'
        })
        this.api.interceptors.request.use((config) => {
            //TODO key comentado

            config.headers = {

                "X-Goog-Api-Key": '',


                "X-Goog-FieldMask":
                    `places.id,places.formattedAddress,places.displayName.text,places.currentOpeningHours.weekdayDescriptions,places.googleMapsUri,places.websiteUri,places.rating,places.types`,

                "Content-Type": 'application/json'
            }
            return config
        })


    }

    getPlaceBycoords(latitude, longitude) {
        const body = {
            "includedTypes": ["tourist_attraction", "art_gallery", "museum", "performing_arts_theater"],
            "maxResultCount": 14,
            "locationRestriction": {
                "circle": {
                    "center": {
                        "latitude": latitude,
                        "longitude": longitude
                    },
                    "radius": 5000.0
                }
            }
        }

        return this.api.post("/", body)
    }


}



const searchNearbyService = new SearchNearby()

export default searchNearbyService
