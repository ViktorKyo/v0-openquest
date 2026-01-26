-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- USERS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) NOT NULL UNIQUE,
  name VARCHAR(255),
  avatar_url TEXT,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL,
  last_login_at TIMESTAMP,

  -- Moderation fields
  is_suspended BOOLEAN DEFAULT false,
  is_banned BOOLEAN DEFAULT false,
  ban_reason TEXT,
  suspended_at TIMESTAMP,
  banned_at TIMESTAMP
);

-- ============================================
-- PROBLEMS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS problems (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(500) NOT NULL,
  elevator_pitch TEXT NOT NULL,
  full_description TEXT NOT NULL,
  category VARCHAR(100) NOT NULL,
  industry_tags JSONB,

  -- Author info
  author_id UUID REFERENCES users(id),
  is_anonymous BOOLEAN DEFAULT false,

  -- Status
  status VARCHAR(20) NOT NULL DEFAULT 'pending_review'
    CHECK (status IN ('pending_review', 'published', 'rejected', 'archived', 'being_built', 'solved')),

  -- Engagement metrics
  upvotes INTEGER DEFAULT 0,
  comment_count INTEGER DEFAULT 0,
  builder_count INTEGER DEFAULT 0,
  investor_count INTEGER DEFAULT 0,

  -- Timestamps
  created_at TIMESTAMP DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP DEFAULT NOW() NOT NULL,
  published_at TIMESTAMP
);

-- ============================================
-- ADMIN USERS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  admin_id VARCHAR(32) NOT NULL UNIQUE,
  name VARCHAR(255),
  email VARCHAR(255),
  role VARCHAR(20) NOT NULL
    CHECK (role IN ('super_admin', 'moderator', 'analyst')),

  is_active BOOLEAN DEFAULT true,
  created_by UUID REFERENCES admin_users(id),
  created_at TIMESTAMP DEFAULT NOW() NOT NULL,
  last_login TIMESTAMP
);

-- ============================================
-- ADMIN ACTIONS TABLE (Audit Log)
-- ============================================
CREATE TABLE IF NOT EXISTS admin_actions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  admin_id UUID REFERENCES admin_users(id) NOT NULL,
  action_type VARCHAR(50) NOT NULL,
  target_type VARCHAR(20) NOT NULL,
  target_id UUID NOT NULL,
  notes TEXT,
  metadata JSONB,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL
);

-- ============================================
-- PROBLEM MODERATION TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS problem_moderation (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  problem_id UUID REFERENCES problems(id) NOT NULL,
  reviewed_by UUID REFERENCES admin_users(id) NOT NULL,
  status VARCHAR(20) NOT NULL
    CHECK (status IN ('approved', 'rejected')),

  admin_notes TEXT,
  rejection_reason TEXT,
  reviewed_at TIMESTAMP DEFAULT NOW() NOT NULL
);

-- ============================================
-- INDEXES
-- ============================================
CREATE INDEX idx_problems_status ON problems(status);
CREATE INDEX idx_problems_author ON problems(author_id);
CREATE INDEX idx_problems_created_at ON problems(created_at DESC);

CREATE INDEX idx_admin_actions_admin ON admin_actions(admin_id);
CREATE INDEX idx_admin_actions_date ON admin_actions(created_at DESC);

CREATE INDEX idx_problem_moderation_problem ON problem_moderation(problem_id);
CREATE INDEX idx_problem_moderation_admin ON problem_moderation(reviewed_by);
