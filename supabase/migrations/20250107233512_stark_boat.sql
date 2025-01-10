-- Reset completion fields for agents
UPDATE agents
SET 
  complete = false,
  name_complete = false,
  role_complete = false,
  description_complete = false,
  goal_complete = false,
  backstory_complete = false;

-- Reset completion fields for tasks
UPDATE tasks
SET 
  complete = false,
  name_complete = false,
  description_complete = false;

-- Reset completion fields for prompts
UPDATE prompts
SET 
  complete = false,
  content_complete = false;

-- Now set completion based on content
UPDATE agents
SET 
  name_complete = CASE WHEN name IS NOT NULL AND name != '' THEN true ELSE false END,
  role_complete = CASE WHEN role IS NOT NULL AND role != '' THEN true ELSE false END,
  description_complete = CASE WHEN description IS NOT NULL AND description != '' THEN true ELSE false END,
  goal_complete = CASE WHEN goal IS NOT NULL AND goal != '' THEN true ELSE false END,
  backstory_complete = CASE WHEN backstory IS NOT NULL AND backstory != '' THEN true ELSE false END;

UPDATE tasks
SET 
  name_complete = CASE WHEN name IS NOT NULL AND name != '' THEN true ELSE false END,
  description_complete = CASE WHEN description IS NOT NULL AND description != '' THEN true ELSE false END;

UPDATE prompts
SET 
  content_complete = CASE WHEN content IS NOT NULL AND content != '' THEN true ELSE false END;

-- Set overall completion based on field completion
UPDATE agents
SET complete = 
  CASE WHEN 
    name_complete = true AND
    (role IS NULL OR role_complete = true) AND
    (description IS NULL OR description_complete = true) AND
    (goal IS NULL OR goal_complete = true) AND
    (backstory IS NULL OR backstory_complete = true)
  THEN true 
  ELSE false 
  END;

UPDATE tasks
SET complete = 
  CASE WHEN 
    name_complete = true AND
    (description IS NULL OR description_complete = true)
  THEN true 
  ELSE false 
  END;

UPDATE prompts
SET complete = content_complete;