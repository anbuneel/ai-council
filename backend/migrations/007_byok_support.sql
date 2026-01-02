-- Migration: 007_byok_support.sql
-- Description: Add support for Bring Your Own Key (BYOK) alongside credits

-- Add column for user's own OpenRouter API key (encrypted)
-- When set, this key is used instead of the provisioned key
-- and no balance checks are performed
ALTER TABLE users ADD COLUMN IF NOT EXISTS byok_api_key TEXT;

-- Add column to track when BYOK key was last validated
ALTER TABLE users ADD COLUMN IF NOT EXISTS byok_validated_at TIMESTAMP WITH TIME ZONE;
