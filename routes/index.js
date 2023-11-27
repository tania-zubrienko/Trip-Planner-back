module.exports = app => {

    const apiRoutes = require("./api.routes")
    app.use("/api", apiRoutes)

    const authRoutes = require("./auth.routes")
    app.use("/api/auth", authRoutes)

    const bookingRoutes = require("./booking.routes")
    app.use("/api/bookings", bookingRoutes)

    const tripRoutes = require('./trip.routes')
    app.use('/api/trips', tripRoutes)
}