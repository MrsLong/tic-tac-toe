export default cells => {
  const result = [];
  const s = Math.sqrt(cells.length);

  //rows
  for (let i = 0; i < s; i++) {
    let row = cells.slice(i * s, (i + 1) * s);
    result.push(row);
  }

  //columns
  for (let i = 0; i < s; i++) {
    let col = [];
    for (let j = 0; j < s; j++) {
      col.push(cells[j * s + i]);
    }
    result.push(col);
  }

  //diagonalOne
  let diaOne = [];
  for (let i = 0; i < s; i++) {
    diaOne.push(cells[i * s + i]);
  }
  result.push(diaOne);

  //diagonalTwo
  let diaTwo = [];
  for (let i = 0; i < s; i++) {
    diaTwo.push(cells[(i + 1) * s - (i + 1)]);
  }
  result.push(diaTwo);

  return result;
};
