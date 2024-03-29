const express = require("express");

const { getItems, addItems, deleteItems } = require("../controllers/items");
const { verifyToken } = require("../middlewares/verifyJWT");

const router = express.Router();

router.get("/getItems", getItems);

router.post("/postItems", addItems);

router.delete("/deleteItems/:id", deleteItems);

module.exports = router;
