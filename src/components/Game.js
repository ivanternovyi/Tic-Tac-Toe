import React, { useState } from "react";
import { calculateWinner } from "../helper.js"
import Board from "./Board";

const Game = () => {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXisNext] = useState(true);
  const winner = calculateWinner(history[stepNumber]);
  const xO = xIsNext ? "X" : "O";

  const handleClick = (i) => {
    const historyPoint = history.slice(0, stepNumber + 1);
    const current = historyPoint[stepNumber];
    const squares = [...current];

    // return if won or occupied
    if (winner || squares[i]) return;

    // select the square
    squares[i] = xO;
    setHistory([...historyPoint, squares]);
    setStepNumber(historyPoint.length);
    setXisNext(!xIsNext);
  }

  const goToStep = (step) => {
    setStepNumber(step);
    setXisNext(step % 2 === 0);
  };
 
  const renderHistory = () => (
    history.map((_step, index) => {
      const destination = index ? `Go to move #${index}` : "Go to start";

      return (
        <li key={index}>
          <button onClick={() => goToStep(index)}>
            {destination}
          </button>
        </li>
      );
    })
  );

  return (
    <>
      <h1 className="info-header">Tic-Tac-Toe</h1>
      <Board squares={history[stepNumber]} onClick={handleClick} />
      <div className="info-wrapper">
        <div>
          <h3>History</h3>
          {renderHistory()}
        </div>
        <h3>{winner ? "Winner" + winner : "Next player: " + xO}</h3>
      </div>
    </>
  )
};

export default Game;
