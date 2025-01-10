/*
  # Remove complete columns

  This migration removes the redundant 'complete' columns from agents, tasks, and prompts tables
  since we're using individual field completion flags instead.

  Changes:
  - Drop 'complete' column from agents table
  - Drop 'complete' column from tasks table
  - Drop 'complete' column from prompts table
*/

-- Remove complete column from agents
ALTER TABLE agents DROP COLUMN IF EXISTS complete;

-- Remove complete column from tasks
ALTER TABLE tasks DROP COLUMN IF EXISTS complete;

-- Remove complete column from prompts
ALTER TABLE prompts DROP COLUMN IF EXISTS complete;