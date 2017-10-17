import React from "react";

const Board = () => (
  <div>
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
);

export default Board;
