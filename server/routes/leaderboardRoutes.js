import express from 'express';
import { getLeaderboard, getCurrentUserRank } from '../controllers/leaderboardController.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getLeaderboard);
router.get('/me/rank', requireAuth, getCurrentUserRank);

export default router;
