import React from 'react';

const ProgressOverviewPage: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-indigo-900">
      <div className="backdrop-blur-sm bg-black/20 border border-white/10 rounded-2xl p-8 max-w-md w-full mx-4">
        <div className="text-center">
          <div className="text-4xl mb-4">📈</div>
          <h1 className="text-2xl font-bold text-white mb-4">Progress Overview</h1>
          <p className="text-gray-300 mb-6">
            Track your chess improvement with detailed statistics, rating progression, 
            and performance analysis across all game types.
          </p>
          <div className="text-sm text-gray-400">
            🚧 Coming Soon - Phase 4 Implementation
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressOverviewPage;