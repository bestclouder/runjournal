import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export interface RunLog {
  id: string;
  user_id: string;
  date: string;
  distance_km: number;
  duration_min: number;
  effort: number;
  notes: string;
  created_at: string;
  updated_at: string;
}

export function useRunLogs(userId: string | undefined) {
  const [runs, setRuns] = useState<RunLog[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchRuns = async () => {
    if (!userId) return;
    
    setLoading(true);
    const { data, error } = await supabase
      .from('run_logs')
      .select('*')
      .eq('user_id', userId)
      .order('date', { ascending: false });

    if (error) {
      console.error('Error fetching runs:', error);
    } else {
      setRuns(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchRuns();
  }, [userId]);

  const addRun = async (run: Omit<RunLog, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => {
    if (!userId) return;

    const { data, error } = await supabase
      .from('run_logs')
      .insert([{ ...run, user_id: userId }])
      .select()
      .single();

    if (error) {
      console.error('Error adding run:', error);
      throw error;
    }

    setRuns([data, ...runs]);
    return data;
  };

  const updateRun = async (id: string, updates: Partial<RunLog>) => {
    const { data, error } = await supabase
      .from('run_logs')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating run:', error);
      throw error;
    }

    setRuns(runs.map(run => run.id === id ? data : run));
    return data;
  };

  const deleteRun = async (id: string) => {
    const { error } = await supabase
      .from('run_logs')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting run:', error);
      throw error;
    }

    setRuns(runs.filter(run => run.id !== id));
  };

  return { runs, loading, addRun, updateRun, deleteRun, refetch: fetchRuns };
}
