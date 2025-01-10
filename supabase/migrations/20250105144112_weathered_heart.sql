/*
  # Schema Update with Safe Policy Creation

  1. Tables
    - agents
    - tasks
    - prompts
    - prompt_results

  2. Changes
    - Add new columns to agents table
    - Create tables if they don't exist
    - Safely handle policy creation
*/

-- Create tables if they don't exist
CREATE TABLE IF NOT EXISTS agents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  role text,
  goal text,
  backstory text,
  "order" integer NOT NULL DEFAULT 1,
  agent_process text,
  prompt_result text,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS tasks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  agent_id uuid REFERENCES agents ON DELETE CASCADE NOT NULL,
  name text NOT NULL,
  description text,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS prompts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  task_id uuid REFERENCES tasks ON DELETE CASCADE NOT NULL,
  content text NOT NULL,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS prompt_results (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  prompt_id uuid REFERENCES prompts ON DELETE CASCADE NOT NULL,
  content text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS if not already enabled
DO $$ 
BEGIN
  ALTER TABLE agents ENABLE ROW LEVEL SECURITY;
  ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
  ALTER TABLE prompts ENABLE ROW LEVEL SECURITY;
  ALTER TABLE prompt_results ENABLE ROW LEVEL SECURITY;
EXCEPTION
  WHEN others THEN NULL;
END $$;

-- Safely create policies
DO $$ 
BEGIN
  -- Drop existing policies if they exist
  DROP POLICY IF EXISTS "Public read agents" ON agents;
  DROP POLICY IF EXISTS "Public insert agents" ON agents;
  DROP POLICY IF EXISTS "Public update agents" ON agents;
  DROP POLICY IF EXISTS "Public delete agents" ON agents;
  
  DROP POLICY IF EXISTS "Public read tasks" ON tasks;
  DROP POLICY IF EXISTS "Public insert tasks" ON tasks;
  DROP POLICY IF EXISTS "Public update tasks" ON tasks;
  DROP POLICY IF EXISTS "Public delete tasks" ON tasks;
  
  DROP POLICY IF EXISTS "Public read prompts" ON prompts;
  DROP POLICY IF EXISTS "Public insert prompts" ON prompts;
  DROP POLICY IF EXISTS "Public update prompts" ON prompts;
  DROP POLICY IF EXISTS "Public delete prompts" ON prompts;
  
  DROP POLICY IF EXISTS "Public read prompt_results" ON prompt_results;
  DROP POLICY IF EXISTS "Public insert prompt_results" ON prompt_results;
  DROP POLICY IF EXISTS "Public update prompt_results" ON prompt_results;
  DROP POLICY IF EXISTS "Public delete prompt_results" ON prompt_results;
EXCEPTION
  WHEN undefined_object THEN NULL;
END $$;

-- Create new policies
CREATE POLICY "Public read agents" ON agents FOR SELECT TO public USING (true);
CREATE POLICY "Public insert agents" ON agents FOR INSERT TO public WITH CHECK (true);
CREATE POLICY "Public update agents" ON agents FOR UPDATE TO public USING (true) WITH CHECK (true);
CREATE POLICY "Public delete agents" ON agents FOR DELETE TO public USING (true);

CREATE POLICY "Public read tasks" ON tasks FOR SELECT TO public USING (true);
CREATE POLICY "Public insert tasks" ON tasks FOR INSERT TO public WITH CHECK (true);
CREATE POLICY "Public update tasks" ON tasks FOR UPDATE TO public USING (true) WITH CHECK (true);
CREATE POLICY "Public delete tasks" ON tasks FOR DELETE TO public USING (true);

CREATE POLICY "Public read prompts" ON prompts FOR SELECT TO public USING (true);
CREATE POLICY "Public insert prompts" ON prompts FOR INSERT TO public WITH CHECK (true);
CREATE POLICY "Public update prompts" ON prompts FOR UPDATE TO public USING (true) WITH CHECK (true);
CREATE POLICY "Public delete prompts" ON prompts FOR DELETE TO public USING (true);

CREATE POLICY "Public read prompt_results" ON prompt_results FOR SELECT TO public USING (true);
CREATE POLICY "Public insert prompt_results" ON prompt_results FOR INSERT TO public WITH CHECK (true);
CREATE POLICY "Public update prompt_results" ON prompt_results FOR UPDATE TO public USING (true) WITH CHECK (true);
CREATE POLICY "Public delete prompt_results" ON prompt_results FOR DELETE TO public USING (true);

-- Add constraints if they don't exist
DO $$ 
BEGIN
  ALTER TABLE agents ADD CONSTRAINT agents_name_unique UNIQUE (name);
EXCEPTION
  WHEN duplicate_table THEN NULL;
END $$;

DO $$ 
BEGIN
  ALTER TABLE tasks ADD CONSTRAINT tasks_name_agent_id_key UNIQUE (name, agent_id);
EXCEPTION
  WHEN duplicate_table THEN NULL;
END $$;