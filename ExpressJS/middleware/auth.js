const jwt = require("jsonwebtoken");

// implementing auth portion of project
const auth = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ error: "No token provided." });
  }

  try {
    // verify the token
    const decoded = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);
    req.user = decoded; // attach user data to request
    next(); // continue to route
  } catch (err) {
    res.status(400).json({ error: "Invalid token." });
  }
};

module.exports = auth;
