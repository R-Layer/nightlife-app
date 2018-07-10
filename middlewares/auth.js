const jwt = require("jsonwebtoken");
const configVars = require("../config/keys");

module.exports = (req, res, next) => {
  try {
    const { token } = JSON.parse(req.headers.authorization);
    req.app.locals.userAuth = jwt.verify(token, configVars.JWT_SECRET);
    next();
  } catch (err) {
    res.status(403).json({
      message: "Access Forbidden",
      err
    });
  }
};
