import React, { Component } from "react";
import "./App.css";
import GameScreen from "./GameScreen.js";
import SplashScreen from "./SplashScreen.js";
import GameOverScreen from "./GameOverScreen.js";
import GameState from "./enums/GameState.js";
import CellState from "./enums/CellState.js";
import { times } from "lodash/util";
import Player from "./enums/Player.js";
import findWinner, { GameNotOverError } from "./utils/findWinner.js";

const createInitialState = () => ({
  gameState: GameState.SplashScreen,
  cells: times(9, () => CellState.Blank),
  turn: [Player.X, Player.O][Math.round(Math.random())]
});

class App extends Component {
  state = createInitialState();

  startPlaying = () => this.setState({ gameState: "GameScreen" });

  resetState = () => this.setState(createInitialState());

  resetAndStart = () => {
    this.resetState();
    this.startPlaying();
  };

  cellChosen = i => {
    this.setState(previousState => {
      const oldCells = previousState.cells;
      const chosenCell = oldCells[i];
      if (chosenCell !== CellState.Blank) {
        return previousState;
      }
      const currentTurn = previousState.turn;
      let newCellState;
      switch (currentTurn) {
        case Player.X:
          newCellState = CellState.X;
          break;
        case Player.O:
          newCellState = CellState.O;
          break;
        default:
          newCellState = CellState.Blank;
          break;
      }
      const newCells = oldCells.slice();
      newCells[i] = newCellState;

      try {
        findWinner(newCells);
        return {
          gameState: GameState.GameOverScreen
        };
      } catch (err) {
        if (err instanceof GameNotOverError) {
          const nextTurn = currentTurn === Player.X ? Player.O : Player.X;
          return {
            turn: nextTurn,
            cells: newCells
          };
        }
        throw err;
      }
    });
  };

  render() {
    return (
      <div className="container">
        <h1>Tic Tac Toe</h1>

        {this.state.gameState === GameState.SplashScreen ? (
          <SplashScreen startPlaying={this.startPlaying} />
        ) : null}

        {this.state.gameState === GameState.GameScreen ? (
          <GameScreen
            cells={this.state.cells}
            turn={this.state.turn}
            cellChosen={this.cellChosen}
          />
        ) : null}

        {this.state.gameState === GameState.GameOverScreen ? (
          <GameOverScreen
            resetState={this.resetState}
            resetAndStart={this.resetAndStart}
          />
        ) : null}
      </div>
    );
  }
}

export default App;
