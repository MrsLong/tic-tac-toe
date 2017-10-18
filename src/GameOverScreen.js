import React from "react";
import findWinner from "./utils/findWinner.js";

const GameOverScreen = props => {
  const winner = findWinner(props.cells);
  let message = `${winner} won the game!`;
  if (winner === false) {
    message = "The game was a draw.";
  }
  return (
    <div>
      <p>{message}</p>
      <button onClick={props.resetState}>Quit</button>
      <button onClick={props.resetAndStart}>Restart</button>
    </div>
  );
};

export default GameOverScreen;
