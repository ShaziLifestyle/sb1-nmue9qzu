-- Add name field to prompts table
ALTER TABLE prompts
ADD COLUMN IF NOT EXISTS name text,
ADD COLUMN IF NOT EXISTS name_complete boolean NOT NULL DEFAULT false;