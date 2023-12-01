const { Schema, model } = require('mongoose')
const { BOOKING_TYPE } = require('../consts/bookings-consts')

const bookingSchema = new Schema({
    name: {
        type: String,
        required: [true, 'El nombre de reserva es necesario']
    },
    type: {
        type: String,
        enum: BOOKING_TYPE,
        required: [true, 'Es necesario que elijas un tipo']
    },
    startDate: {
        type: Date,
        required: [true, 'La fecha de inicio de la reserva es necesaria']
    },
    endDate: {
        type: Date,
        required: [true, 'La fecha de fin de la reserva es necesaria']
    },
    documents: {
        type: [String]
    }
})

const Booking = model('Booking', bookingSchema)

module.exports = Booking