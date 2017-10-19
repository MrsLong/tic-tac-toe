import React from "react";

const PlayerTurn = props => (
  <div
    className={`player-turns__player player-turns__player--${props.player} ${props.turn ===
    props.player
      ? "player-turns__player--active"
      : null}`}
  >
    {props.player}
  </div>
);

export default PlayerTurn;
