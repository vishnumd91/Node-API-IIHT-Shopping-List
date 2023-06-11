const express = require("express");

const app = express();

const dotenv = require("dotenv");

dotenv.config();

const PORT = process.env.PORT || 10000;

const cors = require("cors");

const mongoose = require("mongoose");

const itemRoutes = require("./routes/itemRoutes");

const authenticationRoutes = require("./routes/authenticationRoutes");
const { verifyToken } = require("./middlewares/verifyJWT");
const cookieParser = require("cookie-parser");

/* The credentials: true option is crucial as it allows the browser to include credentials 
  (such as cookies) in the cross-origin request. */
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://small-shopping-list.netlify.app",
    ],
    credentials: true,
  })
);

/*  This line allows the server to respond to preflight requests sent by the browser 
    to check the allowed methods and headers for the actual request. */
app.options("*", cors());

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
      console.log("MongoDB Connected Successfully");
    })
  );
