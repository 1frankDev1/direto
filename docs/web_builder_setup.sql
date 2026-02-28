-- SQL to set up the Web Builder Tool
-- This creates the table needed to store user website configurations.

CREATE TABLE IF NOT EXISTS user_websites (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES directory_users(id) ON DELETE CASCADE UNIQUE,
    config JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS (Optional, depending on your Supabase setup)
-- ALTER TABLE user_websites ENABLE ROW LEVEL SECURITY;
