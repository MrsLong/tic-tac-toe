import findWinner, { GameNotOverError } from "./findWinner.js";
import CellState from "../enums/CellState.js";
import Player from "../enums/Player.js";

const { X, O, Blank: B } = CellState;

test("it exists", () => {
  expect(typeof findWinner).toBe("function");
});

test("it determines player X wins", () => {
  expect(
    //prettier-ignore
    findWinner([
      X, O, O,
      X, B, X,
      X, O, O
    ])
  ).toBe(Player.X);
});

test("it determines player O wins", () => {
  expect(
    //prettier-ignore
    findWinner([
      X, O, O,
      X, B, X,
      O, O, O
    ])
  ).toBe(Player.O);
});

test("it determines there is a draw", () => {
  expect(
    //prettier-ignore
    findWinner([
      X, O, X,
      X, X, O,
      O, X, O
    ])
  ).toBe(false);
});

test("it determines game is not over yet", () => {
  expect(
    //prettier-ignore
    () => findWinner([
      B, B, X,
      B, X, O,
      O, B, X
    ])
  ).toThrow(GameNotOverError);
});

// try {
//   const winner = findWinner(cells);
//   if (!winner) {
//     alert('it is a draw')
//   }
//   else {
//     alert(winner);
//   }
// } catch(err) {
//   if (err === 'continue playing') {
//     game.continue();
//   }
// }
