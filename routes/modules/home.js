const express = require("express")
const tracker = require("../../models/tracker")
const Tracker = require("../../models/tracker")
const router = express.Router()



router.get("/", (req, res, next) => {
  const userId = req.user._id
  Tracker.find({ userId })
    .lean()
    .sort({ _id: 'asc' })
    .then(trackers => {
      let totalAmount = 0
      trackers.forEach(tracker => {
        totalAmount += tracker.amount
      })
        return res.render("index", { trackers, totalAmount })
    })
    .catch(error => next(new Error(`some error ${error}`)))
})




module.exports = router