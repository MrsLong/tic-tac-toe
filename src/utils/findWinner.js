import cellsToLines from "./cellsToLines.js";
import CellState from "../enums/CellState.js";
import Player from "../enums/Player.js";

export class GameNotOverError extends Error {}

export default cells => {
  const lines = cellsToLines(cells);

  if (lines.some(line => line.every(cellState => cellState === CellState.X))) {
    return Player.X;
  }

  if (lines.some(line => line.every(cellState => cellState === CellState.O))) {
    return Player.O;
  }

  if (cells.some(cellState => cellState === CellState.Blank)) {
    throw new GameNotOverError();
  }

  return false;
};
