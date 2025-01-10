/*
  # Add agent role, goal, and backstory fields

  1. Changes
    - Add new columns to agents table:
      - role (text)
      - goal (text)
      - backstory (text)
*/

ALTER TABLE agents 
ADD COLUMN IF NOT EXISTS role text,
ADD COLUMN IF NOT EXISTS goal text,
ADD COLUMN IF NOT EXISTS backstory text;