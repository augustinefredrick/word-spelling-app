// Word and Hints Object
const options = {
  cat: '<img src="images/cat.jpeg" alt="Meow">',
  dog: '<img src="images/dog.jpeg" alt="Bark">',
  lion: '<img src="images/lion.jpeg" alt="Roar">',
  cattle: '<img src="images/cattle.jpeg" alt="Moo">',
  goat: '<img src="images/goat.jpeg" alt="Bleat">',
  snake: '<img src="images/snake.jpeg" alt="Hiss">',
  horse: '<img src="images/horse.jpeg" alt="Neigh">',
  frog: '<img src="images/frog.jpeg" alt="Croak">',
  fly: '<img src="images/fly.jpeg" alt="Buzz">',
  duck: '<img src="images/duck.jpeg" alt="Quack">',
  chicken: '<img src="images/chicken.jpeg" alt="Cluck">',
};

// Initial References
const message = document.getElementById('message');
const hintRef = document.querySelector('.hint-ref');
const controls = document.querySelector('.controls-container');
const startBtn = document.getElementById('start');
const letterContainer = document.getElementById('letter-container');
const userInput = document.getElementById('user-input-section');
const resultText = document.getElementById('result');
const word = document.getElementById('word');
const words = Object.keys(options);
let randomWord = '',
  randomHint = '';
let winCount = 0,
  lossCount = 0;

// Generate Random value
const generateRandomValue = (array) => Math.floor(Math.random() * array.length);

// Block all the buttons
const blocker = () => {
  let lettersButtons = document.querySelectorAll('.letters');
  stopGame();
};

// Start Game
startBtn.addEventListener('click', () => {
  controls.classList.add('hide');
  init();
});

// Stop Game
const stopGame = () => {
  controls.classList.remove('hide');
};

// Generate Word Function
const generateWord = () => {
  letterContainer.classList.remove('hide');
  userInput.innerText = '';
  randomWord = words[generateRandomValue(words)];
  randomHint = options[randomWord];
  hintRef.innerHTML = `<div id='wordHint'>
  <span></span>${randomHint}</div>`;
  let displayItem = '';
  randomWord.split('').forEach((value) => {
    displayItem += '<span class="inputSpace">_</span>';
  });

  // Display each element as span
  userInput.innerHTML = displayItem;
  userInput.innerHTML += `<div id="chanceCount">Chances Left: ${lossCount}</div>`;
};

// Initial Function
const init = () => {
  winCount = 0;
  lossCount = 5;
  randomWord = '';
  word.innerHTML = '';
  randomHint = '';
  message.innerHTML = '';
  userInput.innerHTML = '';
  letterContainer.classList.add('hide');
  letterContainer.innerHTML = '';
  generateWord();

  // For creating letter buttons
  for (let i = 65; i < 91; i++) {
    let button = document.createElement('button');
    button.classList.add('letters');

    // Number to ASCII[A-Z]
    button.innerHTML = String.fromCharCode(i);

    // Character button onclick
    button.addEventListener('click', () => {
      message.innerText = `Correct Letter`;
      message.style.color = '#008000';
      let charArray = randomWord.toUpperCase().split('');
      let inputSpace = document.getElementsByClassName('inputSpace');

      // If array contains clicked value replace the matched Dash with letter
      if (charArray.includes(button.innerText)) {
        charArray.forEach((char, index) => {
          // If character in array is the same as clicked button
          if (char === button.innerText) {
            button.classList.add('correct');
            // Replace dash with letter
            inputSpace[index].innerText = char;
            // Increment counter
            winCount += 1;
            // If winCount equals length
            setTimeout(() => {
              if (winCount == charArray.length) {
                resultText.innerHTML = 'Congratulation!!! You got it right.';
                startBtn.innerText = 'Restart';
                // block all buttons
                blocker();
              }
            }, 1000);
          }
        });
      } else {
        // loss count
        button.classList.add('incorrect');
        lossCount -= 1;
        document.getElementById(
          'chanceCount'
        ).innerText = `Chances Left: ${lossCount}`;
        message.innerText = `Incorrect Letter`;
        message.style.color = '#ff0000';
        setTimeout(() => {
          if (lossCount == 0) {
            word.innerHTML = `The image was: <span>${randomWord}</span>`;
            resultText.innerHTML = 'Oh! Sorry, You got it wrong';
            blocker();
          }
        }, 1000);
      }

      // Disable clicked buttons
      button.disabled = true;
    });

    // Append generated buttons to the letters container
    letterContainer.appendChild(button);
  }
};

window.onload = () => {
  init();
};
