'use strict';
const { validationResult } = require('express-validator');

module.exports = () => {
  return async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(404).json(errors.mapped());
    }

    next();
  }
}
