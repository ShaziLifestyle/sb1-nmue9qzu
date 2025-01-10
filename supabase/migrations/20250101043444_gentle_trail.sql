-- Ensure all agents have an order value
UPDATE agents 
SET "order" = sub.row_num
FROM (
  SELECT id, ROW_NUMBER() OVER (ORDER BY created_at) as row_num 
  FROM agents 
  WHERE "order" IS NULL
) sub
WHERE agents.id = sub.id;

-- Add not null constraint to order column
ALTER TABLE agents 
ALTER COLUMN "order" SET NOT NULL,
ALTER COLUMN "order" SET DEFAULT 1;