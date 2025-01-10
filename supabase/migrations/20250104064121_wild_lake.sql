/*
  # Add Agent Process Field
  
  1. New Fields
    - `agent_process` text field for storing the combined agent data
  
  2. Changes
    - Add nullable agent_process column to agents table
*/

ALTER TABLE agents 
ADD COLUMN IF NOT EXISTS agent_process text;