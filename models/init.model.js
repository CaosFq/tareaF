const Meal = require("./meal.model")
const Order = require("./order.model")
const Restaurant = require("./restaurant.model")
const Review = require("./reviews.model")
const User = require("./user.model")

const initModel = () => {
   
    User.hasMany(Review)//Un user a M review
    Review.belongsTo(User)

    /
    User.hasMany(Order)//Un user a M orders
    Order.belongsTo(User)

    
    Restaurant.hasMany(Review)//Un restaurant a M review
    Review.belongsTo(Restaurant)

    
    Restaurant.hasMany(Meal)//Un restaurant a M meals
    Meal.belongsTo(Restaurant)

    /
    Meal.hasOne(Order)//Un meals a un orders
    Order.belongsTo(Meal)
}

module.exports = initModel;