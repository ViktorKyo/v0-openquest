CREATE TABLE IF NOT EXISTS source_institutions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug VARCHAR(64) NOT NULL,
  name VARCHAR(255) NOT NULL,
  source_type VARCHAR(30) NOT NULL DEFAULT 'community',
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_source_institutions_slug_unique ON source_institutions(slug);
CREATE UNIQUE INDEX IF NOT EXISTS idx_source_institutions_name_unique ON source_institutions(name);
CREATE INDEX IF NOT EXISTS idx_source_institutions_type ON source_institutions(source_type);

CREATE TABLE IF NOT EXISTS problem_sources (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  problem_id UUID NOT NULL REFERENCES problems(id) ON DELETE CASCADE,
  source_institution_id UUID NOT NULL REFERENCES source_institutions(id) ON DELETE CASCADE,
  is_primary BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  UNIQUE(problem_id, source_institution_id)
);

CREATE INDEX IF NOT EXISTS idx_problem_sources_problem ON problem_sources(problem_id);
CREATE INDEX IF NOT EXISTS idx_problem_sources_source ON problem_sources(source_institution_id);
CREATE UNIQUE INDEX IF NOT EXISTS idx_problem_sources_primary_unique
  ON problem_sources(problem_id)
  WHERE is_primary = TRUE;

INSERT INTO source_institutions (slug, name, source_type)
VALUES
  ('yc', 'Y Combinator', 'vc_partner'),
  ('weekend-fund', 'Weekend Fund', 'vc_partner'),
  ('conviction', 'Conviction', 'vc_partner'),
  ('ark-invest', 'ARK Invest', 'vc_partner'),
  ('pathlight-ventures', 'Pathlight Ventures', 'vc_partner'),
  ('accel', 'Accel', 'vc_partner')
ON CONFLICT (slug) DO NOTHING;

INSERT INTO problem_sources (problem_id, source_institution_id, is_primary)
SELECT p.id, s.id, TRUE
FROM problems p
JOIN users u ON u.id = p.author_id
JOIN source_institutions s ON s.name = u.name
WHERE s.source_type = 'vc_partner'
ON CONFLICT (problem_id, source_institution_id) DO NOTHING;
