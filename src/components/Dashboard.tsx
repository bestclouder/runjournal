import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useRunLogs } from '../hooks/useRunLogs';
import { Calendar, Clock, MapPin, Edit2, Trash2 } from 'lucide-react';
import { EditRunModal } from './EditRunModal';
import type { RunLog } from '../types/database';

export function Dashboard() {
  const { user } = useAuth();
  const { runs, loading, deleteRun } = useRunLogs(user?.id);
  const [editingRun, setEditingRun] = useState<RunLog | null>(null);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this run?')) {
      await deleteRun(id);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading your runs...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Your Running History</h1>
          <p className="text-gray-600 mt-2">Track your progress and stay motivated!</p>
        </div>

        {runs.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-700 mb-2">No runs yet</h2>
            <p className="text-gray-500">Start logging your runs to see them here!</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {runs.map((run) => (
              <div
                key={run.id}
                className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden"
              >
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4">
                  <div className="flex items-center justify-between text-white">
                    <div className="flex items-center">
                      <Calendar className="w-5 h-5 mr-2" />
                      <span className="font-semibold">{formatDate(run.date)}</span>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setEditingRun(run)}
                        className="p-2 hover:bg-white/20 rounded-lg transition"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(run.id)}
                        className="p-2 hover:bg-white/20 rounded-lg transition"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <MapPin className="w-5 h-5 text-blue-600 mr-3" />
                      <div>
                        <p className="text-sm text-gray-500">Distance</p>
                        <p className="text-2xl font-bold text-gray-900">{run.distance} km</p>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <Clock className="w-5 h-5 text-purple-600 mr-3" />
                      <div>
                        <p className="text-sm text-gray-500">Duration</p>
                        <p className="text-xl font-semibold text-gray-900">
                          {formatDuration(run.duration)}
                        </p>
                      </div>
                    </div>

                    {run.notes && (
                      <div className="pt-4 border-t border-gray-200">
                        <p className="text-sm text-gray-500 mb-1">Notes</p>
                        <p className="text-gray-700">{run.notes}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {editingRun && (
        <EditRunModal run={editingRun} onClose={() => setEditingRun(null)} />
      )}
    </div>
  );
}
