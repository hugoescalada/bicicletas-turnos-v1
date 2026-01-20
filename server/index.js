import express from 'express';
import cors from 'cors';
import sqlite3 from 'sqlite3';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

// Needed for __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Database Setup
const dbPath = resolve(__dirname, '..', 'bookings.db');

const sqlite = sqlite3.verbose();

const db = new sqlite.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database', err.message);
    } else {
        console.log('Connected to the SQLite database at ' + dbPath);

        // 1. Create table if not exists (Original schema)
        db.run(`CREATE TABLE IF NOT EXISTS bookings (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
            serviceId TEXT,
            date TEXT,
            time TEXT,
            clientName TEXT,
            clientEmail TEXT,
            clientPhone TEXT,
            bikeModel TEXT
        )`, (err) => {
            if (!err) {
                // 2. Migration: Try to add adminNotes column if it doesn't exist.
                // SQLite doesn't have "ADD COLUMN IF NOT EXISTS", so we try and ignore error if it exists.
                db.run(`ALTER TABLE bookings ADD COLUMN adminNotes TEXT`, (err) => {
                    if (err && !err.message.includes('duplicate column name')) {
                        console.log("Error adding adminNotes:", err.message);
                    }
                });

                // 3. Migration: Add 'completed' column (integer 0 or 1)
                db.run(`ALTER TABLE bookings ADD COLUMN completed INTEGER DEFAULT 0`, (err) => {
                    if (err && !err.message.includes('duplicate column name')) {
                        console.log("Error adding completed column:", err.message);
                    } else {
                        console.log("Schema updated: completed column added.");
                    }
                });
            }
        });
    }
});

// Routes

// Get all bookings
app.get('/api/bookings', (req, res) => {
    db.all("SELECT * FROM bookings ORDER BY createdAt DESC", [], (err, rows) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({ data: rows });
    });
});

// Create a new booking
app.post('/api/bookings', (req, res) => {
    const { service, date, time, userData } = req.body;

    // Validate basic data
    if (!service || !date || !time || !userData) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    const { name, email, phone, bikeModel } = userData;

    const sql = `INSERT INTO bookings (serviceId, date, time, clientName, clientEmail, clientPhone, bikeModel) VALUES (?, ?, ?, ?, ?, ?, ?)`;
    const params = [service, date, time, name, email, phone, bikeModel];

    db.run(sql, params, function (err) {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: 'Booking created successfully',
            data: { id: this.lastID, ...req.body }
        });
    });
});

// Update booking (notes or status)
app.patch('/api/bookings/:id', (req, res) => {
    const { adminNotes, completed } = req.body;
    const { id } = req.params;

    let sql = `UPDATE bookings SET `;
    let params = [];
    const updates = [];

    if (adminNotes !== undefined) {
        updates.push(`adminNotes = ?`);
        params.push(adminNotes);
    }

    if (completed !== undefined) {
        updates.push(`completed = ?`);
        params.push(completed ? 1 : 0);
    }

    if (updates.length === 0) {
        return res.status(400).json({ error: 'No fields to update' });
    }

    sql += updates.join(', ') + ` WHERE id = ?`;
    params.push(id);

    db.run(sql, params, function (err) {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: 'Booking updated successfully',
            data: { id, adminNotes, completed },
            changes: this.changes
        });
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
