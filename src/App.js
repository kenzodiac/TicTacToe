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

