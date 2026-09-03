import User from '../models/User.js';

export const getLeaderboard = async (req, res, next) => {
  try {
    const { limit = 50, page = 1 } = req.query;
    const parsedLimit = Math.min(Math.max(parseInt(limit, 10) || 50, 1), 100);
    const parsedPage = Math.max(parseInt(page, 10) || 1, 1);
    
    const skip = (parsedPage - 1) * parsedLimit;

    const users = await User.find({})
      .sort({ lifetimeExperience: -1, createdAt: 1 })
      .skip(skip)
      .limit(parsedLimit)
      .select('firebaseUid displayName selectedAvatar level lifetimeExperience stats.testsCompleted stats.bestWpm stats.averageAccuracy')
      .lean();
      
    // Count total users for pagination metadata
    const totalUsers = await User.countDocuments({});

    // Add rank calculation relative to overall position
    const rankedUsers = users.map((user, index) => ({
      ...user,
      rank: skip + index + 1
    }));

    res.status(200).json({
      success: true,
      data: rankedUsers,
      pagination: {
        total: totalUsers,
        page: parsedPage,
        limit: parsedLimit,
        pages: Math.ceil(totalUsers / parsedLimit)
      }
    });
  } catch (error) {
    next(error);
  }
};
