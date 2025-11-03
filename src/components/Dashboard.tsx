import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useRunLogs } from '../hooks/useRunLogs';
import AddRunForm from './AddRunForm';
import RunCard from './RunCard';
import StatsCard from './StatsCard';
import EditRunModal from './EditRunModal';
import { Plus, TrendingUp, Clock, Zap, Activity } from 'lucide-react';
import type { RunLog } from '../hooks/useRunLogs';

export default function Dashboard() {
  const { user } = useAuth();
  const { runs, loading, addRun, updateRun, deleteRun } = useRunLogs(user?.id);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingRun, setEditingRun] = useState<RunLog | null>(null);

  const totalDistance = runs.reduce((sum, run) => sum + run.distance_km, 0);
  const totalDuration = runs.reduce((sum, run) => sum + run.duration_min, 0);
  const avgEffort = runs.length > 0 
    ? runs.reduce((sum, run) => sum + run.effort, 0) / runs.length 
    : 0;

  const handleAddRun = async (runData: any) => {
    try {
      await addRun(runData);
      setShowAddForm(false);
    } catch (error) {
      console.error('Failed to add run:', error);
    }
  };

  const handleUpdateRun = async (id: string, updates: Partial<RunLog>) => {
    try {
      await updateRun(id, updates);
      setEditingRun(null);
    } catch (error) {
      console.error('Failed to update run:', error);
    }
  };

  const handleDeleteRun = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this run?')) {
      try {
        await deleteRun(id);
      } catch (error) {
        console.error('Failed to delete run:', error);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Your Running Journey</h2>
        <p className="text-gray-600">Track your progress and stay motivated</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatsCard
          icon={<TrendingUp className="text-indigo-600" size={24} />}
          label="Total Distance"
          value={`${totalDistance.toFixed(1)} km`}
          bgColor="bg-indigo-50"
        />
        <StatsCard
          icon={<Clock className="text-green-600" size={24} />}
          label="Total Time"
          value={`${Math.floor(totalDuration / 60)}h ${Math.floor(totalDuration % 60)}m`}
          bgColor="bg-green-50"
        />
        <StatsCard
          icon={<Zap className="text-orange-600" size={24} />}
          label="Avg Effort"
          value={`${avgEffort.toFixed(1)}/10`}
          bgColor="bg-orange-50"
        />
      </div>

      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold text-gray-900">Recent Runs</h3>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <Plus size={20} />
          Add Run
        </button>
      </div>

      {showAddForm && (
        <div className="mb-6">
          <AddRunForm
            onSubmit={handleAddRun}
            onCancel={() => setShowAddForm(false)}
          />
        </div>
      )}

      {runs.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-2xl shadow-sm">
          <Activity className="mx-auto text-gray-400 mb-4" size={48} />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No runs yet</h3>
          <p className="text-gray-600 mb-4">Start tracking your runs to see your progress</p>
          <button
            onClick={() => setShowAddForm(true)}
            className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <Plus size={20} />
            Add Your First Run
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {runs.map((run) => (
            <RunCard
              key={run.id}
              run={run}
              onEdit={() => setEditingRun(run)}
              onDelete={() => handleDeleteRun(run.id)}
            />
          ))}
        </div>
      )}

      {editingRun && (
        <EditRunModal
          run={editingRun}
          onSave={(updates) => handleUpdateRun(editingRun.id, updates)}
          onClose={() => setEditingRun(null)}
        />
      )}
    </div>
  );
}
