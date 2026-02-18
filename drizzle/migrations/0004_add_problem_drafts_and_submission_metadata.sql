-- Add draft/submission lifecycle and metadata columns to problems
ALTER TABLE problems ADD COLUMN IF NOT EXISTS forked_from_problem_id TEXT;
ALTER TABLE problems ADD COLUMN IF NOT EXISTS involvement VARCHAR(30);
ALTER TABLE problems ADD COLUMN IF NOT EXISTS want_build_blocker VARCHAR(30);
ALTER TABLE problems ADD COLUMN IF NOT EXISTS already_building_support JSONB;
ALTER TABLE problems ADD COLUMN IF NOT EXISTS want_to_work_involvement VARCHAR(30);
ALTER TABLE problems ADD COLUMN IF NOT EXISTS deck_type VARCHAR(10);
ALTER TABLE problems ADD COLUMN IF NOT EXISTS deck_link TEXT;
ALTER TABLE problems ADD COLUMN IF NOT EXISTS draft_updated_at TIMESTAMP;
ALTER TABLE problems ADD COLUMN IF NOT EXISTS submitted_at TIMESTAMP;
ALTER TABLE problems ADD COLUMN IF NOT EXISTS submission_version INTEGER NOT NULL DEFAULT 1;

-- Ensure status constraint supports drafts and approved statuses
DO $$
DECLARE
  c_name TEXT;
BEGIN
  SELECT conname INTO c_name
  FROM pg_constraint
  WHERE conrelid = 'problems'::regclass
    AND contype = 'c'
    AND pg_get_constraintdef(oid) ILIKE '%status%';

  IF c_name IS NOT NULL THEN
    EXECUTE format('ALTER TABLE problems DROP CONSTRAINT %I', c_name);
  END IF;

  ALTER TABLE problems
    ADD CONSTRAINT problems_status_check
    CHECK (
      status IN (
        'draft',
        'pending_review',
        'approved',
        'published',
        'rejected',
        'archived',
        'being_built',
        'solved'
      )
    );
END $$;

-- Indexes for draft workflows
CREATE INDEX IF NOT EXISTS idx_problems_author_status_updated_at ON problems(author_id, status, updated_at DESC);
CREATE INDEX IF NOT EXISTS idx_problems_status_created_at ON problems(status, created_at DESC);
