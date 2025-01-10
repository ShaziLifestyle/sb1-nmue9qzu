/*
  # Update database schema for public access
  
  1. Changes
    - Remove user_id requirement from all tables
    - Update RLS policies to allow public access
    - Simplify unique constraint on agent names
*/

-- Remove user_id requirement
ALTER TABLE agents ALTER COLUMN user_id DROP NOT NULL;
ALTER TABLE tasks ALTER COLUMN user_id DROP NOT NULL;
ALTER TABLE prompts ALTER COLUMN user_id DROP NOT NULL;

-- Drop existing policies
DROP POLICY IF EXISTS "Users can perform all actions on their agents" ON agents;
DROP POLICY IF EXISTS "Users can perform all actions on their tasks" ON tasks;
DROP POLICY IF EXISTS "Users can perform all actions on their prompts" ON prompts;

-- Create new public access policies
CREATE POLICY "Allow public access to agents"
  ON agents FOR ALL
  TO public
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow public access to tasks"
  ON tasks FOR ALL
  TO public
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow public access to prompts"
  ON prompts FOR ALL
  TO public
  USING (true)
  WITH CHECK (true);

-- Update unique constraint to only consider name
ALTER TABLE agents DROP CONSTRAINT IF EXISTS agents_name_key;
ALTER TABLE agents ADD CONSTRAINT agents_name_key UNIQUE (name);