const router = require("express").Router()

router.use("/auth", require('./auth.routes'))
router.use("/profile", require("./profile.routes"))
router.use("/events", require("./events.routes"))
router.use("/troubles", require("./troubles.routes"))
router.use("/contacts", require("./contacts.routes"))
router.use("/mail",require('./mail.routes'))
router.use("/upload", require("./upload.routes"))

module.exports = router
