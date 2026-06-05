import { Pool } from 'pg';
import { connectDatabase } from '../config/database';
import { logger } from '../utils/logger';

async function createTables(pool: Pool): Promise<void> {
  const queries = [
    // Users table
    `CREATE TABLE IF NOT EXISTS users (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      password_hash VARCHAR(255) NOT NULL,
      avatar_url TEXT,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );`,

    // Drills table
    `CREATE TABLE IF NOT EXISTS drills (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      sport VARCHAR(50) NOT NULL CHECK (sport IN ('football', 'basketball', 'soccer', 'tennis')),
      name VARCHAR(255) NOT NULL,
      description TEXT,
      reference_video_url TEXT,
      type VARCHAR(50) NOT NULL CHECK (type IN ('dribbling', 'shooting', 'agility', 'passing', 'defense')),
      difficulty VARCHAR(20) NOT NULL CHECK (difficulty IN ('beginner', 'intermediate', 'advanced')) DEFAULT 'beginner',
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );`,

    // Uploads table
    `CREATE TABLE IF NOT EXISTS uploads (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      user_id UUID REFERENCES users(id) ON DELETE CASCADE,
      filename VARCHAR(255) NOT NULL,
      original_name VARCHAR(255) NOT NULL,
      file_path TEXT NOT NULL,
      file_url TEXT NOT NULL,
      mime_type VARCHAR(100) NOT NULL,
      file_size BIGINT NOT NULL,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );`,

    // Performances table
    `CREATE TABLE IF NOT EXISTS performances (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      drill_id UUID NOT NULL REFERENCES drills(id) ON DELETE CASCADE,
      video_url TEXT NOT NULL,
      metrics JSONB NOT NULL DEFAULT '{}',
      feedback TEXT,
      badge VARCHAR(100),
      overall_score DECIMAL(4,2) NOT NULL DEFAULT 0.00,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      CONSTRAINT valid_score CHECK (overall_score >= 0 AND overall_score <= 100)
    );`,

    // Leaderboard entries table
    `CREATE TABLE IF NOT EXISTS leaderboard_entries (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      drill_id UUID NOT NULL REFERENCES drills(id) ON DELETE CASCADE,
      score DECIMAL(4,2) NOT NULL,
      school VARCHAR(255),
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      CONSTRAINT valid_leaderboard_score CHECK (score >= 0 AND score <= 100),
      UNIQUE(user_id, drill_id)
    );`,

    // Notifications table
    `CREATE TABLE IF NOT EXISTS notifications (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      text TEXT NOT NULL,
      read BOOLEAN NOT NULL DEFAULT FALSE,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );`,

    // Indexes for better performance
    `CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);`,
    `CREATE INDEX IF NOT EXISTS idx_drills_sport ON drills(sport);`,
    `CREATE INDEX IF NOT EXISTS idx_drills_type ON drills(type);`,
    `CREATE INDEX IF NOT EXISTS idx_performances_user_id ON performances(user_id);`,
    `CREATE INDEX IF NOT EXISTS idx_performances_drill_id ON performances(drill_id);`,
    `CREATE INDEX IF NOT EXISTS idx_performances_created_at ON performances(created_at);`,
    `CREATE INDEX IF NOT EXISTS idx_leaderboard_drill_id ON leaderboard_entries(drill_id);`,
    `CREATE INDEX IF NOT EXISTS idx_leaderboard_score ON leaderboard_entries(score DESC);`,
    `CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON notifications(user_id);`,
    `CREATE INDEX IF NOT EXISTS idx_notifications_read ON notifications(read);`,
    `CREATE INDEX IF NOT EXISTS idx_uploads_user_id ON uploads(user_id);`,

    // Update triggers for updated_at columns
    `CREATE OR REPLACE FUNCTION update_updated_at_column()
    RETURNS TRIGGER AS $$
    BEGIN
        NEW.updated_at = NOW();
        RETURN NEW;
    END;
    $$ language 'plpgsql';`,

    `DROP TRIGGER IF EXISTS update_users_updated_at ON users;
    CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();`,

    `DROP TRIGGER IF EXISTS update_drills_updated_at ON drills;
    CREATE TRIGGER update_drills_updated_at BEFORE UPDATE ON drills FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();`,

    `DROP TRIGGER IF EXISTS update_performances_updated_at ON performances;
    CREATE TRIGGER update_performances_updated_at BEFORE UPDATE ON performances FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();`,

    `DROP TRIGGER IF EXISTS update_leaderboard_entries_updated_at ON leaderboard_entries;
    CREATE TRIGGER update_leaderboard_entries_updated_at BEFORE UPDATE ON leaderboard_entries FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();`,

    `DROP TRIGGER IF EXISTS update_notifications_updated_at ON notifications;
    CREATE TRIGGER update_notifications_updated_at BEFORE UPDATE ON notifications FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();`
  ];

  for (const query of queries) {
    try {
      await pool.query(query);
      logger.info('Executed migration query successfully');
    } catch (error) {
      logger.error('Failed to execute migration query:', error);
      throw error;
    }
  }
}

async function migrate(): Promise<void> {
  try {
    logger.info('Starting database migration...');
    const pool = await connectDatabase();
    
    await createTables(pool);
    
    logger.info('Database migration completed successfully');
    process.exit(0);
  } catch (error) {
    logger.error('Migration failed:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  migrate();
}