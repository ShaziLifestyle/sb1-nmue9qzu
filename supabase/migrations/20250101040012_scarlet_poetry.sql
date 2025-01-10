-- Add order column to agents table
ALTER TABLE agents ADD COLUMN IF NOT EXISTS "order" integer;

-- Set initial order based on creation date
UPDATE agents SET "order" = sub.row_num
FROM (
  SELECT id, ROW_NUMBER() OVER (ORDER BY created_at) as row_num 
  FROM agents
) sub
WHERE agents.id = sub.id;