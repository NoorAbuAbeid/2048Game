import React from 'react';
import '../App.css';

const GameWonComp = ({ startNewGame }) => {
  return (
    <div className="game-won-overlay">
      <div className="game-won-message">
        <p>You win!</p>
        <button onClick={startNewGame}>Play again</button>
      </div>
    </div>
  );
};

export default GameWonComp;
