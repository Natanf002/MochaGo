// File: server/routes/authRoutes.js
import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import multer from 'multer';
import db from '../models/db.js';
import { authenticateToken } from '../middleware/auth.js'; // move token logic into middleware

const router = express.Router();
const SECRET = 'super_secret_key';

// Setup multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'server/uploads/'),
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});
const upload = multer({ storage });

// REGISTER
router.post('/register', async (req, res) => {
  const { firstName, lastName, email, phone, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: 'Missing required fields' });

  try {
    const [existingUser] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    if (existingUser.length > 0) return res.status(409).json({ message: 'Email already registered' });

    const hashed = await bcrypt.hash(password, 10);
    await db.query(
      'INSERT INTO users (first_name, last_name, email, phone, password) VALUES (?, ?, ?, ?, ?)',
      [firstName, lastName, email, phone, hashed]
    );

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// LOGIN
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const [userResult] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    const user = userResult[0];
    if (!user) return res.status(404).json({ message: 'User not found' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: 'Incorrect password' });

    const token = jwt.sign({ id: user.id, email: user.email }, SECRET, { expiresIn: '1d' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Login failed', error: err.message });
  }
});

// GET Current User
router.get('/me', authenticateToken, async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT first_name, last_name, email, phone, payment_method, profile_photo FROM users WHERE id = ?',
      [req.user.id]
    );
    if (rows.length === 0) return res.status(404).json({ message: 'User not found' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// UPDATE USER
router.put('/me', authenticateToken, upload.single('profile_photo'), async (req, res) => {
  const { email, phone, payment_method } = req.body;
  const profile_photo = req.file ? `/uploads/${req.file.filename}` : null;

  try {
    let updateFields = 'email = ?, phone = ?, payment_method = ?';
    let values = [email, phone, payment_method];

    if (profile_photo) {
      updateFields += ', profile_photo = ?';
      values.push(profile_photo);
    }

    values.push(req.user.id);

    await db.query(
      `UPDATE users SET ${updateFields} WHERE id = ?`,
      values
    );

    res.json({ message: 'Profile updated successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Update failed', error: err.message });
  }
});

export default router;
