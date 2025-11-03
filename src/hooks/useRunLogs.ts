import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { RunLog } from '../types/database';

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

    const { error } = await supabase
      .from('run_logs')
      .insert([{ ...run, user_id: userId }]);

    if (error) {
      console.error('Error adding run:', error);
      throw error;
    }
    await fetchRuns();
  };

  const updateRun = async (id: string, updates: Partial<RunLog>) => {
    const { error } = await supabase
      .from('run_logs')
      .update(updates)
      .eq('id', id);

    if (error) {
      console.error('Error updating run:', error);
      throw error;
    }
    await fetchRuns();
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
    await fetchRuns();
  };

  return { runs, loading, addRun, updateRun, deleteRun, refetch: fetchRuns };
}
