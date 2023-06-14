const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const verifyToken = (req, res, next) => {
  // This line will parse the token from cookie using cookie parser.
  const token = req.cookies.access_token;
  // const token = req.headers.authorization.split(" ")[1];

  if (!token) return res.status(401).json("Token not found");
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY, (err, decodedInfo) => {
    if (err) {
      console.log(err);
      return res.status(403).json("Token is invalid");
    }
    req.userName = decodedInfo.userName;
    next();
  });
};

module.exports = {
  verifyToken,
};
