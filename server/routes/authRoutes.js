import express from 'express';
import { syncUser, getProfile } from '../controllers/authController.js';
import { requireAuth } from '../middleware/auth.js';
import admin from '../config/firebaseAdmin.js';

const router = express.Router();

// Middleware to just verify Firebase token but not require DB user
const verifyFirebaseToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }
    const token = authHeader.split('Bearer ')[1];
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.firebaseUser = decodedToken;
    next();
  } catch (error) {
    res.status(401).json({ success: false, message: 'Invalid token' });
  }
};

router.post('/sync', verifyFirebaseToken, syncUser);
router.get('/profile', requireAuth, getProfile);

export default router;
