const CATEGORY = {
  居家物業: `<i class="fa-solid fa-house"></i>`,
  交通出行: `<i class="fa-solid fa-van-shuttle"></i>`,
  休閒娛樂: `<i class="fa-solid fa-face-grin-beam"></i>`,
  餐飲食品: `<i class="fa-solid fa-utensils"></i>`,
  其他: `<i class="fa-solid fa-pen"></i>`
}

const db = require("../../config/mongoose")
const Category = require("../category")

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}


db.once("open", () => {
  const objectkeys = Object.keys(CATEGORY)
  const objectvalues = Object.values(CATEGORY)
  return Promise.all(Array.from(
    { length: 5 },
    (_, i) => Category.create({ category: objectkeys[i], image: objectvalues[i] })
  ))
  .then(() => {
    console.log("done")
    process.exit()
  })
})
