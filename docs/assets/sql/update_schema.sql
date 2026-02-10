-- SQL for updating the Tragalero Directory Database

-- 1. Add restaurant-specific fields to the businesses table
ALTER TABLE businesses ADD COLUMN IF NOT EXISTS cuid TEXT;
ALTER TABLE businesses ADD COLUMN IF NOT EXISTS ruid TEXT;
ALTER TABLE businesses ADD COLUMN IF NOT EXISTS has_reservation BOOLEAN DEFAULT FALSE;

-- 2. Create the directory_users table for user management
CREATE TABLE IF NOT EXISTS directory_users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT DEFAULT 'User',
    is_active BOOLEAN DEFAULT TRUE,
    max_businesses INTEGER DEFAULT 1,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2b. Add visibility and ownership to businesses table
ALTER TABLE businesses ADD COLUMN IF NOT EXISTS owner_id UUID REFERENCES directory_users(id);
ALTER TABLE businesses ADD COLUMN IF NOT EXISTS is_visible BOOLEAN DEFAULT TRUE;

-- 3. Seed the admin user
-- NOTE: In a production environment, passwords should be hashed.
INSERT INTO directory_users (name, password, role)
VALUES ('Antonio', '123', 'Admin')
ON CONFLICT (name) DO NOTHING;

-- 4. Enable RLS (Optional but recommended)
-- ALTER TABLE directory_users ENABLE ROW LEVEL SECURITY;
-- CREATE POLICY "Admins can do everything" ON directory_users FOR ALL TO anon USING (TRUE);
