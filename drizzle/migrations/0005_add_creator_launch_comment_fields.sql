-- Creator launch context comment support
ALTER TABLE problems ADD COLUMN IF NOT EXISTS creator_launch_comment_draft TEXT;
ALTER TABLE problems ADD COLUMN IF NOT EXISTS creator_launch_comment_required BOOLEAN NOT NULL DEFAULT FALSE;
ALTER TABLE problems ADD COLUMN IF NOT EXISTS creator_launch_comment_posted_at TIMESTAMP;
ALTER TABLE problems ADD COLUMN IF NOT EXISTS creator_launch_comment_id UUID;

ALTER TABLE comments ADD COLUMN IF NOT EXISTS is_launch_comment BOOLEAN NOT NULL DEFAULT FALSE;

-- Add FK from problems.creator_launch_comment_id to comments.id when missing
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_constraint
    WHERE conname = 'problems_creator_launch_comment_id_fkey'
      AND conrelid = 'problems'::regclass
  ) THEN
    ALTER TABLE problems
      ADD CONSTRAINT problems_creator_launch_comment_id_fkey
      FOREIGN KEY (creator_launch_comment_id)
      REFERENCES comments(id);
  END IF;
END $$;

-- Ensure anonymous submissions cannot require a creator launch comment
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_constraint
    WHERE conname = 'problems_launch_comment_anonymous_check'
      AND conrelid = 'problems'::regclass
  ) THEN
    ALTER TABLE problems
      ADD CONSTRAINT problems_launch_comment_anonymous_check
      CHECK (
        COALESCE(is_anonymous, FALSE) = FALSE
        OR creator_launch_comment_required = FALSE
      );
  END IF;
END $$;

-- Enforce at most one launch comment per problem
CREATE UNIQUE INDEX IF NOT EXISTS idx_comments_one_launch_comment_per_problem
  ON comments(problem_id)
  WHERE is_launch_comment = TRUE;
