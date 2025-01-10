-- Initialize completion fields for agents
UPDATE agents
SET 
  complete = true,
  name_complete = true,
  role_complete = CASE WHEN role IS NOT NULL THEN true ELSE false END,
  description_complete = CASE WHEN description IS NOT NULL THEN true ELSE false END,
  goal_complete = CASE WHEN goal IS NOT NULL THEN true ELSE false END,
  backstory_complete = CASE WHEN backstory IS NOT NULL THEN true ELSE false END
WHERE complete IS NULL;

-- Initialize completion fields for tasks
UPDATE tasks
SET 
  complete = true,
  name_complete = true,
  description_complete = CASE WHEN description IS NOT NULL THEN true ELSE false END
WHERE complete IS NULL;

-- Initialize completion fields for prompts
UPDATE prompts
SET 
  complete = true,
  content_complete = true
WHERE complete IS NULL;