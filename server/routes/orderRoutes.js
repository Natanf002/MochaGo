import express from 'express';
import db from '../models/db.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Get user's order history
router.get('/', authenticateToken, async (req, res) => {
  try {
    const [orders] = await db.query(
      'SELECT order_date, order_time, items FROM orders WHERE user_id = ? ORDER BY order_date DESC',
      [req.user.id]
    );
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch orders' });
  }
});

export default router;
