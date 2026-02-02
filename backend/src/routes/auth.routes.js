import express from 'express';
import { signup, login, getMe } from '../controllers/auth.controller.js';
import { protect } from '../middleware/auth.middleware.js';
import { signupValidation, loginValidation } from '../middleware/validation.middleware.js';
import validate from '../middleware/validate.js';

const router = express.Router();

// Public routes
router.post('/signup', signupValidation, validate, signup);
router.post('/login', loginValidation, validate, login);

// Protected routes
router.get('/me', protect, getMe);

export default router;
