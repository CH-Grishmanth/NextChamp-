import Database from 'sqlite3';
import { logger } from '../utils/logger';
import path from 'path';

let db: Database.Database;

export async function connectDatabase(): Promise<Database.Database> {
  if (db) {
    return db;
  }

  return new Promise((resolve, reject) => {
    const dbPath = path.join(__dirname, '../../database.sqlite');
    
    db = new Database.Database(dbPath, (err) => {
      if (err) {
        logger.error('Failed to connect to SQLite database:', err);
        reject(err);
        return;
      }
      
      logger.info('Connected to SQLite database');
      
      // Create tables
      createTables()
        .then(() => resolve(db))
        .catch(reject);
    });
  });
}

function createTables(): Promise<void> {
  return new Promise((resolve, reject) => {
    const createTablesSQL = `
      -- Users table
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        first_name TEXT NOT NULL,
        last_name TEXT NOT NULL,
        role TEXT DEFAULT 'athlete',
        sport TEXT,
        position TEXT,
        team TEXT,
        date_of_birth DATE,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );

      -- User sessions table
      CREATE TABLE IF NOT EXISTS user_sessions (
        sid TEXT PRIMARY KEY,
        sess TEXT NOT NULL,
        expire DATETIME NOT NULL
      );

      -- Drills table
      CREATE TABLE IF NOT EXISTS drills (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        description TEXT,
        category TEXT NOT NULL,
        difficulty_level TEXT DEFAULT 'beginner',
        instructions TEXT,
        video_url TEXT,
        created_by INTEGER,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (created_by) REFERENCES users(id)
      );

      -- Performances table
      CREATE TABLE IF NOT EXISTS performances (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        drill_id INTEGER NOT NULL,
        video_url TEXT,
        metrics TEXT,
        ai_analysis TEXT,
        score REAL,
        recorded_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id),
        FOREIGN KEY (drill_id) REFERENCES drills(id)
      );

      -- Leaderboard entries table
      CREATE TABLE IF NOT EXISTS leaderboard_entries (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        drill_id INTEGER NOT NULL,
        score REAL NOT NULL,
        rank INTEGER,
        period TEXT DEFAULT 'all-time',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id),
        FOREIGN KEY (drill_id) REFERENCES drills(id)
      );

      -- Notifications table
      CREATE TABLE IF NOT EXISTS notifications (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        type TEXT NOT NULL,
        title TEXT NOT NULL,
        message TEXT,
        read BOOLEAN DEFAULT FALSE,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id)
      );
    `;

    db.exec(createTablesSQL, (err) => {
      if (err) {
        logger.error('Failed to create tables:', err);
        reject(err);
      } else {
        logger.info('Database tables created successfully');
        resolve();
      }
    });
  });
}

export function getDatabase(): Database.Database {
  if (!db) {
    throw new Error('Database not initialized. Call connectDatabase() first.');
  }
  return db;
}

export async function closeDatabase(): Promise<void> {
  if (db) {
    return new Promise((resolve) => {
      db.close((err) => {
        if (err) {
          logger.error('Error closing database:', err);
        } else {
          logger.info('Database connection closed');
        }
        resolve();
      });
    });
  }
}