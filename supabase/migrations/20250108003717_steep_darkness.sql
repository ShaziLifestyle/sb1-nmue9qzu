/*
  # Update prompt name completion handling

  1. Changes
    - Add NOT NULL constraint to prompt name
    - Update existing prompts to have a default name if missing
    - Update completion status for prompt names
*/

-- Ensure existing prompts have a name
UPDATE prompts 
SET name = 'Prompt ' || id::text
WHERE name IS NULL;

-- Make name required
ALTER TABLE prompts
ALTER COLUMN name SET NOT NULL;

-- Update completion status
UPDATE prompts
SET 
  name_complete = CASE WHEN name IS NOT NULL AND name != '' THEN true ELSE false END,
  complete = CASE WHEN 
    name IS NOT NULL AND name != '' AND
    content IS NOT NULL AND content != '' AND
    name_complete = true AND
    content_complete = true
  THEN true 
  ELSE false 
  END;