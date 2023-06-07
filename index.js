const express = require("express");

const app = express();

const dotenv = require("dotenv");

dotenv.config();

const PORT = process.env.PORT || 5000;

const cors = require("cors");

const mongoose = require("mongoose");

const itemRoutes = require("./routes/itemRoutes");

const authenticationRoutes = require("./routes/authenticationRoutes");
const { verifyToken } = require("./middlewares/verifyJWT");
const cookieParser = require("cookie-parser");

app.use(cors());

app.use(
  express.urlencoded({
    extended: false,
  })
);

app.use(express.json());

app.use(cookieParser());

app.use("/auth", authenticationRoutes);

// Any middleware that comes after verifyToken will go through jwt authentication
// app.use(verifyToken);

app.use("/items", verifyToken, itemRoutes);

app.use("/", (req, res) => {
  res.send("Hello, Welcome to Shopping List API");
});

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));

mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(
    mongoose.connection.once("open", () => {
      console.log("MongoDB Connected Succesfully");
    })
  );
