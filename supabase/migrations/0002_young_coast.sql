/*
  # Add Unique Constraint for Agent Names

  1. Changes
    - Add unique constraint on agent names to prevent duplicates
    
  2. Notes
    - Initial data seeding is handled by the application layer
    - Maintains existing RLS policies
*/

-- Add unique constraint to name column
ALTER TABLE agents ADD CONSTRAINT agents_name_key UNIQUE (name, user_id);