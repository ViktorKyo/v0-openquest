-- Add authentication fields to users table
ALTER TABLE users ADD COLUMN IF NOT EXISTS password_hash VARCHAR(255);
ALTER TABLE users ADD COLUMN IF NOT EXISTS password_reset_token VARCHAR(255);
ALTER TABLE users ADD COLUMN IF NOT EXISTS password_reset_expires TIMESTAMP;

-- Add missing suspension fields (for consistency with schema)
ALTER TABLE users ADD COLUMN IF NOT EXISTS suspended_until TIMESTAMP;
ALTER TABLE users ADD COLUMN IF NOT EXISTS suspension_reason TEXT;
