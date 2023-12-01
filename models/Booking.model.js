const { Schema, model } = require('mongoose')
const { BOOKING_TYPE } = require('../consts/bookings-consts')

const bookingSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: BOOKING_TYPE
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    documents: {
        type: [String]
    }
})

const Booking = model('Booking', bookingSchema)

module.exports = Booking