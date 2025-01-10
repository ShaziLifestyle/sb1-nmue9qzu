/*
  # Add prompt results table

  1. New Tables
    - `prompt_results`
      - `id` (uuid, primary key)
      - `prompt_id` (uuid, foreign key to prompts)
      - `content` (text, the result content)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on `prompt_results` table
    - Add policies for public access (matching existing setup)
*/

CREATE TABLE IF NOT EXISTS prompt_results (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  prompt_id uuid REFERENCES prompts ON DELETE CASCADE NOT NULL,
  content text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE prompt_results ENABLE ROW LEVEL SECURITY;

-- Create policies for public access
CREATE POLICY "Public read prompt_results"
  ON prompt_results FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Public insert prompt_results"
  ON prompt_results FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Public update prompt_results"
  ON prompt_results FOR UPDATE
  TO public
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Public delete prompt_results"
  ON prompt_results FOR DELETE
  TO public
  USING (true);