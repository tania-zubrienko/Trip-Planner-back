const { Schema, model, SchemaType, SchemaTypes } = require('mongoose')

const tripSchema = new Schema(
    {
        destination: {
            type: String,
            required: [true, 'Destination is required']
        },
        destinationCoords: {
            lat: { type: Number },
            lng: { type: Number }
        },
        tripImage: {
            type: String
        },
        startDate: {
            type: Date,
            required: [true, 'Start date is required']
        },
        endDate: {
            type: Date,
            required: [true, 'End date is required']
        },
        participants: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
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
                placeId: String,
                name: String,
                location: {
                    type: {
                        type: String
                    },
                    coordinates: {
                        type: [Number]
                    }
                }
            }
        ],
        expenses: [
            {
                concept: {
                    type: String,
                    required: [true, 'Indica el concepto']
                },
                cost: {
                    type: Number,
                    required: [true, 'Indica la cantidad']
                }
            }
        ],
        information: { type: String },
        toDoList: [
            {
                task: {
                    type: String,
                    required: [true, 'Task definition is required']
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