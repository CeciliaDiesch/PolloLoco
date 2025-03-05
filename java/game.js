let canvas;
let ctx;
let world;
let keyboard = new Keyboard();
let intervalIds = [];
i = 1;
let gameStarted = false;
let gameStatusPause = true;
let helpWindowActive = false;
let rightInterval;
let leftInterval;
let spaceInterval;
let throwInterval;
document.addEventListener('DOMContentLoaded', () => {
  start_sound = soundManager.start_sound;
  background_sound = soundManager.background_sound;
});

/**
 * Toggles the game state between play and pause by showing the overlay and calling the appropriate function.
 */
function playPauseGame() {
  if (helpWindowActive) return;
  document.getElementById('overlay').style.display = 'block';
  const startButton = document.querySelector('.startButton');
  if (!gameStarted) {
    startGame(startButton);
  } else {
    if (!gameStatusPause) {
      PauseGame(startButton);
    } else {
      playGame(startButton);
    }
  }
}

/**
 * Starts the game by initializing the level, updating the start button, setting game flags, and starting sounds.
 * @param {HTMLElement} startButton - The button element used to start the game.
 */
function startGame(startButton) {
  startButton.innerText = 'Pause';
  startButton.classList.add('pause');
  initLevel1();
  init();
  gameStarted = true;
  document.getElementById('buttonContainerMobilePlay').classList.add('mobileSee');
  document.getElementById('main-Buttons').classList.remove('mainButtonsStart');
  document.getElementById('mainButtonsAndFullscreenButton').classList.add('mobilePosition');
  document.getElementById('canvas').classList.add('backgroundBlur');
  start_sound.play();
}

/**
 * Creates a new world and passes the canvas and global keyboard object to the world constructor.
 * Shows the loading Spinner until all Audios are loaded
 */
function init() {
  showLoadingOverlay();
  canvas = document.getElementById('canvas');
  world = new World(canvas, keyboard);
  waitForAllAudiosToLoad().then(() => {
    const loadingOverlay = document.getElementById('loading-overlay');
    if (loadingOverlay) {
      loadingOverlay.style.display = 'none';
      gameStatusPause = false;
      background_sound.play();
    }
  });
}

/**
 * Displays the loading overlay by setting its display style to "block".
 */
function showLoadingOverlay() {
  const loadingOverlay = document.getElementById('loading-overlay');
  loadingOverlay.style.display = 'flex';
}

/**
 * Pauses the game by updating the start button, setting the game status to paused, and pausing the background sound.
 * @param {HTMLElement} startButton - The button element used to control the game state.
 */
function PauseGame(startButton) {
  startButton.innerText = 'Play';
  startButton.classList.remove('pause');
  gameStatusPause = true;
  background_sound.pause();
}

/**
 * Resumes the game by updating the start button, setting the game status to playing, and restarting the background sound.
 * @param {HTMLElement} startButton - The button element used to control the game state.
 */
function playGame(startButton) {
  startButton.innerText = 'Pause';
  startButton.classList.add('pause');
  gameStatusPause = false;
  background_sound.play();
}

/**
 * Restarts the game by hiding the overlay, stopping the character, and resetting settings and canvas.
 */
function restartGame() {
  if (!gameStarted) return;
  if (helpWindowActive) return;
  const startButton = document.querySelector('.startButton');
  document.getElementById('overlay').style.display = 'none';
  world.character.stopGame();
  resetSettings(startButton);
  resetCanvas();
  gameStarted = false;
  playPauseGame();
}

/**
 * Resets the canvas by removing the existing one and creating a new canvas element with default dimensions and styles.
 */
function resetCanvas() {
  const buttonContainer = document.getElementById('button-container');
  document.getElementById('mainButtonsAndFullscreenButton').classList.remove('mobilePosition');
  const oldCanvas = document.getElementById('canvas');
  const parent = oldCanvas.parentNode;
  parent.removeChild(oldCanvas);
  const newCanvas = document.createElement('canvas');
  newCanvas.id = 'canvas';
  newCanvas.width = 720;
  newCanvas.height = 480;
  newCanvas.className = oldCanvas.className;
  parent.insertBefore(newCanvas, buttonContainer);
}

/**
 * Resets game settings by updating global flags and modifying the start button and related user interface elements.
 * @param {HTMLElement} startButton - The button element used to control the game state.
 */
function resetSettings(startButton) {
  gameStarted = false;
  gameStatusPause = false;
  helpWindowActive = false;
  startButton.innerText = 'Start';
  startButton.classList.remove('pause');
  document.getElementById('buttonContainerMobilePlay').classList.remove('mobileSee');
  document.getElementById('main-Buttons').classList.add('mainButtonsStart');
}

/**
 * Toggles the help overlay: opens it if inactive, otherwise closes it and resumes the game.
 */
function showExplanation() {
  const helpOverlay = document.getElementById('help-overlay');
  const startButton = document.getElementById('start-button');
  const restartButton = document.getElementById('restart-button');
  const explanationButton = document.querySelector('.explanationButton');
  const canvas = document.getElementById('canvas');
  if (!helpWindowActive) {
    openHelp(helpOverlay, startButton, restartButton, explanationButton, canvas);
  } else {
    closeHelp(helpOverlay, startButton, restartButton, explanationButton, canvas);
    if (gameStarted) {
      startButton.innerText = 'Pause';
      gameStatusPause = false;
    }
  }
}

/**
 * Opens the help overlay by pausing the game, hiding the canvas, disabling buttons, and pausing background sound.
 * @param {HTMLElement} helpOverlay - The help overlay element.
 * @param {HTMLElement} startButton - The start button element.
 * @param {HTMLElement} restartButton - The restart button element.
 * @param {HTMLElement} explanationButton - The help button element.
 * @param {HTMLElement} canvas - The canvas element.
 */
