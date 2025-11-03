import React from 'react';
import { LogOut, Activity } from 'lucide-react';
import type { User } from '@supabase/supabase-js';

interface NavigationProps {
  user: User;
  onSignOut: () => void;
}

export default function Navigation({ user, onSignOut }: NavigationProps) {
  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
            <Activity className="text-indigo-600" size={28} />
            <h1 className="text-xl font-bold text-gray-900">Run Tracker</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">{user.email}</span>
            <button
              onClick={onSignOut}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <LogOut size={18} />
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
