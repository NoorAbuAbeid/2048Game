import React, { useState, useEffect } from 'react';
import Board from '../components/Board';
import Score from '../components/Score';
import Controls from '../components/Controls';
import GameOverComp from './gameOverComp';
import GameWonComp from './gameWonComp'
import '../App.css';

const size = 4;

//Init 4*4 matrix to null
const createBoard = () => {
  const board = [];
  for (let i = 0; i < size; i++) {
    board.push(new Array(size).fill(null));
  }
  return board;
};

const App = () => {
  const [board, setBoard] = useState(createBoard());
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [mergedTiles, setMergedTiles] = useState([]);//empty array

  useEffect(() => { //init the game when executing
    startNewGame();
  }, []);//called once

  const startNewGame = () => {
    const newBoard = createBoard();
    addNewTile(newBoard);
    addNewTile(newBoard);
    setBoard(newBoard);
    setScore(0);
    setGameOver(false);
    setGameWon(false);
    setMergedTiles([]);
  };

  const addNewTile = (board) => {
    const newBoard = [...board];//copy to the array(...copy each row)
    let added = false;
    while (!added) {
      const row = Math.floor(Math.random() * size);//(0-->size-1)
      const col = Math.floor(Math.random() * size);
      if (!newBoard[row][col]) {
        newBoard[row][col] = 2;
        added = true;
      }
    }
    setBoard(newBoard);
  };

  const moveUp = () => {
    const newBoard = [...board];
    let moved = false;
    let newScore = score;
    const newMergedTiles = [];
  
    for (let col = 0; col < size; col++) {
      let newCol = [];
      for (let row = 0; row < size; row++) {
        if (newBoard[row][col] !== null) {
          newCol.push(newBoard[row][col]);
        }
      }//include non values (current col)
  
      let mergedCol = [];
      for (let i = 0; i < newCol.length; i++) {//itertae through the newcol
        if (newCol[i] === newCol[i + 1]) {
          console.log(newCol);
          mergedCol.push(newCol[i] * 2);
          newScore += newCol[i] * 2;
          i++; // Skip the next tile since it has been merged
          moved = true;
          newMergedTiles.push({ row: mergedCol.length - 1, col });
        } else {
          mergedCol.push(newCol[i]);
        }
      }
  
      while (mergedCol.length < size) {
        mergedCol.push(null);
      }
  
      for (let row = 0; row < size; row++) {
        if (newBoard[row][col] !== mergedCol[row]) {
          moved = true;
        }
        newBoard[row][col] = mergedCol[row];
      }
    }
  
    if (moved) {
      setScore(newScore);
      addNewTile(newBoard);
      setMergedTiles(newMergedTiles);
    }
  
    setBoard(newBoard);
  
    if (newScore > bestScore) {
      setBestScore(newScore);
    }
  
    if (checkWinningCase(newBoard)) {
      setGameWon(true);
    } else if (checkGameOver(newBoard)) {
      setGameOver(true);
    }
  };
  

  const moveDown = () => {
    const newBoard = [...board];
    let moved = false;
    let newScore = score;
    const newMergedTiles = [];
  
    for (let col = 0; col < size; col++) {
      let newCol = [];
      for (let row = size - 1; row >= 0; row--) {
        if (newBoard[row][col] !== null) {
          newCol.push(newBoard[row][col]);
        }
      }
  
      let mergedCol = [];
      for (let i = 0; i < newCol.length; i++) {
        if (newCol[i] === newCol[i + 1]) {
          mergedCol.push(newCol[i] * 2);
          newScore += newCol[i] * 2;
          i++; // Skip the next tile since it has been merged
          moved = true;
          newMergedTiles.push({ row: size - mergedCol.length, col });
        } else {
          mergedCol.push(newCol[i]);
        }
      }
  
      while (mergedCol.length < size) {
        mergedCol.push(null);
      }
  
      for (let row = size - 1; row >= 0; row--) {
        if (newBoard[row][col] !== mergedCol[size - 1 - row]) {
          moved = true;
        }
        newBoard[row][col] = mergedCol[size - 1 - row];
      }
    }
  
    if (moved) {
      setScore(newScore);
      addNewTile(newBoard);
      setMergedTiles(newMergedTiles);
    }
  
    setBoard(newBoard);
  
    if (newScore > bestScore) {
      setBestScore(newScore);
    }
  
    if (checkWinningCase(newBoard)) {
      setGameWon(true);
    } else if (checkGameOver(newBoard)) {
      setGameOver(true);
    }
  };
  
  const moveLeft = () => {
    const newBoard = [...board];
    let moved = false;
    let newScore = score;
    const newMergedTiles = [];
  
    // Move tiles to the left
    for (let row = 0; row < size; row++) {
      let newRow = newBoard[row].filter(tile => tile !== null);
      let mergedRow = [];
  
      // Merge tiles
      for (let col = 0; col < newRow.length; col++) {
        if (newRow[col] === newRow[col + 1]) {
          mergedRow.push(newRow[col] * 2);
          newScore += newRow[col] * 2;
          col++; // Skip the next tile since it has been merged
          moved = true;
          newMergedTiles.push({ row, col: mergedRow.length - 1 });
        } else {
          mergedRow.push(newRow[col]);
        }
      }
  
      // Fill the rest with null
      while (mergedRow.length < size) {
        mergedRow.push(null);
      }
  
      // If the row has changed, mark it as moved
      if (newBoard[row].some((val, idx) => val !== mergedRow[idx])) {
        moved = true;
      }
  
      newBoard[row] = mergedRow;
    }
  
    if (moved) {
      setScore(newScore);
      addNewTile(newBoard);
      setMergedTiles(newMergedTiles);
    }
  
    setBoard(newBoard);
  
    if (newScore > bestScore) {
      setBestScore(newScore);
    }
  
    if (checkWinningCase(newBoard)) {
      setGameWon(true);
    } else if (checkGameOver(newBoard)) {
      setGameOver(true);
    }
  };
  const moveRight = () => {
    const newBoard = [...board];
    let moved = false;
    let newScore = score;
    const newMergedTiles = [];
  
    for (let row = 0; row < size; row++) {
      let newRow = [];
      for (let col = size - 1; col >= 0; col--) {
        if (newBoard[row][col] !== null) {
          newRow.push(newBoard[row][col]);
        }
      }
  
      let mergedRow = [];
      for (let i = 0; i < newRow.length; i++) {
        if (newRow[i] === newRow[i + 1]) {
          mergedRow.push(newRow[i] * 2);
          newScore += newRow[i] * 2;
          i++; // Skip the next tile since it has been merged
          moved = true;
          newMergedTiles.push({ row, col: size - mergedRow.length });
        } else {
          mergedRow.push(newRow[i]);
        }
      }
  
      while (mergedRow.length < size) {
        mergedRow.push(null);
      }
  
      for (let col = size - 1; col >= 0; col--) {
        if (newBoard[row][col] !== mergedRow[size - 1 - col]) {
          moved = true;
        }
        newBoard[row][col] = mergedRow[size - 1 - col];
      }
    }
  
    if (moved) {
      setScore(newScore);
      addNewTile(newBoard);
      setMergedTiles(newMergedTiles);
    }
  
    setBoard(newBoard);
  
    if (newScore > bestScore) {
      setBestScore(newScore);
    }
  
    if (checkWinningCase(newBoard)) {
      setGameWon(true);
    } else if (checkGameOver(newBoard)) {
      setGameOver(true);
    }
  };
  
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (gameOver || gameWon) return;

      switch (e.key) {
        case 'ArrowUp':
          moveUp();
          break;
        case 'ArrowDown':
          moveDown();
          break;
        case 'ArrowLeft':
          moveLeft();
          break;
        case 'ArrowRight':
          moveRight();
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);//add to event listener
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [board, gameOver, gameWon]);//run when the dependiences changes

  const checkWinningCase = (board) => {
    for (let row = 0; row < size; row++) {
      for (let col = 0; col < size; col++) {
        if (board[row][col] === 2048) {
          return true;
        }
      }
    }
    return false;
  };

  const checkGameOver = (board) => {
    for (let row = 0; row < size; row++) {
      for (let col = 0; col < size; col++) {
        if (!board[row][col]) {
          return false;
        }
        if (row < size - 1 && board[row][col] === board[row + 1][col]) {
          return false;
        }
        if (col < size - 1 && board[row][col] === board[row][col + 1]) {
          return false;
        }
      }
    }
    return true;
  };

  return (
    <div className="game-container">
      <div className="header">
        <h1>2048</h1>
        <p>Join the tiles, get to <strong>2048!</strong></p>
        <Controls startNewGame={startNewGame} />
      </div>
      <div className="scores">
        <Score label="SCORE" value={score} />
        <Score label="BEST" value={bestScore} />
      </div>
      <Board board={board} mergedTiles={mergedTiles} />
      {gameOver && <GameOverComp startNewGame={startNewGame} />}
      {gameWon && <GameWonComp startNewGame={startNewGame} />}
    </div>
  );
};

export default App;
