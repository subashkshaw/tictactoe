import React, { useState } from 'react';
import './styles/root.scss';
import Board from './components/Board';
import History from './components/History';
import { calculateWinner } from './helper';

const App = () => {
  // const [board, setBoard] = useState(Array(9).fill(null));
  // const [isXNext, setIsXNext] = useState(false);
  const [history, setHistory] = useState([
    { board: Array(9).fill(null), isXNext: true },
  ]);
  const [currentMov, setCurrentMov] = useState(0);
  const current = history[currentMov];
  const winner = calculateWinner(current.board);
  const message = winner
    ? `Winner is ${winner}`
    : `Next Player is ${current.isXNext ? 'X' : 'O'}`;
  const handleSquareClick = position => {
    if (current.board[position] || winner) {
      return;
    }
    // setBoard(prev => {
    setHistory(prev => {
      const last = prev[prev.length - 1];
      const newBoard = last.board.map((square, pos) => {
        if (pos === position) {
          return last.isXNext ? 'X' : 'O';
        }
        return square;
      });
      return prev.concat({ board: newBoard, isXNext: !last.isXNext });
    });
    // setIsXNext(prev => !prev);
    setCurrentMov(prev => prev + 1);
  };
  const moveTo = move => {
    setCurrentMov(move);
  };
  return (
    <>
      <div className="app">
        <h1>TIC TAC TOE</h1>
        <h2>{message}</h2>
        <Board board={current.board} handleSquareClick={handleSquareClick} />
        <History history={history} moveTo={moveTo} currentMov={currentMov} />
      </div>
    </>
  );
};
export default App;
