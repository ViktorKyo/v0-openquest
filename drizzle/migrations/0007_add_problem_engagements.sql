CREATE TABLE IF NOT EXISTS problem_engagements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  problem_id UUID NOT NULL REFERENCES problems(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  type VARCHAR(20) NOT NULL
    CHECK (type IN ('build', 'invest', 'join_team', 'follow')),
  visibility VARCHAR(10) NOT NULL DEFAULT 'public'
    CHECK (visibility IN ('public', 'private')),
  payload JSONB,
  status VARCHAR(20) NOT NULL DEFAULT 'active'
    CHECK (status IN ('active', 'withdrawn')),
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_problem_engagements_problem ON problem_engagements(problem_id);
CREATE INDEX IF NOT EXISTS idx_problem_engagements_user ON problem_engagements(user_id);
CREATE INDEX IF NOT EXISTS idx_problem_engagements_type_status ON problem_engagements(type, status);

CREATE UNIQUE INDEX IF NOT EXISTS idx_problem_engagements_active_unique
  ON problem_engagements(problem_id, user_id, type)
  WHERE status = 'active';
