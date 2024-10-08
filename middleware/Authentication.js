const jwt = require("jsonwebtoken");

const Authentication = (req, res, next) => {
  const authHeaders = req.headers["authorization"];
  const token = authHeaders && authHeaders.split(" ")[1];
  if (!token) return res.sendStatus(401);
  jwt.verify(token, process.env.ACCESS_TOKEN, (err, decoded) => {
    if (err) return res.sendStatus(403);
    req.userId = decoded.userId;

    next();
  });
};

module.exports = Authentication;
