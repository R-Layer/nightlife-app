const jwt = require("jsonwebtoken");
const configVars = require("../config/keys");

module.exports = (req, res, next) => {
  const { token } = JSON.parse(req.headers.authorization);
  try {
    req.app.locals.userAuth = jwt.verify(token, configVars.JWT_SECRET);
    next();
  } catch (err) {
    res.status(403).json({
      message: "Access Forbidden",
      err
    });
  }
};
