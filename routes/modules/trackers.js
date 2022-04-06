const express = require("express")
const router = express.Router()

const Tracker = require("../../models/tracker")
const Category = require("../../models/category")






router.get("/new", (req, res) => {
  res.render("new")
})

router.post("/", (req, res) => {
  const userId = req.user._id
  const { name, date, amount, category } = req.body
  Category.findOne({ category })
    .lean()
    .then(categoryOne => {
      const categoryId = categoryOne.image
      return Tracker.create({ name, date, amount, category, userId, categoryId })
        .then(() => res.redirect("/"))
        .catch(error => console.log(error))
      })
    .catch(error => console.log(error))
})


router.get("/:tracker_id/edit", (req, res) => {
  const userId = req.user._id
  const _id = req.params.tracker_id
  return Tracker.findOne({ _id, userId })
    .lean()
    .then(tracker => res.render("edit", { tracker }))
    .catch(error => console.log(error))
})

router.put("/:tracker_id", (req, res, next) => {
  const userId = req.user._id
  const _id = req.params.tracker_id
  const { name, date, category, amount } = req.body
  return Tracker.findOne({ _id, userId })
    .then(tracker => {
      tracker.name = name
      tracker.date = date
      tracker.category = category
      tracker.amount = amount
      return tracker.save()
    })
    .then(() => res.redirect(`/`))
    .catch(error => next(new Error(`some error ${error}`)))
})

router.delete("/:tracker_id", (req, res) => {
  const userId = req.user._id
  const _id = req.params.tracker_id
  return Tracker.findOne({ _id, userId })
    .then(tracker => tracker.remove())
    .then(() => res.redirect("/"))
    .catch(error => console.log(error))
})



module.exports = router