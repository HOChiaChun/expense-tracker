const bcryptjs = require("bcryptjs")

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const db = require("../../config/mongoose")
const User = require("../../models/user")
const Tracker = require("../../models/tracker")
const Category = require("../../models/category")



const SEED_USER = { name: 'User1', email: 'user1@example.com', password: '12345678' }

const SEED_TRACKER = [{ name: "早餐", date: "2022-03-11", amount: 100, catrgory: "交通出行" },
                      { name: "管理費", date: "2022-03-12", amount: 200, catrgory: "居家物業" }]




db.once("open", () => {
  bcryptjs
    .genSalt(10)
    .then(salt => bcryptjs.hash(SEED_USER.password, salt))
    .then(hash => User.create({
      name: SEED_USER.name,
      email: SEED_USER.email,
      password: hash
    }))
    .then(user => {
      const userId = user._id
      return Promise.all(Array.from(
        { length: 2 },
        (_, i) =>
        Category.findOne({ category: SEED_TRACKER[i].catrgory })
        .then(userCategory => {
           const categoryId = userCategory.image
           return Tracker.create({ name: SEED_TRACKER[i].name, date: SEED_TRACKER[i].date, amount: SEED_TRACKER[i].amount, category: SEED_TRACKER[i].catrgory, userId, categoryId  })
        })
      ))
    })
    .then(() => {
      console.log("done.")
      process.exit()
    })
})


