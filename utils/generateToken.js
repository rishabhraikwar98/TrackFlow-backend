const jwt = require("jsonwebtoken");

const generateToken = (userId) => {
  if (!userId) {
    throw new Error("User ID is required to generate a token");
  }
  
  const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "90d", // Token valid for 90 days
  });
    return token;
}
module.exports = generateToken;