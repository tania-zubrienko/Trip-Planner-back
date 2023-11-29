const { Schema, model, models } = require('mongoose')

const bookingSchema = new Schema({
    name: {
        type: String,
        required: true
    },
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