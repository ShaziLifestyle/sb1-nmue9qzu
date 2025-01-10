/*
  # Fix RLS policies for tasks and prompts

  1. Changes
    - Add public access policies for tasks table
    - Add public access policies for prompts table

  2. Security
    - Enable public read/write access to tasks
    - Enable public read/write access to prompts
*/

-- Drop existing policies for tasks and prompts if they exist
DROP POLICY IF EXISTS "Allow public access to tasks" ON tasks;
DROP POLICY IF EXISTS "Allow public access to prompts" ON prompts;

-- Create policies for tasks
CREATE POLICY "Public read tasks"
  ON tasks FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Public insert tasks"
  ON tasks FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Public update tasks"
  ON tasks FOR UPDATE
  TO public
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Public delete tasks"
  ON tasks FOR DELETE
  TO public
  USING (true);

-- Create policies for prompts
CREATE POLICY "Public read prompts"
  ON prompts FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Public insert prompts"
  ON prompts FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Public update prompts"
  ON prompts FOR UPDATE
  TO public
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Public delete prompts"
  ON prompts FOR DELETE
  TO public
  USING (true);