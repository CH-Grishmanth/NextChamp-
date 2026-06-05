import bcrypt from 'bcryptjs';
import { Pool } from 'pg';
import { connectDatabase } from '../config/database';
import { logger } from '../utils/logger';

async function seedUsers(pool: Pool): Promise<string[]> {
  const users = [
    {
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'password123',
      avatar_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
    },
    {
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      password: 'password123',
      avatar_url: 'https://images.unsplash.com/photo-1494790108755-2616b9dc9a9b?w=100&h=100&fit=crop&crop=face'
    },
    {
      name: 'Mike Johnson',
      email: 'mike.johnson@example.com',
      password: 'password123',
      avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face'
    },
    {
      name: 'Sarah Wilson',
      email: 'sarah.wilson@example.com',
      password: 'password123',
      avatar_url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face'
    },
    {
      name: 'Alex Chen',
      email: 'alex.chen@example.com',
      password: 'password123',
      avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face'
    }
  ];

  const userIds: string[] = [];

  for (const user of users) {
    const passwordHash = await bcrypt.hash(user.password, 10);
    
    const result = await pool.query(
      `INSERT INTO users (name, email, password_hash, avatar_url) 
       VALUES ($1, $2, $3, $4) 
       ON CONFLICT (email) DO UPDATE SET 
         name = EXCLUDED.name,
         avatar_url = EXCLUDED.avatar_url
       RETURNING id`,
      [user.name, user.email, passwordHash, user.avatar_url]
    );
    
    userIds.push(result.rows[0].id);
    logger.info(`Seeded user: ${user.email}`);
  }

  return userIds;
}

async function seedDrills(pool: Pool): Promise<string[]> {
  const drills = [
    {
      sport: 'football',
      name: 'Basic Dribbling',
      description: 'Learn the fundamentals of ball control and dribbling techniques.',
      type: 'dribbling',
      difficulty: 'beginner',
      reference_video_url: 'https://example.com/videos/basic-dribbling.mp4'
    },
    {
      sport: 'football',
      name: 'Advanced Shooting',
      description: 'Master precision shooting techniques from various angles and distances.',
      type: 'shooting',
      difficulty: 'advanced',
      reference_video_url: 'https://example.com/videos/advanced-shooting.mp4'
    },
    {
      sport: 'football',
      name: 'Agility Sprint',
      description: 'Improve your speed and agility with cone-based sprint exercises.',
      type: 'agility',
      difficulty: 'intermediate',
      reference_video_url: 'https://example.com/videos/agility-sprint.mp4'
    },
    {
      sport: 'football',
      name: 'Passing Accuracy',
      description: 'Develop precise passing skills for short and long-range passes.',
      type: 'passing',
      difficulty: 'intermediate',
      reference_video_url: 'https://example.com/videos/passing-accuracy.mp4'
    },
    {
      sport: 'football',
      name: 'Defensive Positioning',
      description: 'Learn proper defensive stance and positioning techniques.',
      type: 'defense',
      difficulty: 'beginner',
      reference_video_url: 'https://example.com/videos/defensive-positioning.mp4'
    }
  ];

  const drillIds: string[] = [];

  for (const drill of drills) {
    const result = await pool.query(
      `INSERT INTO drills (sport, name, description, type, difficulty, reference_video_url) 
       VALUES ($1, $2, $3, $4, $5, $6) 
       ON CONFLICT DO NOTHING
       RETURNING id`,
      [drill.sport, drill.name, drill.description, drill.type, drill.difficulty, drill.reference_video_url]
    );
    
    if (result.rows.length > 0) {
      drillIds.push(result.rows[0].id);
      logger.info(`Seeded drill: ${drill.name}`);
    } else {
      // If already exists, get the existing ID
      const existingResult = await pool.query(
        `SELECT id FROM drills WHERE name = $1`,
        [drill.name]
      );
      if (existingResult.rows.length > 0) {
        drillIds.push(existingResult.rows[0].id);
      }
    }
  }

  return drillIds;
}

