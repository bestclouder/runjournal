/*
  # Create run_logs table for Daily Running Journal

  1. New Tables
    - `run_logs`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to auth.users)
      - `date` (date, when the run occurred)
      - `distance_km` (float, distance in kilometers)
      - `duration_min` (float, duration in minutes)
      - `effort` (integer, effort rating 1-10)
      - `notes` (text, optional notes)
      - `created_at` (timestamptz, record creation time)
      - `updated_at` (timestamptz, last update time)

  2. Security
    - Enable RLS on `run_logs` table
    - Add policies for authenticated users to manage their own runs
*/

CREATE TABLE IF NOT EXISTS run_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  date date NOT NULL,
  distance_km float NOT NULL,
  duration_min float NOT NULL,
  effort integer NOT NULL CHECK (effort >= 1 AND effort <= 10),
  notes text DEFAULT '',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE run_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own runs"
  ON run_logs
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own runs"
  ON run_logs
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own runs"
  ON run_logs
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own runs"
  ON run_logs
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS idx_run_logs_user_id ON run_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_run_logs_date ON run_logs(date DESC);
