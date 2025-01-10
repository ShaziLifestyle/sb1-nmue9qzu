/*
  # Update constraints and policies safely
  
  1. Changes
    - Drop and recreate name constraints
    - Ensure policies are dropped before recreation
    - Add safety checks for existing objects
*/

-- Safely handle name constraints
DO $$ 
BEGIN
    -- Drop existing constraints if they exist
    ALTER TABLE agents DROP CONSTRAINT IF EXISTS agents_name_key;
    ALTER TABLE agents DROP CONSTRAINT IF EXISTS agents_name_user_id_key;
    ALTER TABLE agents DROP CONSTRAINT IF EXISTS agents_name_unique;
EXCEPTION
    WHEN undefined_object THEN NULL;
END $$;

-- Drop existing policies if they exist
DO $$ 
BEGIN
    DROP POLICY IF EXISTS "Allow public access to agents" ON agents;
    DROP POLICY IF EXISTS "Allow public access to tasks" ON tasks;
    DROP POLICY IF EXISTS "Allow public access to prompts" ON prompts;
EXCEPTION
    WHEN undefined_object THEN NULL;
END $$;

-- Ensure user_id is nullable
DO $$ 
BEGIN
    ALTER TABLE agents ALTER COLUMN user_id DROP NOT NULL;
    ALTER TABLE tasks ALTER COLUMN user_id DROP NOT NULL;
    ALTER TABLE prompts ALTER COLUMN user_id DROP NOT NULL;
EXCEPTION
    WHEN undefined_object THEN NULL;
END $$;

-- Create new unique constraint for agent names
ALTER TABLE agents ADD CONSTRAINT agents_name_unique UNIQUE (name);