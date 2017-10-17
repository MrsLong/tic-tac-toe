import React, { Component } from "react";
import "./App.css";
import GameScreen from "./GameScreen.js";
import SplashScreen from "./SplashScreen.js";
import GameOverScreen from "./GameOverScreen.js";
import GameState from "./enums/GameState.js";

class App extends Component {
  state = {
    gameState: GameState.SplashScreen
  };

  startPlaying = () => this.setState({ gameState: "GameScreen" });

  render() {
    return (
      <div className="container">
        <h1>Tic Tac Toe</h1>

        {this.state.gameState === GameState.SplashScreen ? (
          <SplashScreen startPlaying={this.startPlaying} />
        ) : null}

        {this.state.gameState === GameState.GameScreen ? <GameScreen /> : null}

        {this.state.gameState === GameState.GameOverScreen ? (
          <GameOverScreen />
        ) : null}
      </div>
    );
  }
}

export default App;