async function seedPerformances(pool: Pool, userIds: string[], drillIds: string[]): Promise<void> {
  const performances = [
    {
      user_id: userIds[0],
      drill_id: drillIds[0],
      video_url: 'https://example.com/videos/performance-1.mp4',
      metrics: {
        accuracy: 75,
        speed: 8,
        posture: 6.5
      },
      feedback: 'Great improvement in ball control! Work on maintaining balance during quick direction changes.',
      badge: 'Rising Star',
      overall_score: 73.5
    },
    {
      user_id: userIds[1],
      drill_id: drillIds[1],
      video_url: 'https://example.com/videos/performance-2.mp4',
      metrics: {
        accuracy: 88,
        speed: 9,
        posture: 8.5
      },
      feedback: 'Excellent shooting form and accuracy. Your follow-through technique is spot on!',
      badge: 'Sharpshooter',
      overall_score: 85.0
    },
    {
      user_id: userIds[2],
      drill_id: drillIds[2],
      video_url: 'https://example.com/videos/performance-3.mp4',
      metrics: {
        accuracy: 82,
        speed: 9.5,
        posture: 7.8
      },
      feedback: 'Outstanding agility and speed! Focus on maintaining proper form at high speeds.',
      badge: 'Speed Demon',
      overall_score: 86.5
    }
  ];

  for (const performance of performances) {
    await pool.query(
      `INSERT INTO performances (user_id, drill_id, video_url, metrics, feedback, badge, overall_score) 
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       ON CONFLICT DO NOTHING`,
      [
        performance.user_id,
        performance.drill_id,
        performance.video_url,
        JSON.stringify(performance.metrics),
        performance.feedback,
        performance.badge,
        performance.overall_score
      ]
    );
    
    logger.info(`Seeded performance for user ${performance.user_id}`);
  }
}

async function seedLeaderboard(pool: Pool, userIds: string[], drillIds: string[]): Promise<void> {
  const leaderboardEntries = [
    { user_id: userIds[1], drill_id: drillIds[1], score: 95.5, school: 'Stanford University' },
    { user_id: userIds[2], drill_id: drillIds[2], score: 92.3, school: 'UCLA' },
    { user_id: userIds[3], drill_id: drillIds[0], score: 89.7, school: 'UC Berkeley' },
    { user_id: userIds[0], drill_id: drillIds[0], score: 87.2, school: 'USC' },
    { user_id: userIds[4], drill_id: drillIds[1], score: 84.9, school: 'MIT' },
    { user_id: userIds[1], drill_id: drillIds[2], score: 82.1, school: 'Stanford University' },
    { user_id: userIds[3], drill_id: drillIds[1], score: 79.8, school: 'UC Berkeley' },
    { user_id: userIds[2], drill_id: drillIds[0], score: 77.4, school: 'UCLA' }
  ];

  for (const entry of leaderboardEntries) {
    await pool.query(
      `INSERT INTO leaderboard_entries (user_id, drill_id, score, school) 
       VALUES ($1, $2, $3, $4)
       ON CONFLICT (user_id, drill_id) DO UPDATE SET
         score = EXCLUDED.score,
         school = EXCLUDED.school`,
      [entry.user_id, entry.drill_id, entry.score, entry.school]
    );
  }
  
  logger.info('Seeded leaderboard entries');
}

async function seedNotifications(pool: Pool, userIds: string[]): Promise<void> {
  const notifications = [
    {
      user_id: userIds[0],
      text: 'Your performance analysis for Basic Dribbling is ready!',
      read: false
    },
    {
      user_id: userIds[0],
      text: 'You earned the "Rising Star" badge! Keep up the great work.',
      read: true
    },
    {
      user_id: userIds[1],
      text: 'New drill available: Advanced Shooting Techniques',
      read: false
    }
  ];

  for (const notification of notifications) {
    await pool.query(
      `INSERT INTO notifications (user_id, text, read) 
       VALUES ($1, $2, $3)
       ON CONFLICT DO NOTHING`,
      [notification.user_id, notification.text, notification.read]
    );
  }
  
  logger.info('Seeded notifications');
}

async function seed(): Promise<void> {
  try {
    logger.info('Starting database seeding...');
    const pool = await connectDatabase();
    
    // Clear existing data in reverse dependency order
    await pool.query('DELETE FROM notifications');
    await pool.query('DELETE FROM leaderboard_entries');
    await pool.query('DELETE FROM performances');
    await pool.query('DELETE FROM uploads');
    await pool.query('DELETE FROM drills');
    await pool.query('DELETE FROM users');
    
    logger.info('Cleared existing data');
    
    // Seed data in dependency order
    const userIds = await seedUsers(pool);
    const drillIds = await seedDrills(pool);
    await seedPerformances(pool, userIds, drillIds);
    await seedLeaderboard(pool, userIds, drillIds);
    await seedNotifications(pool, userIds);
    
    logger.info('Database seeding completed successfully');
    process.exit(0);
  } catch (error) {
    logger.error('Seeding failed:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  seed();
}