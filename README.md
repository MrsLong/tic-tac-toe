# Tic Tac Toe - A Case Study

I decided to make a Tic-Tac-Toe web app because I wanted to have a standalone
web project that was entirely mine -- no tutorials, no classes, just everything
that I've learned as it comes through in my own raw skills.

[Demo the Tic Tac Toe app here!](https://mrslong.github.io/tic-tac-toe/)

I chose TTT because one of my favorite restaurant pass-times is to play a TTT
variant called Sugar Packet TTT. Eventually I hope to create an app for that
version too.

## Planning

I chose to build the project in React because it was the front-end single page
application framework I'm most comfortable with, and I wanted to get a bit more
practice with it. Of course, the availability of create-react-app meant I didn't
have to fiddle too much with build tools, which let me get straight to hacking.

### Wireframing

I started with some quick sketches of the screens I wanted the app to have,
using the [sneakpeekit.com UI templates](http://sneakpeekit.com).

### Features

Once I had a rough idea of all of the features and screens I wanted, I started
to plan out the steps I'd need to complete the project. I came up with this
initial list:

- Splash Screen
  - Heading
  - Instructions
  - Start Button
    - Starts a new game
    - Makes the game board appear
    - Selects a random starting player
    - Hides the splash screen
- Game Screen
  - The Board
    - 3x3 Grid
    - Each cell starts empty
    - When a cell is clicked:
      - If it's blank, it adds the symbol of the active player and passes the turn
      - If it's not blank, nothing happens.
  - Players
    - X and O each have a corner at the bottom
  - Turn Tracker
    - The player area "highlights" the active player
      - Zoom? Color? etc.
- Win/Lose Screen
  - Figure out who wins
  - Winner call-out
  - Miniature game-board
    - Shows the winning cells (line, blinking, etc?)
  - Quit Button
    - Reset app as if just loaded
  - Replay Button
    - Reset game as if just loaded and then Start Button was clicked

Measure twice, cut once. :)

## Developing

With the sketches and planning out of the way, it was time to code! I started by
getting the very basic UI elements that I wanted laid out in HTML with a very
minimal amount of CSS, basically just enough to make it recognizable as a TTT
board. I got to try out CSS Grid for this project, but I know I only scratched
the surface of what it's capable of. I'm excited to dive deeper into it!

### Decisions

Decisions I had to make while creating this app included:

- Picking a data structure to represent the TTT board
- Choosing how to represent the rest of the app state such as which screen
  to show or whose turn it is
- How best to handle user interaction with the game board
- After every move, determining if there is a winner

I chose to represent my TTT board as a single array of nine values, because it
would make it easier to loop over when rendering the board in React. The array
contained the closest thing JavaScript has to enums: classes with static
properties.

```js
class CellState {
  static X = "X"
  static O = "O"
  static Blank = ""
}
```

Once I had the core data structure, I had to decide how to track the rest of the
app's state. As it turns out, all I'd need were two more pieces of state: the
current turn, and the current app screen. Since the three screens aren't
designed to be linked to and I don't really want the browser's back/forward
buttons to do anything within the app, I chose not to use React Router for this
project. Similarly, because the app state is so simple, Redux would have been
overkill.

### Detecting A Winner

After hooking up the app state to the UI I had built and creating the necessary
components and event handlers to make the game function, I finally hit the juicy
problem: winner detection. As a self-taught programmer who enjoyed mathematics
and statistics in high school but got a fine arts degree in college, these
kinds of problems are both exhilerating and eerily familiar.

I know that TTT is a solved problem, so I made sure not to look at any tutorials
or algorithms before creating the initial version of the app and writing this
blog post. 

I started by brainstorming what kinds of things I needed to worry about with the
`findWinner` function. It would need to take the array of cell states as input.
It should return that `Player.X` won, `Player.Y` won, it was a draw, or the game
needed to continue.

As I thought about how to iterate through the rows and columns of a TTT board,
I realized that the way I think about it naturally lends itself better to a
multi-dimensional array than a single flat array.

Once I had the matrix array, I would need to check and see if any of them all
have the same cell state. If none of them were matches, then either there are
still blank cells (the game isn't over), or the board is full (the game is a
draw).

#### Testing The Lines

I described the algorithm as such:

0. Break the array down into lines of cells
0. For each line:
    - If all elements are `CellState.X`, `return Player.X`
    - If all elements are `CellState.O`, `return Player.O`
0. If any cells in the array are `CellState.Blank`, `return false`
0. `throw` a `GameNotOverError`

This is a pretty succinct algorithm, and it's pretty easy to imagine how one
could code this up. As of this blog post, the code is as follows:

```js
const findWinner = cells => {
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
```

As you can see, I decided to use errors for control flow, because one of the
possible outcomes for the function (the game is not over) is unlike the other
three--the game should stay in the `GameScreen` state, rather than transitioning
to the `GameOver` state. This allowed me to use `try`/`catch` elegantly when I
called this method at the end of each turn.

#### Turning A Flat Array Into A Matrix

Of course, this left me with one black box that I still had to open: the
`cellsToLines` function. To create the multi-dimensional array that `findWinner`
expects, I needed an algorithm (that would become `cellsToLines`) to take an
array of N elements, where N is a perfect square, and return its √N rows,
√N columns, and the 2 diagonals. This would result in 2√N+2 arrays of √N items.

I sketched out a quick visual reference to represent how the elements of my flat
array would end up in the grid, and referenced it often while planning this out.
I'll repeat this visual for each of the rows, columns, and diagonals for easy
reference.

##### Rows

```
+---+---+---+
| 0 | 1 | 2 |
+---+---+---+
| 3 | 4 | 5 |
+---+---+---+
| 6 | 7 | 8 |
+---+---+---+
```

For the rows of a 3x3 grid, I would want: `[0, 1, 2]`, `[3, 4, 5]`, and
`[6, 7, 8]`. As a function of N this could be represented as `0 -> √N-1`,
`√N -> 2√N - 1`, and `2√N -> 3√N - 1`.  With a plan to iterate over the integers
from `0 -> √N - 1`, I could express all of those as a function of `√N` and `i`:

```
i * √N -> (i + 1) * √N - 1
```

In JavaScript, the `Array.prototype.slice` method does _not_ include the item at
the index you stop at, so you must add 1 (negating the `- 1` above).

```js
const result = [];
const s = Math.sqrt(cells.length);
for (let i = 0; i < s; i++) {
  let row = cells.slice(i * s, (i + 1) * s);
  result.push(row);
}
```

##### Columns

```
+---+---+---+
| 0 | 1 | 2 |
+---+---+---+
| 3 | 4 | 5 |
+---+---+---+
| 6 | 7 | 8 |
+---+---+---+
```

For the column of a 3x3 grid, I would want: `[0, 3, 6]`, `[1, 4, 7]`, and
`[2, 5, 8]`. As a function of N this could be represented as `[0, √N, 2√N]`,
`[0+1, √N+1, 2√N+1]`, and `[0+2, √N+2, 2√N+2]`. With a plan to iterate over the
integers from `0 -> √N - 1`, I could express all of those as a function of `√N`
and `i`:

```
[i, √N + 1, √N + 2]
```

Of course, this shows that another nested iteration from `0 -> √N - 1` would
allow me to express all of those as a single function of `√N`, `i`, and `j`:

```
j * √N + i
```

In JavaScript:

```js
const result = [];
const s = Math.sqrt(cells.length);
for (let i = 0; i < s; i++) {
  let col = [];
  for (let j = 0; j < s; j++) {
    col.push(cells[j * s + i]);
  }
  result.push(col);
}
```

##### Diagonals

```
+---+---+---+
| 0 | 1 | 2 |
+---+---+---+
| 3 | 4 | 5 |
+---+---+---+
| 6 | 7 | 8 |
+---+---+---+
```

For the first diagonal of a 3x3 grid, I would want `[0, 4, 8]`. As a function of
N this could be represented as `[0, √N + 1, 2√N + 2]`. With a plan to iterate
over the integers from `0 -> √N - 1`, I could express all of those as a function
of `√N` and `i`:

```
i * √N + i
```

For the next diagonal, I would want `[2, 4, 6]`. As a function of N this could
be represented as `[√N - 1, 2√N - 2, 3√N - 3]`. With a plan to iterate over the
integers from `0 -> √N - 1`, I could express all of those as a function of `√N`
and `i`:

```
(i + 1) * √N - (i + 1)
```

In JavaScript:

```js
const result = [];
const s = Math.sqrt(cells.length);

// diagonalOne
let diaOne = [];
for (let i = 0; i < s; i++) {
  diaOne.push(cells[i * s + i]);
}
result.push(diaOne);

// diagonalTwo
let diaTwo = [];
for (let i = 0; i < s; i++) {
  diaTwo.push(cells[(i + 1) * s - (i + 1)]);
}
result.push(diaTwo);
```

And that's it! Now all I needed to do was hook up the winner detection logic to
the same series of events that happen every time a player takes a turn.

## What's Next?

The app is functional
([play with it here!](https://mrslong.github.io/tic-tac-toe/)), but I've still
got plans to make it beautiful. I'm going to be practicing my CSS chops with
this app next, so don't be surprised when you load it up and it's prettier than
the day before. :)