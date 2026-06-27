const jwt = require("jsonwebtoken");

const SECRET = "mein-geheimer-schluessel";

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Kein Token!" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Token ungültig!" });
  }
}

module.exports = authMiddleware;
