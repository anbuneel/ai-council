-- Migration 011: Add key version tracking for encryption key rotation
-- Tracks which encryption key version was used, enabling audit and lazy re-encryption

-- Add key_version to user_api_keys table (legacy API key storage)
ALTER TABLE user_api_keys ADD COLUMN IF NOT EXISTS key_version INTEGER DEFAULT 1;
CREATE INDEX IF NOT EXISTS idx_user_api_keys_key_version ON user_api_keys(key_version);
COMMENT ON COLUMN user_api_keys.key_version IS 'Encryption key version (1 = original, increments on rotation)';

-- Add key_version to users table for BYOK keys
ALTER TABLE users ADD COLUMN IF NOT EXISTS byok_key_version INTEGER DEFAULT 1;
COMMENT ON COLUMN users.byok_key_version IS 'BYOK encryption key version (1 = original, increments on rotation)';
