-- Add field completion columns to agents
ALTER TABLE agents
ADD COLUMN IF NOT EXISTS name_complete boolean NOT NULL DEFAULT false,
ADD COLUMN IF NOT EXISTS role_complete boolean NOT NULL DEFAULT false,
ADD COLUMN IF NOT EXISTS description_complete boolean NOT NULL DEFAULT false,
ADD COLUMN IF NOT EXISTS goal_complete boolean NOT NULL DEFAULT false,
ADD COLUMN IF NOT EXISTS backstory_complete boolean NOT NULL DEFAULT false;

-- Add field completion columns to tasks
ALTER TABLE tasks
ADD COLUMN IF NOT EXISTS name_complete boolean NOT NULL DEFAULT false,
ADD COLUMN IF NOT EXISTS description_complete boolean NOT NULL DEFAULT false;

-- Add field completion columns to prompts
ALTER TABLE prompts
ADD COLUMN IF NOT EXISTS content_complete boolean NOT NULL DEFAULT false;