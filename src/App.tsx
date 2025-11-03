import React, { useState } from 'react';
import { useAuth } from './hooks/useAuth';
import { AuthForm } from './components/AuthForm';
import { Navigation } from './components/Navigation';
import { Dashboard } from './components/Dashboard';
import { AddRunForm } from './components/AddRunForm';

function App() {
  const { user, loading } = useAuth();
  const [currentPage, setCurrentPage] = useState<'dashboard' | 'add-run'>('dashboard');

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#FF6F61] to-[#6B5B95] flex items-center justify-center">
        <div className="text-5xl font-black text-white animate-pulse" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
          Loading... 🏃‍♂️
        </div>
      </div>
    );
  }

  if (!user) {
    return <AuthForm />;
  }

  return (
    <div className="min-h-screen">
      <Navigation currentPage={currentPage} onNavigate={setCurrentPage} />
      {currentPage === 'dashboard' ? <Dashboard /> : <AddRunForm />}
    </div>
  );
}

export default App;
