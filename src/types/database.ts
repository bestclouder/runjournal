export interface RunLog {
  id: string;
  user_id: string;
  date: string;
  distance: number;
  duration: number;
  notes: string | null;
  created_at: string;
  updated_at: string;
}
