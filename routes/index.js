module.exports = app => {

    const apiRoutes = require("./api.routes")
    app.use("/api", apiRoutes)

    const authRoutes = require("./auth.routes")
    app.use("/api/auth", authRoutes)

}