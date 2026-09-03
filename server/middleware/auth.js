import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_for_dev';

export const requireAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, message: 'Unauthorized: No token provided' });
    }

    const token = authHeader.split('Bearer ')[1];
    const decodedToken = jwt.verify(token, JWT_SECRET);
    
    if (!decodedToken) {
       return res.status(401).json({ success: false, message: 'Unauthorized: Invalid token' });
    }

    const user = await User.findById(decodedToken.userId);
    if (!user) {
      return res.status(401).json({ success: false, message: 'Unauthorized: User not found' });
    }
    
    req.user = user;
    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(401).json({ success: false, message: 'Unauthorized: Token verification failed' });
  }
};
