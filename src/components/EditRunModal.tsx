import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useRunLogs } from '../hooks/useRunLogs';
import { X, Calendar, Clock, MapPin, FileText } from 'lucide-react';
import type { RunLog } from '../types/database';

interface EditRunModalProps {
  run: RunLog;
  onClose: () => void;
}

export function EditRunModal({ run, onClose }: EditRunModalProps) {
  const { user } = useAuth();
  const { updateRun } = useRunLogs(user?.id);
  const [date, setDate] = useState(run.date);
  const [distance, setDistance] = useState(run.distance.toString());
  const [duration, setDuration] = useState(run.duration.toString());
  const [notes, setNotes] = useState(run.notes || '');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await updateRun(run.id, {
        date,
        distance: parseFloat(distance),
        duration: parseInt(duration),
        notes: notes || null,
      });
      onClose();
    } catch (error) {
      console.error('Error updating run:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Edit Run</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label htmlFor="edit-date" className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <Calendar className="w-5 h-5 mr-2 text-blue-600" />
              Date
            </label>
            <input
              id="edit-date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
            />
          </div>

          <div>
            <label htmlFor="edit-distance" className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <MapPin className="w-5 h-5 mr-2 text-blue-600" />
              Distance (km)
            </label>
            <input
              id="edit-distance"
              type="number"
              step="0.1"
              value={distance}
              onChange={(e) => setDistance(e.target.value)}
              required
              min="0"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
            />
          </div>

          <div>
            <label htmlFor="edit-duration" className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <Clock className="w-5 h-5 mr-2 text-blue-600" />
              Duration (minutes)
            </label>
            <input
              id="edit-duration"
              type="number"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              required
              min="1"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
            />
          </div>

          <div>
            <label htmlFor="edit-notes" className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <FileText className="w-5 h-5 mr-2 text-blue-600" />
              Notes (optional)
            </label>
            <textarea
              id="edit-notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition resize-none"
            />
          </div>

          <div className="flex space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-6 rounded-lg transition duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
