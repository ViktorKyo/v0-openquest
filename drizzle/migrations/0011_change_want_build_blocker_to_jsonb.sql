-- Change want_build_blocker from varchar to jsonb array to support multi-select
-- Migrate existing single values to single-element arrays

-- Step 1: Add a temporary column
ALTER TABLE problems ADD COLUMN want_build_blocker_new JSONB DEFAULT '[]'::jsonb;

-- Step 2: Migrate existing data (single string → single-element array)
UPDATE problems
SET want_build_blocker_new = CASE
  WHEN want_build_blocker IS NOT NULL AND want_build_blocker != ''
    THEN jsonb_build_array(want_build_blocker)
  ELSE '[]'::jsonb
END;

-- Step 3: Drop old column and rename new one
ALTER TABLE problems DROP COLUMN want_build_blocker;
ALTER TABLE problems RENAME COLUMN want_build_blocker_new TO want_build_blocker;
