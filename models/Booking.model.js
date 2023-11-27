const { Schema, model } = require('mongoose')

const bookingSchema = new Schema({
    type: {
        type: String,
        enum: ["Hotel", "Avión", "Tren", "Bus", "Entradas"]
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