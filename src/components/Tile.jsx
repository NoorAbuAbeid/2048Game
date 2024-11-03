import React from 'react';
import '../App.css';

const Tile = ({ value, isMerged }) => {
  const getTileClass = (value, isMerged) => {
    if (!value) return '';
    return `tile tile-${value} ${isMerged ? 'tile-merged' : ''}`;
  };

  return (
    <div className={`cell ${getTileClass(value, isMerged)}`}>
      {value}
    </div>
  );
};

export default Tile;
