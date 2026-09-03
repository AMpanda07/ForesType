import express from 'express';
import { register, login, verifyAuth } from '../controllers/authController.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/verify', requireAuth, verifyAuth);

export default router;
