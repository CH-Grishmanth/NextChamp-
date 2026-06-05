export interface User {
  id: string;
  name: string;
  email: string;
  password_hash: string;
  avatar_url?: string;
  created_at: Date;
  updated_at: Date;
}

export interface Drill {
  id: string;
  sport: 'football' | 'basketball' | 'soccer' | 'tennis';
  name: string;
  description: string;
  reference_video_url?: string;
  type: 'dribbling' | 'shooting' | 'agility' | 'passing' | 'defense';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  created_at: Date;
  updated_at: Date;
}

export interface Performance {
  id: string;
  user_id: string;
  drill_id: string;
  video_url: string;
  metrics: {
    accuracy: number;
    speed: number;
    posture: number;
  };
  feedback: string;
  badge?: string;
  overall_score: number;
  created_at: Date;
  updated_at: Date;
}

export interface LeaderboardEntry {
  id: string;
  user_id: string;
  drill_id: string;
  score: number;
  school?: string;
  created_at: Date;
  updated_at: Date;
}

export interface Notification {
  id: string;
  user_id: string;
  text: string;
  read: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface Upload {
  id: string;
  user_id: string;
  filename: string;
  original_name: string;
  file_path: string;
  file_url: string;
  mime_type: string;
  file_size: number;
  created_at: Date;
}