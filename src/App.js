import React, { Component } from "react";
import "./App.css";
import GameScreen from "./GameScreen.js";
import SplashScreen from "./SplashScreen.js";
import GameOverScreen from "./GameOverScreen.js";

class App extends Component {
  state = {
    gameState: "SplashScreen" // SplashScreen, GameScreen, GameOverScreen
  };

  startPlaying = () => this.setState({ gameState: "GameScreen" });

  render() {
    return (
      <div className="container">
        <h1>Tic Tac Toe</h1>

        {this.state.gameState === "SplashScreen" ? (
          <SplashScreen startPlaying={this.startPlaying} />
        ) : null}

        {this.state.gameState === "GameScreen" ? <GameScreen /> : null}

        {this.state.gameState === "GameOverScreen" ? <GameOverScreen /> : null}
      </div>
    );
  }
}

export default App;
