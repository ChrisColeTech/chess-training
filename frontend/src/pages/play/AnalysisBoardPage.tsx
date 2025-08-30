import React from 'react';

const AnalysisBoardPage: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-indigo-900">
      <div className="backdrop-blur-sm bg-black/20 border border-white/10 rounded-2xl p-8 max-w-md w-full mx-4">
        <div className="text-center">
          <div className="text-4xl mb-4">🧠</div>
          <h1 className="text-2xl font-bold text-white mb-4">Analysis Board</h1>
          <p className="text-gray-300 mb-6">
            Analyze chess positions with engine assistance. Set up custom positions, 
            explore opening variations, and get real-time evaluations.
          </p>
          <div className="text-sm text-gray-400">
            🚧 Coming Soon - Phase 3 Implementation
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalysisBoardPage;