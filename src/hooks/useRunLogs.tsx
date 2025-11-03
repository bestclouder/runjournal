import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { RunLog, WeeklyStats } from '../types/database';

export function useRunLogs(userId: string | undefined) {
  const [runs, setRuns] = useState<RunLog[]>([]);
  const [weeklyStats, setWeeklyStats] = useState<WeeklyStats>({
    totalDistance: 0,
    averagePace: 0,
    totalRuns: 0,
  });
  const [loading, setLoading] = useState(true);

  const fetchRuns = async () => {
    if (!userId) return;

    setLoading(true);
    const { data, error } = await supabase
      .from('run_logs')
      .select('*')
      .eq('user_id', userId)
      .order('date', { ascending: false });

    if (!error && data) {
      setRuns(data);
      calculateWeeklyStats(data);
    }
    setLoading(false);
  };

  const calculateWeeklyStats = (allRuns: RunLog[]) => {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const recentRuns = allRuns.filter(
      (run) => new Date(run.date) >= sevenDaysAgo
    );

    const totalDistance = recentRuns.reduce((sum, run) => sum + run.distance_km, 0);
    const totalDuration = recentRuns.reduce((sum, run) => sum + run.duration_min, 0);
    const averagePace = totalDistance > 0 ? totalDuration / totalDistance : 0;

    setWeeklyStats({
      totalDistance,
      averagePace,
      totalRuns: recentRuns.length,
    });
  };

  useEffect(() => {
    fetchRuns();
  }, [userId]);

  const addRun = async (run: Omit<RunLog, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => {
    if (!userId) return { error: new Error('No user') };

    const { error } = await supabase.from('run_logs').insert({
      ...run,
      user_id: userId,
    });

    if (!error) {
      await fetchRuns();
    }

    return { error };
  };

  const updateRun = async (id: string, updates: Partial<RunLog>) => {
    const { error } = await supabase
      .from('run_logs')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id);

    if (!error) {
      await fetchRuns();
    }

    return { error };
  };

  const deleteRun = async (id: string) => {
    const { error } = await supabase.from('run_logs').delete().eq('id', id);

    if (!error) {
      await fetchRuns();
    }

    return { error };
  };

  return {
    runs,
    weeklyStats,
    loading,
    addRun,
    updateRun,
    deleteRun,
    refreshRuns: fetchRuns,
  };
}
