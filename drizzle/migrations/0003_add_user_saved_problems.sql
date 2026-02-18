-- User Saved Problems table (bookmarks)
CREATE TABLE IF NOT EXISTS user_saved_problems (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  problem_id UUID NOT NULL REFERENCES problems(id) ON DELETE CASCADE,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, problem_id)
);

-- Indexes for efficient lookups
CREATE INDEX IF NOT EXISTS idx_user_saved_problems_user_id ON user_saved_problems(user_id);
CREATE INDEX IF NOT EXISTS idx_user_saved_problems_problem_id ON user_saved_problems(problem_id);
