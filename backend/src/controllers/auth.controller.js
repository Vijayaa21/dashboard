import User from '../models/User.model.js';
import { 
  generateToken, 
  generateRefreshToken, 
  verifyRefreshToken,
  setRefreshTokenCookie,
  clearRefreshTokenCookie 
} from '../middleware/auth.middleware.js';
import { ApiError } from '../middleware/errorHandler.js';
import asyncHandler from '../utils/asyncHandler.js';
import logger from '../utils/logger.js';

// @desc    Register a new user
// @route   POST /api/v1/auth/signup
// @access  Public
export const signup = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ApiError(400, 'User with this email already exists');
  }

  // Create user
  const user = await User.create({
    name,
    email,
    password,
  });

  // Generate tokens
  const token = generateToken(user._id);
  const refreshToken = generateRefreshToken(user._id);

  // Set refresh token as httpOnly cookie
  setRefreshTokenCookie(res, refreshToken);

  logger.info(`New user registered: ${email}`);

  res.status(201).json({
    success: true,
    message: 'User registered successfully',
    data: {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        createdAt: user.createdAt,
      },
      token,
    },
  });
});

// @desc    Login user
// @route   POST /api/v1/auth/login
// @access  Public
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Find user and include password for comparison
  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    throw new ApiError(401, 'Invalid email or password');
  }

  // Check password
  const isMatch = await user.comparePassword(password);

  if (!isMatch) {
    throw new ApiError(401, 'Invalid email or password');
  }

  // Generate tokens
  const token = generateToken(user._id);
  const refreshToken = generateRefreshToken(user._id);

  // Set refresh token as httpOnly cookie
  setRefreshTokenCookie(res, refreshToken);

  logger.info(`User logged in: ${email}`);

  res.json({
    success: true,
    message: 'Login successful',
    data: {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        createdAt: user.createdAt,
      },
      token,
    },
  });
});

// @desc    Get current logged in user
// @route   GET /api/v1/auth/me
// @access  Private
export const getMe = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  res.json({
    success: true,
    data: {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    },
  });
});

// @desc    Refresh access token
// @route   POST /api/v1/auth/refresh-token
// @access  Public (with valid refresh token cookie)
export const refreshToken = asyncHandler(async (req, res) => {
  const refreshTokenFromCookie = req.cookies.refreshToken;

  if (!refreshTokenFromCookie) {
    throw new ApiError(401, 'No refresh token provided');
  }

  // Verify refresh token
  const decoded = verifyRefreshToken(refreshTokenFromCookie);

  if (!decoded) {
    clearRefreshTokenCookie(res);
    throw new ApiError(401, 'Invalid or expired refresh token');
  }

  // Get user from token
  const user = await User.findById(decoded.id);

  if (!user) {
    clearRefreshTokenCookie(res);
    throw new ApiError(401, 'User no longer exists');
  }

  // Generate new tokens
  const newAccessToken = generateToken(user._id);
  const newRefreshToken = generateRefreshToken(user._id);

  // Set new refresh token cookie
  setRefreshTokenCookie(res, newRefreshToken);

  logger.info(`Token refreshed for user: ${user.email}`);

  res.json({
    success: true,
    message: 'Token refreshed successfully',
    data: {
      token: newAccessToken,
    },
  });
});

// @desc    Logout user (clear refresh token cookie)
// @route   POST /api/v1/auth/logout
// @access  Public
export const logout = asyncHandler(async (req, res) => {
  clearRefreshTokenCookie(res);

  res.json({
    success: true,
    message: 'Logged out successfully',
  });
});
