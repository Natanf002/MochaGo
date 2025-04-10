// File: models/db.js
import mysql from 'mysql2/promise';

const db = await mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'softwareEngineering25',
  database: 'mochago',
});

export default db;
