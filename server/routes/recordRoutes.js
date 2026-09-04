import express from 'express';
import { getRecords, createRecord, getRecordsByMode, getMyRecords } from '../controllers/recordController.js';
import { antiCheatGuard } from '../middleware/antiCheat.js';
import { recordSubmissionLimiter } from '../middleware/rateLimiter.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

// GET /api/records - Get all high scores (optional ?mode= & ?limit=)
router.get('/', getRecords);

// GET /api/records/me - Get current user's recent scores
router.get('/me', requireAuth, getMyRecords);

// GET /api/records/:mode - Get high scores for a specific mode
router.get('/:mode', getRecordsByMode);

// POST /api/records - Submit a high score with rate limiting and anti-cheat checks
router.post('/', requireAuth, recordSubmissionLimiter, antiCheatGuard, createRecord);

export default router;
