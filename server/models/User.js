import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    firebaseUid: {
      type: String,
      required: true,
      unique: true,
      index: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    displayName: {
      type: String,
      required: true
    },
    googlePhotoURL: {
      type: String,
      default: ''
    },
    selectedAvatar: {
      type: String,
      default: ''
    },
    level: {
      type: Number,
      default: 1
    },
    experience: {
      type: Number,
      default: 0
    },
    lifetimeExperience: {
      type: Number,
      default: 0,
      index: -1 // For leaderboard sorting
    },
    unlockedAvatars: {
      type: [String],
      default: []
    },
    lastPlayedDate: {
      type: Date,
      default: null
    },
    currentStreak: {
      type: Number,
      default: 0
    },
    stats: {
      testsCompleted: { type: Number, default: 0 },
      totalCharacters: { type: Number, default: 0 },
      totalCorrectCharacters: { type: Number, default: 0 },
      bestWpm: { type: Number, default: 0 },
      averageWpm: { type: Number, default: 0 },
      bestAccuracy: { type: Number, default: 0 },
      averageAccuracy: { type: Number, default: 0 },
      totalTypingTime: { type: Number, default: 0 } // in seconds
    }
  },
  {
    timestamps: true
  }
);

// Compound index for tie-breakers if needed (lifetime EXP DESC, createdAt ASC)
UserSchema.index({ lifetimeExperience: -1, createdAt: 1 });

export default mongoose.model('User', UserSchema);
