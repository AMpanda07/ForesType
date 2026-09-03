import express from 'express';
import { getParagraph } from '../services/wikipediaService.js';

const router = express.Router();

// GET /api/content/paragraph
router.get('/paragraph', async (req, res) => {
  try {
    const paragraph = await getParagraph();
    res.json(paragraph);
  } catch (error) {
    console.error("Content fetch error:", error);
    res.status(500).json({ success: false, message: 'Failed to fetch content' });
  }
});

export default router;
