import React from "react";
import findWinner from "./utils/findWinner.js";

const GameOverScreen = props => {
  const winner = findWinner(props.cells);
  let message = `${winner} won the game!`;
  if (winner === false) {
    message = "The game was a draw.";
  }
  return (
    <div className="game-over-screen">
      <p className="game-over-screen__message">{message}</p>
      <button className="button button--restart" onClick={props.resetAndStart}>
        Restart
      </button>
      <button className="button button--quit" onClick={props.resetState}>
        Quit
      </button>
    </div>
  );
};

export default GameOverScreen;
