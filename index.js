'use strict!';

console.log('funguju');

let move = 'circle';
const boardFieldElms = document.querySelectorAll('.board__field');

const circleElm = document.querySelector('.circle');
const crossElm = document.querySelector('.cross');

const selectBoardField = (event) => {
  if (move === 'circle') {
    event.target.classList.add('.board__field--circle');
    /* event.target.innerHTML = `<img src="circle.svg" alt="kolečko" class="circle" />`; */
    move = 'cross';
  } else {
    event.target.classList.add('.board__field--cross');
    event.target.innerHTML = `<img src="cross.svg" alt="křížek" class="cross">`;
    move = 'circle';
  }
  event.target.removeEventListener('click', selectBoardField);
  event.target.disabled = true;
};

for (let i = 0; i < boardFieldElms.length; i++) {
  boardFieldElms[i].addEventListener('click', selectBoardField);
}
