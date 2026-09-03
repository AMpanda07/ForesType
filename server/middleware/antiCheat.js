import { validateRecordInput } from '../utils/validation.js';

export const antiCheatGuard = (req, res, next) => {
  const validation = validateRecordInput(req.body);

  if (!validation.isValid) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: validation.errors
    });
  }

  const { wpm, accuracy, cpm, duration, score } = validation.sanitizedData;

  // Anti-cheat rule 1: Unrealistic human WPM (> 260 WPM)
  if (wpm > 260) {
    return res.status(422).json({
      success: false,
      message: 'Record flagged: Unrealistic WPM detected.'
    });
  }

  // Anti-cheat rule 2: Mathematical CPM vs WPM consistency (CPM should be ~ WPM * 5)
  // Allow a standard variance of +/- 30%
  const expectedCpmMin = Math.floor(wpm * 3.5);
  const expectedCpmMax = Math.ceil(wpm * 7.5);
  if (wpm > 20 && (cpm < expectedCpmMin || cpm > expectedCpmMax)) {
    return res.status(422).json({
      success: false,
      message: 'Record flagged: Inconsistent WPM/CPM relationship.'
    });
  }

  // Anti-cheat rule 3: Score anomaly vs duration and WPM
  // Score shouldn't exceed wpm * duration * 20
  const maxPossibleScore = Math.max(1000, wpm * duration * 25);
  if (score > maxPossibleScore) {
    return res.status(422).json({
      success: false,
      message: 'Record flagged: Score exceeds maximum theoretical limit for session.'
    });
  }

  // Attach clean sanitized data to request
  req.sanitizedRecord = validation.sanitizedData;
  next();
};
