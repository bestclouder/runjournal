import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useRunLogs } from '../hooks/useRunLogs';
import { Calendar, Clock, MapPin, FileText } from 'lucide-react';

export function AddRunForm() {
  const { user } = useAuth();
  const { addRun } = useRunLogs(user?.id);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [distance, setDistance] = useState('');
  const [duration, setDuration] = useState('');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    try {
      await addRun({
        date,
        distance: parseFloat(distance),
        duration: parseInt(duration),
        notes: notes || null,
      });

      setDistance('');
      setDuration('');
      setNotes('');
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.error('Error adding run:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Log a New Run</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="date" className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <Calendar className="w-5 h-5 mr-2 text-blue-600" />
                Date
              </label>
              <input
                id="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              />
            </div>

            <div>
              <label htmlFor="distance" className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <MapPin className="w-5 h-5 mr-2 text-blue-600" />
                Distance (km)
              </label>
              <input
                id="distance"
                type="number"
                step="0.1"
                value={distance}
                onChange={(e) => setDistance(e.target.value)}
                required
                min="0"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                placeholder="5.0"
              />
            </div>

            <div>
              <label htmlFor="duration" className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <Clock className="w-5 h-5 mr-2 text-blue-600" />
                Duration (minutes)
              </label>
              <input
                id="duration"
                type="number"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                required
                min="1"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                placeholder="30"
              />
            </div>

            <div>
              <label htmlFor="notes" className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <FileText className="w-5 h-5 mr-2 text-blue-600" />
                Notes (optional)
              </label>
              <textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition resize-none"
                placeholder="How did you feel? Any observations?"
              />
            </div>

            {success && (
              <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
                Run logged successfully! 🎉
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-4 px-6 rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
            >
              {loading ? 'Saving...' : 'Log Run'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
