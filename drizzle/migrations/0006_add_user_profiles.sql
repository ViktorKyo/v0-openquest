CREATE TABLE IF NOT EXISTS user_profiles (
  user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  headline VARCHAR(120),
  bio TEXT,
  location VARCHAR(120),
  timezone VARCHAR(64),
  linkedin_url TEXT,
  twitter_url TEXT,
  website_url TEXT,
  profile_visibility_default VARCHAR(10) NOT NULL DEFAULT 'public'
    CHECK (profile_visibility_default IN ('public', 'private')),
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_user_profiles_visibility ON user_profiles(profile_visibility_default);
