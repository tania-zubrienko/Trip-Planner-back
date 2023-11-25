const router = require("express").Router()

router.get("/", (req, res, next) => {
    res.json({ message: "todavia nada por aqui" })
})

module.exports = router