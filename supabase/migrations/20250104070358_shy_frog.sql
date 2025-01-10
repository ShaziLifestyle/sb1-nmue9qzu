-- Add prompt_result column to agents table
ALTER TABLE agents 
ADD COLUMN IF NOT EXISTS prompt_result text;