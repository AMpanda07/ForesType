import mongoose from 'mongoose';

const SUPPORTED_MODES = [
  'classic',
  'speed_rush',
  'accuracy',
  'endless',
  'spore_fall',
  'word_survival',
  'precision',
  'progressive',
  'keyboard_trainer'
];

const RecordSchema = new mongoose.Schema(
  {
    firebaseUid: {
      type: String,
      required: true,
      index: true
    },
    sessionId: {
      type: String,
      required: true,
      unique: true
    },
    playerName: {
      type: String,
      required: [true, 'Player name is required'],
      trim: true,
      minlength: [1, 'Player name must be at least 1 character'],
      maxlength: [20, 'Player name cannot exceed 20 characters']
    },
    score: {
      type: Number,
      required: true,
      min: 0,
      max: 999999
    },
    wpm: {
      type: Number,
      required: true,
      min: 0,
      max: 300
    },
    accuracy: {
      type: Number,
      required: true,
      min: 0,
      max: 100
    },
    cpm: {
      type: Number,
      required: true,
      min: 0,
      max: 1500
    },
    mode: {
      type: String,
      required: true,
      enum: SUPPORTED_MODES
    },
    duration: {
      type: Number,
      required: true,
      min: 1,
      max: 3600
    },
    consistency: {
      type: Number,
      default: 100,
      min: 0,
      max: 100
    },
    date: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true
  }
);

RecordSchema.index({ mode: 1, score: -1, wpm: -1 });
RecordSchema.index({ createdAt: -1 });

export default mongoose.model('Record', RecordSchema);
export { SUPPORTED_MODES };
