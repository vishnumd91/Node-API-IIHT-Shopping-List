const mongoose = require('mongoose');

const shoppingList = mongoose.Schema({
    itemName: String,
})

const ShoppingData = mongoose.model('shoppingList', shoppingList);

module.exports = ShoppingData;