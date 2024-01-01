const { check, validationResult } = require('express-validator');

const validationMiddleware = [
    check('email').isEmail().withMessage('Invalid email'),
    check('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters'),
    check('username').isLength({ min: 1 }).withMessage('Username must be present')
  ];

  const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    const extractedErrors = [];
    errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }));
    // Return a 400 Bad Request status for validation errors
    return res.status(500).json({
      errors: extractedErrors,
    });
};

module.exports = {validationMiddleware,validate};