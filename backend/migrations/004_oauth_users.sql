-- Migration 004: Add OAuth support to users table
-- Allows users to authenticate via Google or GitHub OAuth

-- Add OAuth columns to users table
ALTER TABLE users
  ADD COLUMN IF NOT EXISTS oauth_provider VARCHAR(20),
  ADD COLUMN IF NOT EXISTS oauth_provider_id VARCHAR(255),
  ADD COLUMN IF NOT EXISTS name VARCHAR(255),
  ADD COLUMN IF NOT EXISTS avatar_url TEXT;

-- Make password_hash nullable (existing users have passwords, OAuth users won't)
ALTER TABLE users ALTER COLUMN password_hash DROP NOT NULL;

-- Unique constraint for OAuth identification
-- Ensures one OAuth account can only be linked to one user
CREATE UNIQUE INDEX IF NOT EXISTS idx_users_oauth
  ON users(oauth_provider, oauth_provider_id)
  WHERE oauth_provider IS NOT NULL;
