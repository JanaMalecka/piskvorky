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
  } else {
    event.target.classList.add('board__field--cross');
    move = 'circle';
    whoPlaysElm.src = 'circle.svg';
    event.target.disabled = true;
  }
};

for (let i = 0; i < boardFieldElms.length; i++) {
  boardFieldElms[i].addEventListener('click', selectBoardField);
}
