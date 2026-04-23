import express from 'express';
import { register, login, getMe, updateModules } from '#controllers/authController.js';
import { authenticate } from '#middleware/authMiddleware.js';

const router = express.Router();

// Public routes
router.post('/register', register);
router.post('/login', login);

// Protected routes
router.get('/me', authenticate, getMe);
router.patch('/modules', authenticate, updateModules);

export default router;
