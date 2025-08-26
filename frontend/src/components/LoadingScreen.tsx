import React from 'react';
import './LoadingScreen.css';

const LoadingScreen: React.FC = () => {
  return (
    <div className="loading-screen">
      <div className="loading-content">
        <h2 className="loading-title">Loading Chess Training...</h2>
        <div className="loading-spinner"></div>
      </div>
    </div>
  );
};

export default LoadingScreen;