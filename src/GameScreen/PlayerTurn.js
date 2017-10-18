import React from "react";

const PlayerTurn = props => (
  <p
    className={`player player${props.player} ${props.turn === props.player
      ? "game-screen__active-player"
      : null}`}
  >
    {props.player}
  </p>
);

export default PlayerTurn;
