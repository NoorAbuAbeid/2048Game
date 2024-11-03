import React from 'react';
import Tile from './Tile';
import '../App.css';

const Board = ({ board, mergedTiles }) => {
  return (
    <div className="board">
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className="row">
          {row.map((cell, colIndex) => {
            const isMerged = mergedTiles.some(tile => tile.row === rowIndex && tile.col === colIndex);
            return (
              <Tile key={colIndex} value={cell} isMerged={isMerged} />
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default Board;
