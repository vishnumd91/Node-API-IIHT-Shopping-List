const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json("Token not found");
  const receivedToken = authHeader.split(" ")[1]; // Bearer Token => [Bearer Token] will be taking index 1 on splitting
  jwt.verify(
    receivedToken,
    process.env.ACCESS_TOKEN_SECRET_KEY,
    (err, decodedInfo) => {
      if (err) {
        console.log(err);
        return res.status(403).json("Token is invalid");
      }
      req.userName = decodedInfo.userName;
      next();
    }
  );
};

module.exports = {
  verifyToken,
};
