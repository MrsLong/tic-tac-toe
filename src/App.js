import React, { Component } from "react";
import "./App.css";
import GameScreen from "./GameScreen.js";
import SplashScreen from "./SplashScreen.js";
import GameOverScreen from "./GameOverScreen.js";
import GameState from "./enums/GameState.js";
import CellState from "./enums/CellState.js";
import { times } from "lodash/util";

class App extends Component {
  state = {
    gameState: GameState.SplashScreen,
    cells: times(9, () => CellState.Blank)
  };

  startPlaying = () => this.setState({ gameState: "GameScreen" });

  render() {
    return (
      <div className="container">
        <h1>Tic Tac Toe</h1>

        {this.state.gameState === GameState.SplashScreen ? (
          <SplashScreen startPlaying={this.startPlaying} />
        ) : null}

        {this.state.gameState === GameState.GameScreen ? (
          <GameScreen cells={this.state.cells} />
        ) : null}

        {this.state.gameState === GameState.GameOverScreen ? (
          <GameOverScreen />
        ) : null}
      </div>
    );
  }
}

export default App;
