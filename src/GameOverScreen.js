import React from "react";

const GameOverScreen = props => (
  <div>
    <button onClick={props.resetState}>Quit</button>
    <button onClick={props.resetAndStart}>Restart</button>
  </div>
);

export default GameOverScreen;
