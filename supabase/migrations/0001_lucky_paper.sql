/*
  # AI Agent Management System Schema

  1. New Tables
    - `agents`
      - `id` (uuid, primary key)
      - `name` (text)
      - `description` (text)
      - `created_at` (timestamp)
      - `user_id` (uuid, references auth.users)
    
    - `tasks`
      - `id` (uuid, primary key)
      - `agent_id` (uuid, references agents)
      - `name` (text)
      - `description` (text)
      - `created_at` (timestamp)
      - `user_id` (uuid, references auth.users)
    
    - `prompts`
      - `id` (uuid, primary key)
      - `task_id` (uuid, references tasks)
      - `content` (text)
      - `created_at` (timestamp)
      - `user_id` (uuid, references auth.users)

  2. Security
    - Enable RLS on all tables
    - Add policies for CRUD operations
*/

-- Create agents table
CREATE TABLE IF NOT EXISTS agents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  created_at timestamptz DEFAULT now(),
  user_id uuid REFERENCES auth.users NOT NULL
);

ALTER TABLE agents ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can perform all actions on their agents"
  ON agents
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Create tasks table
CREATE TABLE IF NOT EXISTS tasks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  agent_id uuid REFERENCES agents ON DELETE CASCADE NOT NULL,
  name text NOT NULL,
  description text,
  created_at timestamptz DEFAULT now(),
  user_id uuid REFERENCES auth.users NOT NULL
);

ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can perform all actions on their tasks"
  ON tasks
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Create prompts table
CREATE TABLE IF NOT EXISTS prompts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  task_id uuid REFERENCES tasks ON DELETE CASCADE NOT NULL,
  content text NOT NULL,
  created_at timestamptz DEFAULT now(),
  user_id uuid REFERENCES auth.users NOT NULL
);

ALTER TABLE prompts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can perform all actions on their prompts"
  ON prompts
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);