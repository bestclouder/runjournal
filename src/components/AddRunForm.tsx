import React, { useState } from 'react';
import { Calendar, MapPin, Clock, Zap, FileText } from 'lucide-react';

interface AddRunFormProps {
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

export default function AddRunForm({ onSubmit, onCancel }: AddRunFormProps) {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    distance_km: '',
    duration_min: '',
    effort: '5',
    notes: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      distance_km: parseFloat(formData.distance_km),
      duration_min: parseFloat(formData.duration_min),
      effort: parseInt(formData.effort),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-6">Add New Run</h3>
      
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
            placeholder="5.0"
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
            placeholder="30"
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
          Notes (optional)
        </label>
        <textarea
          value={formData.notes}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          rows={3}
          placeholder="How did it feel? Any observations?"
        />
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          className="flex-1 bg-indigo-600 text-white py-2 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
        >
          Save Run
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg font-medium hover:bg-gray-300 transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
