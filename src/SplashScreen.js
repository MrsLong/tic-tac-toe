import React from "react";

const SplashScreen = props => (
  <div>
    <p className="rules">
      How to play: Two players begin with the symbols X and O. Players alternate
      turns placing thier symbol until one player has three in a row, or all
      nine squares have been filled.
    </p>
    <button onClick={props.startPlaying}>Start</button>
  </div>
);

export default SplashScreen;
