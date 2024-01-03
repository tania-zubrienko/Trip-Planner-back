const { Schema, model, SchemaType, SchemaTypes } = require('mongoose')

const tripSchema = new Schema(
    {
        destination: {
            type: String,
            required: [true, 'Destination is required']
        },
        country: {
            type: String
        },
        destinationCoords: {
            lat: { type: Number },
            lng: { type: Number }
        },
        tripImage: [{
            type: String
        }],
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
                    lat: {
                        type: Number
                    },
                    lng: {
                        type: Number
                    }
                },
                date: Date
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
                },
                paidBy: {
                    type: Schema.Types.ObjectId,
                    ref: 'User'
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