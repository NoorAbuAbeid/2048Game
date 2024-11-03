import React from 'react';
import '../App.css';

const Score = ({ label, value }) => {
  return (
    <div className="score-box">
      <div className="score-label">{label}</div>
      <div className="score-value">{value}</div>
    </div>
  );
};

export default Score;
