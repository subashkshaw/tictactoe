import React from 'react';
import './styles/root.scss';
import Board from './components/Board';

export default () => (
  <>
    <div className="app">
      <h1>TIC TAC TOE</h1>
      <Board />
    </div>
  </>
);
