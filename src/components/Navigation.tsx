import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { Activity, Plus, LayoutDashboard, LogOut } from 'lucide-react';

interface NavigationProps {
  currentPage: 'dashboard' | 'add-run';
  onNavigate: (page: 'dashboard' | 'add-run') => void;
}

export function Navigation({ currentPage, onNavigate }: NavigationProps) {
  const { signOut } = useAuth();

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Activity className="w-8 h-8 text-blue-600 mr-2" />
            <span className="text-xl font-bold text-gray-800">Running Journal</span>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => onNavigate('dashboard')}
              className={`flex items-center px-4 py-2 rounded-lg transition ${
                currentPage === 'dashboard'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <LayoutDashboard className="w-5 h-5 mr-2" />
              Dashboard
            </button>

            <button
              onClick={() => onNavigate('add-run')}
              className={`flex items-center px-4 py-2 rounded-lg transition ${
                currentPage === 'add-run'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Plus className="w-5 h-5 mr-2" />
              Add Run
            </button>

            <button
              onClick={signOut}
              className="flex items-center px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition"
            >
              <LogOut className="w-5 h-5 mr-2" />
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
