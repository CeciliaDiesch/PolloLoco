let canvas;
let ctx; //abkürzung context
let world;
let keyboard = new Keyboard(); //hiermit erstellen wir eine Instanz von der class
let intervalIds = [];
i = 1;

/*function setStoppableInterval(fn, time) {
  let id = setInterval(fn, time);
  intervalIds.push(id);
}*/

let gameStarted = false;
let gameStatusPause = false;
let helpWindowActive = false;

function playPauseGame() {
  if (helpWindowActive) return;
  document.getElementById('overlay').style.display = 'block';
  const startButton = document.querySelector('.startButton');
  if (!gameStarted) {
    document.getElementById('start-button').innerText = 'Pause';
    startButton.classList.add('pause');
    initLevel1();
    init();
    gameStarted = true;
    gameStatusPause = false;
    document.getElementById('buttonContainerMobilePlay').classList.add('mobileSee');
    document.getElementById('main-Buttons').classList.remove('mainButtonsStart');
  } else {
    if (!gameStatusPause) {
      document.getElementById('start-button').innerText = 'Play';
      startButton.classList.remove('pause');
      gameStatusPause = true;
    } else {
      document.getElementById('start-button').innerText = 'Pause';
      startButton.classList.add('pause');
      gameStatusPause = false;
    }
  }
}

function restartGame() {
  if (helpWindowActive) return;
  document.getElementById('overlay').style.display = 'none';

  location.reload();
}

function showExplanation() {
  const helpOverlay = document.getElementById('help-overlay');
  const startButton = document.getElementById('start-button');
  const restartButton = document.getElementById('restart-button');
  const explanationButton = document.querySelector('.explanationButton');
  if (!helpWindowActive) {
    gameStatusPause = true;
    helpWindowActive = true;
    document.getElementById('explanation-button').innerText = 'Back';
    document.getElementById('canvas').style.display = 'none';
    helpOverlay.style.display = 'block';
    startButton.classList.add('disabled-button');
    restartButton.classList.add('disabled-button');
    explanationButton.classList.add('back');
  } else {
    helpWindowActive = false;
    document.getElementById('explanation-button').innerText = 'Help';

    helpOverlay.style.display = 'none';
    document.getElementById('canvas').style.display = 'block';
    startButton.classList.remove('disabled-button');
    restartButton.classList.remove('disabled-button');
    explanationButton.classList.remove('back');
    if (gameStarted) {
      document.getElementById('start-button').innerText = 'Pause';
      gameStatusPause = false;
    }
  }
}

function init() {
  canvas = document.getElementById('canvas');
  world = new World(canvas, keyboard); // wir übergeben die variable canvas und keyboard an unsere Welt
}

window.addEventListener('keydown', (event) => {
  if (event.code == 'Space') {
    keyboard.SPACE = true;
  }
  if (event.code == 'ArrowRight') {
    keyboard.RIGHT = true;
  }
  if (event.code == 'ArrowLeft') {
    keyboard.LEFT = true;
  }
  if (event.code == 'ArrowUp') {
    keyboard.UP = true;
  }
  if (event.code == 'ArrowDown') {
    keyboard.DOWN = true;
  }
  if (event.code == 'KeyX') {
    keyboard.X = true;
  }
  console.log(event);
});

window.addEventListener('keyup', (event) => {
  if (event.code == 'Space') {
    keyboard.SPACE = false;
  }
  if (event.code == 'ArrowRight') {
    keyboard.RIGHT = false;
  }
  if (event.code == 'ArrowLeft') {
    keyboard.LEFT = false;
  }
  if (event.code == 'ArrowUp') {
    keyboard.UP = false;
  }
  if (event.code == 'ArrowDown') {
    keyboard.DOWN = false;
  }
  if (event.code == 'KeyX') {
    keyboard.X = false;
    keyboard.xWasPressed = false;
  }
  /*console.log(event);*/
});

let rightInterval;
function clickArrowRight() {
  rightInterval = setInterval(() => {
    keyboard.RIGHT = true;
  }, 100);
}

function stopArrowRight() {
  clearInterval(rightInterval);
  keyboard.RIGHT = false;
}

document.addEventListener('DOMContentLoaded', () => {
  const btnRight = document.getElementById('button-right');
  btnRight.addEventListener('pointerdown', clickArrowRight);
  btnRight.addEventListener('pointerup', stopArrowRight);
  btnRight.addEventListener('pointerleave', stopArrowRight);
});

let leftInterval;
function clickArrowLeft() {
  leftInterval = setInterval(() => {
    keyboard.LEFT = true;
  }, 100);
}

function stopArrowLeft() {
  clearInterval(leftInterval);
  keyboard.LEFT = false;
}

document.addEventListener('DOMContentLoaded', () => {
  const btnLeft = document.getElementById('button-left');
  btnLeft.addEventListener('pointerdown', clickArrowLeft);
  btnLeft.addEventListener('pointerup', stopArrowLeft);
  btnLeft.addEventListener('pointerleave', stopArrowLeft);
});

let spaceInterval;
function clickSpace() {
  spaceInterval = setInterval(() => {
    keyboard.SPACE = true;
  }, 100);
}

function stopSpace() {
  clearInterval(spaceInterval);
  keyboard.SPACE = false;
}

document.addEventListener('DOMContentLoaded', () => {
  const btnSpace = document.getElementById('button-space');
  btnSpace.addEventListener('pointerdown', clickSpace);
  btnSpace.addEventListener('pointerup', stopSpace);
  btnSpace.addEventListener('pointerleave', stopSpace);
});

let throwInterval;
function clickX() {
  throwInterval = setInterval(() => {
    keyboard.X = true;
  }, 100);
}

function stopX() {
  clearInterval(throwInterval);
  keyboard.X = false;
  keyboard.xWasPressed = false;
}

document.addEventListener('DOMContentLoaded', () => {
  const btnThrow = document.getElementById('button-x');
  btnThrow.addEventListener('pointerdown', clickX);
  btnThrow.addEventListener('pointerup', stopX);
  btnThrow.addEventListener('pointerleave', stopX);
});
