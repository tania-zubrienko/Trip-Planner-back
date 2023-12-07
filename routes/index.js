module.exports = app => {

    const authRoutes = require('./auth.routes')
    app.use('/api/auth', authRoutes)

    const bookingRoutes = require('./booking.routes')
    app.use('/api/bookings', bookingRoutes)

    const tripRoutes = require('./trip.routes')
    app.use('/api/trips', tripRoutes)

    const uploadRoutes = require('./upload.routes')
    app.use('/api/upload', uploadRoutes)

    const userRoutes = require('./user.routes')
    app.use('/api/user', userRoutes)

    const placesRoutes = require('./places.routes')
    app.use('/api/place', placesRoutes)

    const countryRoutes = require('./country.routes')
    app.use('/api/country', countryRoutes)
}