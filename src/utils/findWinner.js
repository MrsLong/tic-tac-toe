// For a deeper look into the thought processs behind this function, check out:
// https://github.com/MrsLong/tic-tac-toe#testing-the-lines

import cellsToLines from "./cellsToLines.js";
import CellState from "../enums/CellState.js";
import Player from "../enums/Player.js";

// Can't extend Error because Babel doesn't let you do instanceof checks.
// https://stackoverflow.com/q/33870684
export class GameNotOverError {}

export default cells => {
  const lines = cellsToLines(cells);
  const isAnyLine = state =>
    lines.some(line => line.every(cellState => cellState === state));

  if (isAnyLine(CellState.X)) {
    return Player.X;
  }

  if (isAnyLine(CellState.O)) {
    return Player.O;
  }

  if (cells.some(cellState => cellState === CellState.Blank)) {
    throw new GameNotOverError();
  }

  return false;
};
