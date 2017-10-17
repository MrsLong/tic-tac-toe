import cellsToLines from "./cellsToLines.js";
import CellState from "../enums/CellState.js";

const { X, O, Blank: B } = CellState;

test("it exists", () => {
  expect(typeof cellsToLines).toBe("function");
});

test("it splits a 2x2 board", () => {
  expect(
    //prettier-ignore
    cellsToLines([
      B, X,
      O, B
    ])
  ).toEqual([[B, X], [O, B], [B, O], [X, B], [B, B], [X, O]]);
});

test("it splits a 3x3 board", () => {
  expect(
    //prettier-ignore
    cellsToLines([
      X, O, B,
      B, O, O,
      X, X, B
    ])
  ).toEqual([
    [X, O, B],
    [B, O, O],
    [X, X, B],
    [X, B, X],
    [O, O, X],
    [B, O, B],
    [X, O, B],
    [B, O, X]
  ]);
});
