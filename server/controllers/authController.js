import User from '../models/User.js';

export const syncUser = async (req, res, next) => {
  try {
    const { uid, email, name, picture } = req.firebaseUser;

    let user = await User.findOne({ firebaseUid: uid });
    
    if (!user) {
      // Create new user if they don't exist
      user = new User({
        firebaseUid: uid,
        email: email,
        displayName: name || email.split('@')[0],
        googlePhotoURL: picture || '',
        selectedAvatar: 'default',
        level: 1,
        experience: 0,
        lifetimeExperience: 0,
        unlockedAvatars: ['default']
      });
      await user.save();
    } else {
      // Optionally update photo or name if it changed, though for now we'll just return the user
      if (picture && user.googlePhotoURL !== picture) {
        user.googlePhotoURL = picture;
        await user.save();
      }
    }

    res.status(200).json({
      success: true,
      user: {
        firebaseUid: user.firebaseUid,
        email: user.email,
        displayName: user.displayName,
        googlePhotoURL: user.googlePhotoURL,
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

export const getProfile = async (req, res, next) => {
  try {
    const user = req.user;
    if (!user) return res.status(401).json({ success: false, message: 'User not found' });
    
    res.status(200).json({
      success: true,
      user: {
        firebaseUid: user.firebaseUid,
        email: user.email,
        displayName: user.displayName,
        googlePhotoURL: user.googlePhotoURL,
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
