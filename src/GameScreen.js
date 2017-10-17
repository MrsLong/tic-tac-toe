import React from "react";
import Player from "./enums/Player.js";

const GameScreen = props => (
  <div>
    <div className="board">
      {props.cells.map((cellState, i) => (
        <button key={i} className={`cell cell${i}`}>
          {cellState}
        </button>
      ))}
    </div>
    <p
      className={`player playerX ${props.turn === Player.X
        ? "active-player"
        : null}`}
    >
      X
    </p>
    <p
      className={`player playerO ${props.turn === Player.O
        ? "active-player"
        : null}`}
    >
      O
    </p>
  </div>
);

export default GameScreen;
