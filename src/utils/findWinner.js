import cellsToLines from "./cellsToLines.js";
import CellState from "../enums/CellState.js";
import Player from "../enums/Player.js";

export class GameNotOverError extends Error {}

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
