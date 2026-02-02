import express from 'express';
import { signup, login, getMe, refreshToken, logout } from '../controllers/auth.controller.js';
import { protect } from '../middleware/auth.middleware.js';
import { authLimiter } from '../middleware/rateLimiter.js';
import { signupValidation, loginValidation } from '../middleware/validation.middleware.js';
import validate from '../middleware/validate.js';

const router = express.Router();

// Public routes with auth rate limiting
router.post('/signup', authLimiter, signupValidation, validate, signup);
router.post('/login', authLimiter, loginValidation, validate, login);
router.post('/refresh-token', refreshToken);
router.post('/logout', logout);

// Protected routes
router.get('/me', protect, getMe);

export default router;
