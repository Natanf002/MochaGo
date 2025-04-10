// File: server/server.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import authRoutes from './routes/authRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import eventRoutes from './routes/eventRoutes.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5050;

// Necessary to support __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve uploaded profile photos statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/events', eventRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
