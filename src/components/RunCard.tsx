import React from 'react';
import { Calendar, MapPin, Clock, Zap, Edit2, Trash2 } from 'lucide-react';
import type { RunLog } from '../hooks/useRunLogs';

interface RunCardProps {
  run: RunLog;
  onEdit: () => void;
  onDelete: () => void;
}

export default function RunCard({ run, onEdit, onDelete }: RunCardProps) {
  const pace = run.duration_min / run.distance_km;
  const formattedDate = new Date(run.date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  const effortColor = run.effort <= 3 ? 'text-green-600' : run.effort <= 7 ? 'text-yellow-600' : 'text-red-600';

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-2 text-gray-600">
          <Calendar size={16} />
          <span className="text-sm font-medium">{formattedDate}</span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={onEdit}
            className="p-1.5 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
          >
            <Edit2 size={16} />
          </button>
          <button
            onClick={onDelete}
            className="p-1.5 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <MapPin className="text-indigo-600" size={20} />
          <span className="text-2xl font-bold text-gray-900">{run.distance_km} km</span>
        </div>

        <div className="flex items-center gap-2 text-gray-600">
          <Clock size={18} />
          <span>{Math.floor(run.duration_min)} min</span>
          <span className="text-gray-400">•</span>
          <span>{pace.toFixed(2)} min/km</span>
        </div>

        <div className="flex items-center gap-2">
          <Zap size={18} className={effortColor} />
          <span className={`font-medium ${effortColor}`}>
            Effort: {run.effort}/10
          </span>
        </div>

        {run.notes && (
          <p className="text-sm text-gray-600 mt-3 pt-3 border-t border-gray-100">
            {run.notes}
          </p>
        )}
      </div>
    </div>
  );
}
