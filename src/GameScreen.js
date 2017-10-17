import React from "react";

const Board = props => (
  <div>
    <div className="board">
      {props.cells.map((cellState, i) => (
        <button className={`cell cell${i}`}>{cellState}</button>
      ))}
    </div>
    <p className="player playerX">X</p>
    <p className="player playerO">O</p>
  </div>
);

export default Board;
