import { validationResult } from 'express-validator';
import { ApiError } from './errorHandler.js';

// Middleware to check validation results
const validate = (req, res, next) => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map((error) => error.msg);
    throw new ApiError(400, errorMessages.join(', '));
  }
  
  next();
};

export default validate;
