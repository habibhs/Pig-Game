'use strict';

//selecting element
const player0El = document.querySelector('.player-0');
const player1El = document.querySelector('.player-1');
const score0El = document.querySelector('#score-0');
const score0E2 = document.querySelector('#score-1');

const current0El = document.getElementById('current-0');
const current1El = document.getElementById('current-1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

//starting Condition
score0El.textContent = 0;
score0E2.textContent = 0;
diceEl.classList.add('hidden');

let scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let playing = true;

btnNew.addEventListener('click', function () {
  current0El.textContent = 0;
  current1El.textContent = 0;
  score0El.textContent = 0;
  score0E2.textContent = 0;
  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');

  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;
});

const switchPlayer = function () {
  document.getElementById(`current-${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  console.log(activePlayer);
  currentScore = 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

//rolling dice funtionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    //1. gererating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    //2. Display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    //3.Check for rolled 1: if true, switch to next Player
    if (dice !== 1) {
      //add dice to current score
      currentScore = currentScore + dice;
      document.getElementById(`current-${activePlayer}`).textContent =
        currentScore;
    } else {
      // switch to next player
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  console.log('hold button pressed');

  if (playing) {
    //1. add current score to active player's score
    scores[activePlayer] += currentScore;
    document.getElementById(`score-${activePlayer}`).textContent =
      scores[activePlayer];

    //2. check player score 100 or not
    if (scores[activePlayer] >= 30) {
      playing = false;
      console.log(scores[activePlayer]);
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player-${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player-${activePlayer}`)
        .classList.remove('player--active');
    } else {
      switchPlayer();
    }
  }
});
