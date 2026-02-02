import express from 'express';
import { getProfile, updateProfile } from '../controllers/user.controller.js';
import { protect } from '../middleware/auth.middleware.js';
import { updateProfileValidation } from '../middleware/validation.middleware.js';
import validate from '../middleware/validate.js';

const router = express.Router();

// All routes are protected
router.use(protect);

router.route('/')
  .get(getProfile)
  .put(updateProfileValidation, validate, updateProfile);

export default router;
