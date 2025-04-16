import React from "react";

/**
 * Simple loading screen component to show while data is being fetched
 */
const LoadingScreen: React.FC = () => {
  return (
    <div className="loading-screen">
      <div className="loading-spinner">
        <div className="spinner-circle"></div>
      </div>
      <p className="loading-text">Loading game data...</p>
    </div>
  );
};

export default LoadingScreen;
