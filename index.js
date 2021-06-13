'use strict!';

console.log('funguju');

let move = 'circle';
const boardFieldElms = document.querySelectorAll('.board__field');

const whoPlaysElm = document.querySelector('.who-plays');

const selectBoardField = (event) => {
  if (move === 'circle') {
    event.target.classList.add('board__field--circle');
    /* event.target.innerHTML = `<img src="circle.svg" alt="kolečko" class="circle" />`; //takto bila barva*/
    move = 'cross';
    whoPlaysElm.src = 'cross.svg';
    event.target.disabled = true;

    if (isWinningMove(event.target)) {
      setTimeout(() => {
        let confirmation = confirm('Vyhrálo kolečko. Hrát znovu?');
        if (confirmation === true) {
          location.reload();
        }
      }, 400);
    }
  } else {
    event.target.classList.add('board__field--cross');
    move = 'circle';
    whoPlaysElm.src = 'circle.svg';
    event.target.disabled = true;

    if (isWinningMove(event.target)) {
      setTimeout(() => {
        let confirmation = confirm('Vyhrál křížek. Hrát znovu?');
        if (confirmation === true) {
          location.reload();
        }
      }, 400);
    }
  }
};

for (let i = 0; i < boardFieldElms.length; i++) {
  boardFieldElms[i].addEventListener('click', selectBoardField);
}

const getSymbol = (field) => {
  if (field.classList.contains('board__field--cross')) {
    return 'cross';
  } else if (field.classList.contains('board__field--circle')) {
    return 'circle';
  }
};

const boardSize = 10;
const fields = document.querySelectorAll('.board__field');
const getField = (row, column) => fields[row * boardSize + column];

const getPosition = (field) => {
  let fieldIndex = 0;
  while (fieldIndex < fields.length && field !== fields[fieldIndex]) {
    fieldIndex++;
  }
  return {
    row: Math.floor(fieldIndex / boardSize),
    column: fieldIndex % boardSize,
  };
};

const symbolsToWin = 5;
const isWinningMove = (field) => {
  const origin = getPosition(field);
  const symbol = getSymbol(field);

  let i;

  let inRow = 1; // Jednička pro právě vybrané políčko
  // Koukni doleva
  i = origin.column;
  while (i > 0 && symbol === getSymbol(getField(origin.row, i - 1))) {
    inRow++;
    i--;
  }

  // Koukni doprava
  i = origin.column;
  while (
    i < boardSize - 1 &&
    symbol === getSymbol(getField(origin.row, i + 1))
  ) {
    inRow++;
    i++;
  }

  if (inRow >= symbolsToWin) {
    return true;
  }

  let inColumn = 1;
  // Koukni nahoru
  i = origin.row;
  while (i > 0 && symbol === getSymbol(getField(i - 1, origin.column))) {
    inColumn++;
    i--;
  }

  // Koukni dolu
  i = origin.row;
  while (
    i < boardSize - 1 &&
    symbol === getSymbol(getField(i + 1, origin.column))
  ) {
    inColumn++;
    i++;
  }

  if (inColumn >= symbolsToWin) {
    return true;
  }

  let DiagonallyUpLeftToRight = 1; // Jednička pro právě vybrané políčko
  // KOUKNI DOPRAVA NAHORU
  let r = origin.row;
  let c = origin.column;
  while (
    r > 0 &&
    c < boardSize - 1 &&
    symbol === getSymbol(getField(r - 1, c + 1))
  ) {
    DiagonallyUpLeftToRight += 1;
    r -= 1;
    c += 1;
    console.log(DiagonallyUpLeftToRight);
  }
  // KOUKNI DOLEVA DOLŮ
  r = origin.row;
  c = origin.column;
  while (
    c > 0 &&
    r < boardSize - 1 &&
    symbol === getSymbol(getField(r + 1, c - 1))
  ) {
    DiagonallyUpLeftToRight += 1;
    r += 1;
    c -= 1;
    console.log(DiagonallyUpLeftToRight);
  }

  if (DiagonallyUpLeftToRight >= symbolsToWin) {
    return true;
  }

  let DiagonallyUpRightToLeft = 1;
  // KOUKNI DOLEVA NAHORU
  r = origin.row;
  c = origin.column;
  while (r > 0 && c > 0 && symbol === getSymbol(getField(r - 1, c - 1))) {
    DiagonallyUpRightToLeft += 1;
    r -= 1;
    c -= 1;
    console.log(DiagonallyUpRightToLeft);
  }

  // KOUKNI DOPRAVA DOLŮ
  r = origin.row;
  c = origin.column;
  while (
    r < boardSize - 1 &&
    c < boardSize - 1 &&
    symbol === getSymbol(getField(r + 1, c + 1))
  ) {
    DiagonallyUpRightToLeft += 1;
    r += 1;
    c += 1;
    console.log(DiagonallyUpRightToLeft);
  }

  if (DiagonallyUpRightToLeft >= symbolsToWin) {
    return true;
  }

  return false;
};
