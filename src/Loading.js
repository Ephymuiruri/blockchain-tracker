// Loading.js
import React from 'react';
import './Loading.css'; // Assuming we create the CSS styles in a separate file

const Loading = () => {
  return (
    <div className="loading-container">
      <div className="spinner"></div>
      <h2>Loading, please wait...</h2>
    </div>
  );
};

export default Loading;
