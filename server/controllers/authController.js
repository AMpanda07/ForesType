import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_for_dev';

export const register = async (req, res, next) => {
  try {
    const { email, password, displayName } = req.body;
    
    if (!email || !password || !displayName) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ success: false, message: 'Email already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    // Use email as firebaseUid placeholder since we removed Firebase
    const firebaseUid = email;

    const newUser = new User({
      firebaseUid,
      email,
      password: hashedPassword,
      displayName,
      googlePhotoURL: '',
      selectedAvatar: ''
    });

    await newUser.save();

    const token = jwt.sign({ userId: newUser._id, firebaseUid }, JWT_SECRET, { expiresIn: '7d' });

    res.status(201).json({
      success: true,
      token,
      user: {
        firebaseUid: newUser.firebaseUid,
        email: newUser.email,
        displayName: newUser.displayName,
        selectedAvatar: newUser.selectedAvatar,
        level: newUser.level,
        experience: newUser.experience,
        lifetimeExperience: newUser.lifetimeExperience,
        unlockedAvatars: newUser.unlockedAvatars,
        stats: newUser.stats
      }
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id, firebaseUid: user.firebaseUid }, JWT_SECRET, { expiresIn: '7d' });

    res.status(200).json({
      success: true,
      token,
      user: {
        firebaseUid: user.firebaseUid,
        email: user.email,
        displayName: user.displayName,
        selectedAvatar: user.selectedAvatar,
        level: user.level,
        experience: user.experience,
        lifetimeExperience: user.lifetimeExperience,
        unlockedAvatars: user.unlockedAvatars,
        stats: user.stats
      }
    });
  } catch (error) {
    next(error);
  }
};

export const verifyAuth = async (req, res, next) => {
  try {
    const user = req.user;
    if (!user) return res.status(401).json({ success: false, message: 'User not found' });
    
    res.status(200).json({
      success: true,
      user: {
        firebaseUid: user.firebaseUid,
        email: user.email,
        displayName: user.displayName,
        selectedAvatar: user.selectedAvatar,
        level: user.level,
        experience: user.experience,
        lifetimeExperience: user.lifetimeExperience,
        unlockedAvatars: user.unlockedAvatars,
        stats: user.stats
      }
    });
  } catch (error) {
    next(error);
  }
};
