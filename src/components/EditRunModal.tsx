import React, { useState } from 'react';
import { X, Calendar, MapPin, Clock, Zap, FileText } from 'lucide-react';
import type { RunLog } from '../hooks/useRunLogs';

interface EditRunModalProps {
  run: RunLog;
  onSave: (updates: Partial<RunLog>) => void;
  onClose: () => void;
}

export default function EditRunModal({ run, onSave, onClose }: EditRunModalProps) {
  const [formData, setFormData] = useState({
    date: run.date,
    distance_km: run.distance_km.toString(),
    duration_min: run.duration_min.toString(),
    effort: run.effort.toString(),
    notes: run.notes,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      date: formData.date,
      distance_km: parseFloat(formData.distance_km),
      duration_min: parseFloat(formData.duration_min),
      effort: parseInt(formData.effort),
      notes: formData.notes,
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
          <h3 className="text-xl font-bold text-gray-900">Edit Run</h3>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Calendar size={16} className="inline mr-1" />
                Date
              </label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <MapPin size={16} className="inline mr-1" />
                Distance (km)
              </label>
              <input
                type="number"
                step="0.1"
                value={formData.distance_km}
                onChange={(e) => setFormData({ ...formData, distance_km: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Clock size={16} className="inline mr-1" />
                Duration (minutes)
              </label>
              <input
                type="number"
                step="1"
                value={formData.duration_min}
                onChange={(e) => setFormData({ ...formData, duration_min: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Zap size={16} className="inline mr-1" />
                Effort (1-10)
              </label>
              <input
                type="number"
                min="1"
                max="10"
                value={formData.effort}
                onChange={(e) => setFormData({ ...formData, effort: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                required
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <FileText size={16} className="inline mr-1" />
              Notes
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              rows={3}
            />
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              className="flex-1 bg-indigo-600 text-white py-2 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg font-medium hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
