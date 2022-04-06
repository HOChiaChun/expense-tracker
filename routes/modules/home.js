const express = require("express")
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

router.post("/search", (req, res, next) => {
  const userId = req.user._id
  const sort = req.body.sort
  let mode ={}

  switch(sort) {
    case "居家物業":
      mode = { userId, category: { $regex: "居家物業", $options: "$i" } }
      break;
    case "交通出行":
      mode = { userId, category: { $regex: "交通出行", $options: "$i" } }
      break;
    case "休閒娛樂":
      mode = { userId, category: { $regex: "休閒娛樂", $options: "$i" } }
      break;
    case "餐飲食品":
      mode = { userId, category: { $regex: "餐飲食品", $options: "$i" } }
      break;
    case "其他":
      mode = { userId, category: { $regex: "其他", $options: "$i" } }
      break;
    case "全部":
      mode = { userId }
      break;
  }


  Tracker.find( mode )
    .lean()
    .then(trackers => {
      let totalAmount = 0
      trackers.forEach(tracker => {
        totalAmount += tracker.amount
      })
        return res.render("index", { trackers, totalAmount, sort })
    })
    .catch(error => next(new Error(`some error ${error}`)))
})




module.exports = router