const router = require("express").Router()

router.get('/', (req, res, next) => {
    res.json({ message: 'rutas de auth' })
})

module.exports = router