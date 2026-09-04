import Record from '../models/Record.js';
import User from '../models/User.js';
import { getIsConnected } from '../config/db.js';
import { calculateExp, checkLevelUp, updateStreak } from '../services/progressionService.js';

// In-memory fallback record store when MongoDB is not connected
const fallbackRecords = [
  {
    _id: 'fb-1',
    playerName: 'Elder Moss',
    wpm: 118,
    accuracy: 99.1,
    cpm: 590,
    score: 1840,
    mode: 'classic',
    duration: 60,
    consistency: 96,
    date: new Date(Date.now() - 3600000 * 5)
  },
  {
    _id: 'fb-2',
    playerName: 'Spore Wandere',
    wpm: 104,
    accuracy: 97.8,
    cpm: 520,
    score: 1620,
    mode: 'speed_rush',
    duration: 30,
    consistency: 92,
    date: new Date(Date.now() - 3600000 * 12)
  },
  {
    _id: 'fb-3',
    playerName: 'Thorn Blade',
    wpm: 96,
    accuracy: 100,
    cpm: 480,
    score: 1510,
    mode: 'accuracy',
    duration: 60,
    consistency: 98,
    date: new Date(Date.now() - 3600000 * 24)
  },
  {
    _id: 'fb-4',
    playerName: 'Glow Weaver',
    wpm: 88,
    accuracy: 96.5,
    cpm: 440,
    score: 1390,
    mode: 'spore_fall',
    duration: 90,
    consistency: 89,
    date: new Date(Date.now() - 3600000 * 36)
  }
];

export const getRecords = async (req, res, next) => {
  try {
    const { mode, limit = 50 } = req.query;
    const recordLimit = Math.min(Math.max(parseInt(limit, 10) || 50, 1), 100);

    if (!getIsConnected()) {
      let filtered = [...fallbackRecords];
      if (mode && mode !== 'all') {
        filtered = filtered.filter((r) => r.mode === mode);
      }
      filtered.sort((a, b) => b.score - a.score || b.wpm - a.wpm);
      return res.json({
        success: true,
        source: 'fallback',
        count: filtered.length,
        data: filtered.slice(0, recordLimit)
      });
    }

    const query = {};
    if (mode && mode !== 'all') {
      query.mode = mode;
    }

    const records = await Record.find(query)
      .sort({ score: -1, wpm: -1, accuracy: -1 })
      .limit(recordLimit)
      .lean();

    res.json({
      success: true,
      source: 'mongodb',
      count: records.length,
      data: records
    });
  } catch (error) {
    next(error);
  }
};

export const createRecord = async (req, res, next) => {
  try {
    const recordData = req.sanitizedRecord;
    // recordData should contain sessionId, wpm, accuracy, duration, score, mode
    const user = req.user;

    if (!user) {
      return res.status(401).json({ success: false, message: 'User not authenticated' });
    }

    if (!getIsConnected()) {
      return res.status(503).json({ success: false, message: 'Database not connected' });
    }

    // Check for duplicate submission
    const existingRecord = await Record.findOne({ sessionId: recordData.sessionId });
    if (existingRecord) {
      return res.status(409).json({ success: false, message: 'Session already submitted' });
    }

    const newRecord = await Record.create({
      ...recordData,
      firebaseUid: user.firebaseUid,
      playerName: user.displayName,
      date: new Date()
    });

    // Handle Progression
    const baseExp = calculateExp(recordData, user);
    let finalExp = baseExp;

    const isStreakDay = updateStreak(user);
    if (isStreakDay && finalExp > 0) {
      finalExp *= 2;
    }

    user.experience += finalExp;
    user.lifetimeExperience += finalExp;

    // Update stats
    user.stats.testsCompleted += 1;
    user.stats.totalTypingTime += recordData.duration;
    
    // Simple running average
    user.stats.averageWpm = Math.round(((user.stats.averageWpm * (user.stats.testsCompleted - 1)) + recordData.wpm) / user.stats.testsCompleted);
    user.stats.averageAccuracy = Math.round(((user.stats.averageAccuracy * (user.stats.testsCompleted - 1)) + recordData.accuracy) / user.stats.testsCompleted);
    
    if (recordData.wpm > user.stats.bestWpm) user.stats.bestWpm = recordData.wpm;
    if (recordData.accuracy > user.stats.bestAccuracy) user.stats.bestAccuracy = recordData.accuracy;

    const leveledUp = checkLevelUp(user);
    await user.save();

    // Emit live leaderboard update
    const io = req.app.get('io');
    if (io) {
      io.emit('leaderboard:update', {
        userId: user._id,
        firebaseUid: user.firebaseUid,
        displayName: user.displayName,
        level: user.level,
        lifetimeExperience: user.lifetimeExperience
      });
    }

    res.status(201).json({
      success: true,
      source: 'mongodb',
      message: 'Record successfully recorded and progression updated!',
      data: newRecord,
      progression: {
        expEarned: finalExp,
        leveledUp,
        newLevel: user.level,
        experience: user.experience,
        lifetimeExperience: user.lifetimeExperience
      }
    });
  } catch (error) {
    next(error);
  }
};

export const getRecordsByMode = async (req, res, next) => {
  try {
    const { mode } = req.params;
    req.query.mode = mode;
    return getRecords(req, res, next);
  } catch (error) {
    next(error);
  }
};

export const getMyRecords = async (req, res, next) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).json({ success: false, message: 'User not authenticated' });
    }
    
    if (!getIsConnected()) {
      return res.json({
        success: true,
        source: 'fallback',
        data: []
      });
    }

    const records = await Record.find({ firebaseUid: user.firebaseUid })
      .sort({ createdAt: -1 })
      .limit(20)
      .lean();
      
    res.json({
      success: true,
      source: 'mongodb',
      count: records.length,
      data: records
    });
  } catch (error) {
    next(error);
  }
};
