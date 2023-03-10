// Kenneth Fujimura
// Date Revised: 3/10/2023
// "Tic Tac Toe Assignment"
// This is an assignment where we followed a tutorial instructions for creating a basic 'Tic Tac Toe' game in React. We then added some styling and a special feature. For my feature, when a player wins, depending on if it's the 'X' player or the 'O' player, a youtube embed pops up with a victory song that the player can choose to play.

import React, { useState } from "react";
import Board from "./components/boardComponent";
import calculateWinner from "./components/calculateWinnerComponent";
import YoutubeEmbed from "./components/YoutubeEmbed";

export default function Game(){
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares){
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove){
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0){
      description = 'Go to move #' + move;
    } else {
      description = 'go to game start';
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    )
  });

  function DMX(){
    const winwin = calculateWinner(currentSquares);
    if (winwin === 'X'){
      return (
        <YoutubeEmbed embedId="fGx6K90TmCI" />
      );
    } else if (winwin === 'O') {
      return (
        <YoutubeEmbed embedId="Hr4wz4-27PY" />
      );
    } else {
      return null;
    }
  }
  
  return (
    <div>
      <div className="game game-title"><span>Tic-Tac-Toe</span></div>
      <div className="game">
        <div className="game-board">
          <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay}/>
        </div>
        <div className="game-info">
          <ol>{moves}</ol>
        </div>
      </div>
        <div className="game" style={{marginTop: '20px'}}>
          <DMX />
        </div>
    </div>
  );
}

