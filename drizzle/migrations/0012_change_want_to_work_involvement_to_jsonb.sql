-- Convert want_to_work_involvement from varchar to jsonb array
-- Existing single values like 'volunteer' become '["volunteer"]'
-- NULL values become '[]'
ALTER TABLE problems
  ALTER COLUMN want_to_work_involvement TYPE jsonb
  USING CASE
    WHEN want_to_work_involvement IS NOT NULL
    THEN jsonb_build_array(want_to_work_involvement)
    ELSE '[]'::jsonb
  END;
