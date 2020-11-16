const { validationResult } = require("express-validator");

module.exports = (req, res, next) => {
  const error = validationResult(req);
  if (error.isEmpty()) {
    return next();
  }
  var result = {};
  error.array().map((item) => {
    if (!Object.keys(result).includes(item.param)) {
      result[item.param] = item.msg;
    }
  });
  res.status(400).json({ message: "Bad request!", error: result });
};