function openHelp(helpOverlay, startButton, restartButton, explanationButton, canvas) {
  gameStatusPause = true;
  helpWindowActive = true;
  canvas.style.display = 'none';
  helpOverlay.style.display = 'block';
  startButton.classList.add('disabled-button');
  startButton.classList.add('pause');
  restartButton.classList.add('disabled-button');
  explanationButton.classList.add('back');
  explanationButton.innerText = 'Back';
  background_sound.pause();
}

/**
 * Closes the help overlay by showing the canvas, enabling buttons, and restarting background sound if the game is active.
 * @param {HTMLElement} helpOverlay - The help overlay element.
 * @param {HTMLElement} startButton - The start button element.
 * @param {HTMLElement} restartButton - The restart button element.
 * @param {HTMLElement} explanationButton - The help button element.
 * @param {HTMLElement} canvas - The canvas element.
 */
function closeHelp(helpOverlay, startButton, restartButton, explanationButton, canvas) {
  helpWindowActive = false;
  helpOverlay.style.display = 'none';
  canvas.style.display = 'block';
  startButton.classList.remove('disabled-button');
  restartButton.classList.remove('disabled-button');
  explanationButton.classList.remove('back');
  explanationButton.innerText = 'Help';
  if (gameStarted) {
    background_sound.play();
  }
}

/**
 * Opens the imprint page in the same browser tab.
 */
function showImprint() {
  window.location.href = './templates/imprint.html';
}

/**
 * Updates keyboard flags to true for Space, Arrow keys, and KeyX on keydown events.
 * @param {KeyboardEvent} event - The keydown event.
 */
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
});

/**
 * Updates keyboard flags to false for Space, Arrow keys, and KeyX on keyup events and resets the xWasPressed flag for KeyX.
 * @param {KeyboardEvent} event - The keyup event.
 */
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
});

/**
 * Prevents the Space key from triggering the start button while still allowing global Space events.
 */
document.addEventListener('DOMContentLoaded', () => {
  const startButton = document.getElementById('start-button');
  if (startButton) {
    startButton.addEventListener('keydown', function (event) {
      if (event.code === 'Space') {
        event.preventDefault();
      }
    });
    startButton.addEventListener('keyup', function (event) {
      if (event.code === 'Space') {
        keyboard.SPACE = false;
      }
    });
  }
});

/**
 * Starts an interval that repeatedly sets the RIGHT key flag to true.
 */
function clickArrowRight() {
  rightInterval = setInterval(() => {
    keyboard.RIGHT = true;
  }, 100);
  intervalIds.push(rightInterval);
}

/**
 * Stops the interval for the RIGHT key and resets its flag.
 */
function stopArrowRight() {
  clearInterval(rightInterval);
  keyboard.RIGHT = false;
}

/**
 * Sets up pointer event listeners for the right arrow button once the DOM is loaded.
 */
document.addEventListener('DOMContentLoaded', () => {
  const btnRight = document.getElementById('button-right');
  btnRight.addEventListener('pointerdown', clickArrowRight);
  btnRight.addEventListener('pointerup', stopArrowRight);
  btnRight.addEventListener('pointerleave', stopArrowRight);
});

/**
 * Starts an interval that repeatedly sets the LEFT key flag to true.
 */
function clickArrowLeft() {
  leftInterval = setInterval(() => {
    keyboard.LEFT = true;
  }, 100);
  intervalIds.push(leftInterval);
}

/**
 * Stops the interval for the LEFT key and resets its flag.
 */
function stopArrowLeft() {
  clearInterval(leftInterval);
  keyboard.LEFT = false;
}

/**
 * Sets up pointer event listeners for the left arrow button once the DOM is loaded.
 */
document.addEventListener('DOMContentLoaded', () => {
  const btnLeft = document.getElementById('button-left');
  btnLeft.addEventListener('pointerdown', clickArrowLeft);
  btnLeft.addEventListener('pointerup', stopArrowLeft);
  btnLeft.addEventListener('pointerleave', stopArrowLeft);
});

/**
 * Starts an interval that repeatedly sets the SPACE key flag to true.
 */
function clickSpace() {
  spaceInterval = setInterval(() => {
    keyboard.SPACE = true;
  }, 100);
  intervalIds.push(spaceInterval);
}

/**
 * Stops the interval for the SPACE key and resets its flag.
 */
function stopSpace() {
  clearInterval(spaceInterval);
  keyboard.SPACE = false;
}

/**
 * Sets up pointer event listeners for the space button once the DOM is loaded.
 */
document.addEventListener('DOMContentLoaded', () => {
  const btnSpace = document.getElementById('button-space');
  btnSpace.addEventListener('pointerdown', clickSpace);
  btnSpace.addEventListener('pointerup', stopSpace);
  btnSpace.addEventListener('pointerleave', stopSpace);
});

/**
 * Starts an interval that repeatedly sets the X key flag to true.
 */
function clickX() {
  throwInterval = setInterval(() => {
    keyboard.X = true;
  }, 100);
  intervalIds.push(throwInterval);
}

/**
 * Stops the interval for the X key, resets its flag, and clears the xWasPressed flag.
 */
function stopX() {
  clearInterval(throwInterval);
  keyboard.X = false;
  keyboard.xWasPressed = false;
}

/**
 * Sets up pointer event listeners for the X button once the DOM is loaded.
 */
document.addEventListener('DOMContentLoaded', () => {
  const btnThrow = document.getElementById('button-x');
  btnThrow.addEventListener('pointerdown', clickX);
  btnThrow.addEventListener('pointerup', stopX);
  btnThrow.addEventListener('pointerleave', stopX);
});
