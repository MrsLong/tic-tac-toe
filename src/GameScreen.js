import React from "react";
import Player from "./enums/Player.js";
import PlayerTurn from "./GameScreen/PlayerTurn.js";

const GameScreen = props => (
  <div className="game-screen">
    <div className="game-screen__game-board game-board">
      {props.cells.map((cellState, i) => (
        <button
          key={i}
          className={`cell cell${i} game-board__button`}
          onClick={() => props.cellChosen(i)}
        >
          <p className={`player player--${cellState}`}>{cellState}</p>
        </button>
      ))}
    </div>
    <div className="game-screen__player-turn">
      <PlayerTurn player={Player.X} turn={props.turn} />
      <PlayerTurn player={Player.O} turn={props.turn} />
    </div>
  </div>
);

export default GameScreen;
