module.exports = app => {

    const apiRoutes = require("./api.routes")
    app.use("/api", apiRoutes)

    const authRoutes = require("./auth.routes")
    app.use("/api/auth", authRoutes)

    const tripRoutes = require('./trip.routes')
    app.use('/api/trips', tripRoutes)

    const uploadRoutes = require('./upload.routes')
    app.use('/api/upload', uploadRoutes)
}