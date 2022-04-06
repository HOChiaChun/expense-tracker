const express = require("express")
const router = express.Router()
const home = require("../routes/modules/home")
const trackers = require("../routes/modules/trackers")
const users = require("../routes/modules/users")
const { authenticator } = require("../middleware/auth")




router.use("/trackers", authenticator, trackers)
router.use("/users", users)
router.use("/", authenticator, home)





module.exports = router
