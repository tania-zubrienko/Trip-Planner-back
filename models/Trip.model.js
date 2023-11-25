const { Schema, model, SchemaType, SchemaTypes } = require('mongoose')
const User = require('./User.model')
const Booking = require('./Booking.model')


const tripSchema = new Schema(
    {
        destination: {
            type: String
        },
        startDate: {
            type: Date
        },
        endDate: {
            type: Date
        },
        participants: {
            type: [Schema.Types.ObjectId],
            ref: User
        },
        bookings: {
            type: [Schema.Types.ObjectId],
            ref: Booking
        },
        placesOfInterest: {
            coordinates: { type: [Number] },
            name: String
        },
        expenses: {
            concept: { type: String },
            cost: { type: Number }
        },
        information: { type: String },
        toDoList: {
            task: { type: String, required: true },
            done: { type: Boolean, default: false }
        },
    },
    {
        timestamps: true
    }
)

const Trip = model("Trip", tripSchema)

module.exports = Trip