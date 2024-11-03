import React, { useEffect } from 'react';
import '../App.css';

const Controls = ({ startNewGame }) => {
  return (
    <button onClick={startNewGame}>New Game</button>
  );
};

export default Controls;
