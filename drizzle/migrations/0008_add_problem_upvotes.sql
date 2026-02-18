CREATE TABLE IF NOT EXISTS problem_upvotes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  problem_id UUID NOT NULL REFERENCES problems(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  UNIQUE(problem_id, user_id)
);

CREATE INDEX IF NOT EXISTS idx_problem_upvotes_problem ON problem_upvotes(problem_id);
CREATE INDEX IF NOT EXISTS idx_problem_upvotes_user ON problem_upvotes(user_id);
