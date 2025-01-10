/*
  # Remove duplicate tasks and add unique constraint

  1. Changes
    - Remove duplicate tasks keeping only the most recently created one
    - Add unique constraint to prevent future duplicates
*/

-- Create a temporary table to store the tasks we want to keep
CREATE TEMP TABLE tasks_to_keep AS
SELECT DISTINCT ON (name, agent_id) id
FROM tasks
ORDER BY name, agent_id, created_at DESC;

-- Delete duplicate tasks, keeping only the most recent ones
DELETE FROM tasks
WHERE id NOT IN (SELECT id FROM tasks_to_keep);

-- Drop the temporary table
DROP TABLE tasks_to_keep;

-- Now we can safely add the unique constraint
ALTER TABLE tasks 
ADD CONSTRAINT tasks_name_agent_id_key UNIQUE (name, agent_id);