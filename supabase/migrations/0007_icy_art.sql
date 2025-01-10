/*
  # Allow public access to tasks

  1. Security Changes
    - Add public access policies for tasks table
    - Allow read/write operations without authentication
*/

-- Create policies for tasks if they don't exist
DO $$ 
BEGIN
    -- Drop existing policies if they exist
    DROP POLICY IF EXISTS "Public read tasks" ON tasks;
    DROP POLICY IF EXISTS "Public insert tasks" ON tasks;
    DROP POLICY IF EXISTS "Public update tasks" ON tasks;
    DROP POLICY IF EXISTS "Public delete tasks" ON tasks;
EXCEPTION
    WHEN undefined_object THEN NULL;
END $$;

-- Create new permissive policies for tasks
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