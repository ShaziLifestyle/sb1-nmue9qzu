/*
  # Fix RLS policies for public access
  
  1. Changes
    - Drop existing policies
    - Create new permissive policies for public access
    - Enable RLS but allow all operations
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Allow public access to agents" ON agents;
DROP POLICY IF EXISTS "Allow public access to tasks" ON tasks;
DROP POLICY IF EXISTS "Allow public access to prompts" ON prompts;

-- Create new permissive policies
CREATE POLICY "Public read agents"
  ON agents FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Public insert agents"
  ON agents FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Public update agents"
  ON agents FOR UPDATE
  TO public
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Public delete agents"
  ON agents FOR DELETE
  TO public
  USING (true);