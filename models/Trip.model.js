const { Schema, model, SchemaType, SchemaTypes } = require('mongoose')
const User = require('./User.model')
const Booking = require('./Booking.model')

const tripSchema = new Schema(
    {
        destination: {
            type: String
        },
        destinationCoords: {
            lat: { type: Number },
            lng: { type: Number }
        },
        tripImage: {
            type: String
        },
        startDate: {
            type: Date
        },
        endDate: {
            type: Date
        },
        participants: [
            {
                type: Schema.Types.ObjectId,
                ref: User
            }
        ],
        bookings: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Booking'
            }
        ],
        placesOfInterest: [
            {
                location: {
                    type: {
                        type: String
                    },
                    coordinates: {
                        type: [Number]
                    }
                },
                name: String
            }
        ],
        expenses: [
            {
                concept: { type: String },
                cost: { type: Number }
            }
        ],
        information: { type: String },
        toDoList: [
            {
                task: {
                    type: String,
                    required: true
                },
                done: {
                    type: Boolean,
                    default: false
                }
            }
        ],
    },
    {
        timestamps: true
    }
)
tripSchema.index({ location: '2dsphere' })
const Trip = model('Trip', tripSchema)
module.exports = Trip