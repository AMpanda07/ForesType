/**
 * Forest Type Scoring Math & Utility Functions
 */

/**
 * Standard WPM formula: (correct characters / 5) / minutes
 */
export const calculateWPM = (correctChars, timeInSeconds) => {
  if (!timeInSeconds || timeInSeconds <= 0) return 0;
  const minutes = timeInSeconds / 60;
  const words = correctChars / 5;
  const wpm = words / minutes;
  return Math.max(0, Math.round(wpm * 10) / 10);
};

/**
 * CPM formula: correct characters / minutes
 */
export const calculateCPM = (correctChars, timeInSeconds) => {
  if (!timeInSeconds || timeInSeconds <= 0) return 0;
  const minutes = timeInSeconds / 60;
  const cpm = correctChars / minutes;
  return Math.max(0, Math.round(cpm));
};

/**
 * Accuracy formula: (correct characters / total typed characters) * 100
 */
export const calculateAccuracy = (correctChars, totalTypedChars) => {
  if (!totalTypedChars || totalTypedChars <= 0) return 100;
  const raw = (correctChars / totalTypedChars) * 100;
  if (isNaN(raw) || !isFinite(raw)) return 100;
  return Math.min(100, Math.max(0, Math.round(raw * 10) / 10));
};

/**
 * Consistency calculation:
 * Measures variation between short WPM sample intervals (e.g. 1-second snapshots).
 * Returns normalized score 0-100% where 100% means perfectly constant speed.
 */
export const calculateConsistency = (intervalWpms = []) => {
  const validSamples = intervalWpms.filter((w) => typeof w === 'number' && !isNaN(w));
  if (validSamples.length < 2) return 100;

  const mean = validSamples.reduce((a, b) => a + b, 0) / validSamples.length;
  if (mean === 0) return 100;

  const variance =
    validSamples.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / validSamples.length;
  const stdDev = Math.sqrt(variance);

  // Normalized coefficient of variation inverted to percentage
  const cv = stdDev / mean;
  const consistency = Math.max(0, 100 - cv * 100);

  return Math.min(100, Math.max(0, Math.round(consistency)));
};

/**
 * Balanced game score calculator per mode
 */
export const calculateGameScore = ({ mode, wpm, accuracy, cpm, mistakes = 0, streak = 0, difficulty = 'intermediate', extra = {} }) => {
  const baseWpmScore = wpm * 10;
  const accuracyMultiplier = accuracy / 100;
  const streakBonus = streak * 5;
  const mistakePenalty = mistakes * 20;

  let totalScore = 0;

  switch (mode) {
    case 'speed_rush':
      totalScore = baseWpmScore * 1.5 + streakBonus * 2;
      break;

    case 'accuracy':
      // High weight on accuracy & heavy penalty for mistakes
      totalScore = (baseWpmScore + streakBonus * 3) * Math.pow(accuracyMultiplier, 2) - mistakePenalty * 2;
      break;

    case 'spore_fall':
      const sporesPopped = extra.sporesPopped || 0;
      totalScore = sporesPopped * 50 + baseWpmScore + streakBonus;
      break;

    case 'word_survival':
      const wordsSurvived = extra.wordsSurvived || 0;
      totalScore = wordsSurvived * 100 + baseWpmScore * accuracyMultiplier;
      break;

    default:
      totalScore = baseWpmScore * accuracyMultiplier + streakBonus - mistakePenalty;
      break;
  }

  // Apply difficulty multiplier
  const multipliers = {
    beginner: 0.8,
    intermediate: 1.0,
    advanced: 1.2,
    expert: 1.5
  };
  const multiplier = multipliers[difficulty] || 1.0;
  totalScore *= multiplier;

  return Math.max(0, Math.round(totalScore));
};
