import { SUPPORTED_MODES } from '../models/Record.js';

export const sanitizeString = (str) => {
  if (typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;')
    .trim();
};

export const validateRecordInput = (data) => {
  const errors = [];

  const { playerName, score, wpm, accuracy, cpm, mode, duration, consistency, sessionId } = data;

  // Player Name
  const cleanName = sanitizeString(playerName);
  if (!cleanName || cleanName.length < 1 || cleanName.length > 20) {
    errors.push('Player name must be between 1 and 20 characters.');
  }

  // Mode
  if (!mode || !SUPPORTED_MODES.includes(mode)) {
    errors.push(`Invalid game mode: ${mode}`);
  }

  // WPM
  const numericWpm = Number(wpm);
  if (isNaN(numericWpm) || numericWpm < 0 || numericWpm > 300) {
    errors.push('WPM must be a number between 0 and 300.');
  }

  // Accuracy
  const numericAccuracy = Number(accuracy);
  if (isNaN(numericAccuracy) || numericAccuracy < 0 || numericAccuracy > 100) {
    errors.push('Accuracy must be a number between 0% and 100%.');
  }

  // CPM
  const numericCpm = Number(cpm);
  if (isNaN(numericCpm) || numericCpm < 0 || numericCpm > 1500) {
    errors.push('CPM must be a number between 0 and 1500.');
  }

  // Score
  const numericScore = Number(score);
  if (isNaN(numericScore) || numericScore < 0 || numericScore > 999999) {
    errors.push('Score must be a positive number up to 999,999.');
  }

  // Duration
  const numericDuration = Number(duration);
  if (isNaN(numericDuration) || numericDuration <= 0 || numericDuration > 3600) {
    errors.push('Duration must be a positive number of seconds.');
  }

  return {
    isValid: errors.length === 0,
    errors,
    sanitizedData: {
      playerName: cleanName,
      score: Math.round(numericScore),
      wpm: Math.round(numericWpm),
      accuracy: Math.round(numericAccuracy),
      cpm: Math.round(numericCpm),
      mode,
      duration: Math.round(numericDuration),
      consistency: consistency !== undefined ? Math.max(0, Math.min(100, Math.round(Number(consistency)))) : 100,
      sessionId: sanitizeString(sessionId) || 'missing-session-id-' + Date.now()
    }
  };
};
