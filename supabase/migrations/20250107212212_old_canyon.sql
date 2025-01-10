/*
  # Add completion fields
  
  1. New Columns
    - Add `complete` boolean column to agents, tasks, and prompts tables
    - Set default value to false
    - Make column non-nullable
  
  2. Changes
    - Add completion status tracking to all main tables
*/

-- Add complete column to agents
ALTER TABLE agents
ADD COLUMN IF NOT EXISTS complete boolean NOT NULL DEFAULT false;

-- Add complete column to tasks
ALTER TABLE tasks
ADD COLUMN IF NOT EXISTS complete boolean NOT NULL DEFAULT false;

-- Add complete column to prompts
ALTER TABLE prompts
ADD COLUMN IF NOT EXISTS complete boolean NOT NULL DEFAULT false;