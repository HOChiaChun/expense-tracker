const bcryptjs = require("bcryptjs")


const db = require("../../config/mongoose")
const User = require("../../models/user")
const Tracker = require("../../models/tracker")
const Category = require("../../models/category")



const SEED_USER = { name: 'User1', email: 'user1@example.com', password: '12345678' }

const SEED_TRACKER = [{ name: "早餐", date: "2022-03-12", amount: 123, catrgory: "交通出行" },
                      { name: "早餐", date: "2022-03-12", amount: 123, catrgory: "交通出行" }]




db.once("open", () => {
  bcryptjs
    .genSalt(10)
    .then(salt => bcryptjs.hash(SEED_USER.password, salt))
    .then(hash => User.create({
      name: SEED_USER.name,
      email: SEED_USER.email,
      password: hash
    }))
    .then(user => console.log(user))
})


