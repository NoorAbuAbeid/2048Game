import React from 'react';
import '../App.css';

const GameOverComp = ({ startNewGame }) => {
  return (
    <div className="game-over-overlay">
      <div className="game-over-message">
        <p>Game over!</p>
        <button onClick={startNewGame}>Try again</button>
      </div>
    </div>
  );
};

export default GameOverComp;
