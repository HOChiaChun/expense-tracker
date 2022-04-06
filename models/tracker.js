function formatDate(date) {
  const finalDay = new Date(date)
  let day = finalDay.getDate()
  let month = finalDay.getMonth()
  const years = finalDay.getFullYear()

  if (Number(month) <= 9) {
    month = '0' + month
  }
  if (Number(day) <= 9) {
    day = '0' + day
  }

  return [years, month, day].join('-');
}

const mongoose = require("mongoose")
const Schema = mongoose.Schema
const trackerSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true,
    set: date => formatDate(date)
  },
  amount: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    index: true,
    required: true
  }
})

module.exports = mongoose.model("Tracker", trackerSchema)