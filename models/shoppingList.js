const mongoose = require("mongoose");

const shoppingList = mongoose.Schema({
  itemName: String,
  userName: {
    type: String,
    ref: "userSchema",
  },
});

const ShoppingData = mongoose.model("shoppingList", shoppingList);

module.exports = ShoppingData;
