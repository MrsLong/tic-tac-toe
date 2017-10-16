import React, { Component } from "react";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div>
        <head>
          <meta />
          <title>Tic Tac Toe</title>
        </head>

        <body>
          <div className="container">
            <h1>Tic Tac Toe</h1>
            <p className="rules">
              How to play: Two players begin with the symbols X and O. Players
              alternate turns placing thier symbol until one player has three in
              a row, or all nine squares have been filled.
            </p>
            <div className="board">
              <button className="cell cell1">1</button>
              <button className="cell cell2">2</button>
              <button className="cell cell3">3</button>
              <button className="cell cell4">4</button>
              <button className="cell cell5">5</button>
              <button className="cell cell6">6</button>
              <button className="cell cell7">7</button>
              <button className="cell cell8">8</button>
              <button className="cell cell9">9</button>
            </div>
            <p className="player playerX">X</p>
            <p className="player playerO">O</p>
          </div>
        </body>
      </div>
    );
  }
}

export default App;
