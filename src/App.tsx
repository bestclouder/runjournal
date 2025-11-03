import React, { useState } from 'react';
import { useAuth } from './hooks/useAuth';
import AuthForm from './components/AuthForm';
import Dashboard from './components/Dashboard';
import Navigation from './components/Navigation';

function App() {
  const { user, loading, signOut } = useAuth();
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">🏃‍♂️ Run Tracker</h1>
            <p className="text-gray-600">Track your daily runs and progress</p>
          </div>
          <AuthForm mode={authMode} onToggleMode={() => setAuthMode(authMode === 'signin' ? 'signup' : 'signin')} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navigation user={user} onSignOut={signOut} />
      <Dashboard />
    </div>
  );
}

export default App;
