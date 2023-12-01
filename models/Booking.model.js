const { Schema, model } = require('mongoose')
const { BOOKING_TYPE } = require('../consts/bookings-consts')

const bookingSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Booking name is required']
    },
    type: {
        type: String,
        enum: BOOKING_TYPE
    },
    startDate: {
        type: Date,
        required: [true, 'Start date is required']
    },
    endDate: {
        type: Date,
        required: [true, 'End date is required']
    },
    documents: {
        type: [String]
    }
})

const Booking = model('Booking', bookingSchema)

module.exports = Booking