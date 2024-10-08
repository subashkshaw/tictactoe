import React, { useState } from 'react';
import './styles/root.scss';
import Board from './components/Board';
import History from './components/History';
import { calculateWinner } from './helper';
import StatusMessage from './components/StatusMessage';

const App = () => {
  // const [board, setBoard] = useState(Array(9).fill(null));
  // const [isXNext, setIsXNext] = useState(false);
  const NEW_GAME = [{ board: Array(9).fill(null), isXNext: true }];
  const [history, setHistory] = useState(NEW_GAME);
  const [currentMov, setCurrentMov] = useState(0);
  const current = history[currentMov];
  const { winner, winningSquares } = calculateWinner(current.board);
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
  const onNewGame = () => {
    setHistory(NEW_GAME);
    setCurrentMov(0);
  };
  return (
    <>
      <div className="app">
        <h1>
          TIC <span className="text-green">TAC</span> TOE
        </h1>
        <StatusMessage winner={winner} current={current} />
        <Board
          board={current.board}
          handleSquareClick={handleSquareClick}
          winningSquares={winningSquares}
        />
        <button
          type="button"
          onClick={onNewGame}
          className={`btn-reset ${winner ? 'active' : ''}`}
        >
          Start New Game
        </button>
        <h2 style={{ fontWeight: 'normal' }}>Current Game History</h2>
        <History history={history} moveTo={moveTo} currentMov={currentMov} />
        <div className="bg-balls" />
      </div>
    </>
  );
};
export default App;
