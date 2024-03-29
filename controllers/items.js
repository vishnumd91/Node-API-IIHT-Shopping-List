const mongoose = require("mongoose");
const ShoppingData = require("../models/shoppingList");

const getItems = async (req, res) => {
  // After JWT authentication, userName has been already set in req object using verifyJWT middleware.
  const { userName } = req;

  try {
    const shoppingItems = await ShoppingData.find({ userName });

    return res.status(200).json(shoppingItems);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

const addItems = async (req, res) => {
  const item = req.body;

  const newPost = new ShoppingData(item);

  try {
    await newPost.save();

    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

const deleteItems = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send("No items with that ID");
  }
  await ShoppingData.findByIdAndRemove(id);

  res.json(`Deleted the Item with ${id} Successfully`);
};

module.exports = {
  getItems,
  addItems,
  deleteItems,
};
