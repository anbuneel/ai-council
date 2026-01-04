-- Migration 013: Enable Row Level Security on all tables
--
-- This adds defense-in-depth security. Even though the app uses a backend API
-- with a service role connection (which bypasses RLS), enabling RLS prevents
-- direct access via Supabase's PostgREST API using the public anon key.
--
-- The service role used by the backend bypasses RLS automatically.

-- Enable RLS on all application tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE stage1_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE stage2_rankings ENABLE ROW LEVEL SECURITY;
ALTER TABLE stage3_synthesis ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_api_keys ENABLE ROW LEVEL SECURITY;
ALTER TABLE credit_packs ENABLE ROW LEVEL SECURITY;
ALTER TABLE credit_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE deposit_options ENABLE ROW LEVEL SECURITY;
ALTER TABLE query_costs ENABLE ROW LEVEL SECURITY;
ALTER TABLE schema_migrations ENABLE ROW LEVEL SECURITY;

-- Create restrictive policies that deny all access via anon/authenticated roles
-- The service role (used by backend) bypasses RLS entirely

-- Users table: no direct access
CREATE POLICY "Deny all access" ON users FOR ALL USING (false);

-- Conversations table: no direct access
CREATE POLICY "Deny all access" ON conversations FOR ALL USING (false);

-- Messages table: no direct access
CREATE POLICY "Deny all access" ON messages FOR ALL USING (false);

-- Stage tables: no direct access
CREATE POLICY "Deny all access" ON stage1_responses FOR ALL USING (false);
CREATE POLICY "Deny all access" ON stage2_rankings FOR ALL USING (false);
CREATE POLICY "Deny all access" ON stage3_synthesis FOR ALL USING (false);

-- API keys table: no direct access (contains encrypted keys)
CREATE POLICY "Deny all access" ON user_api_keys FOR ALL USING (false);

-- Billing tables: no direct access
CREATE POLICY "Deny all access" ON credit_packs FOR ALL USING (false);
CREATE POLICY "Deny all access" ON credit_transactions FOR ALL USING (false);
CREATE POLICY "Deny all access" ON deposit_options FOR ALL USING (false);
CREATE POLICY "Deny all access" ON query_costs FOR ALL USING (false);

-- Schema migrations: no direct access
CREATE POLICY "Deny all access" ON schema_migrations FOR ALL USING (false);
