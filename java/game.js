let canvas;
let ctx;
let world;
let keyboard = new Keyboard();
let intervalIds = [];
i = 1;
let allAudios = [];
start_sound = createSound('./audio/startLetsGo3.mp3');
background_sound = createSound('./audio/backgroundMusic2.mp3');
background_sound.volume = 0.1;
background_sound.loop = true;
let gameStarted = false;
let gameStatusPause = false;
let helpWindowActive = false;
let isMuted = false;
let rightInterval;
let leftInterval;
let spaceInterval;
let throwInterval;

function init() {
  canvas = document.getElementById('canvas');
  world = new World(canvas, keyboard);
}

function createSound(src) {
  const sound = new Audio(src);
  allAudios.push(sound);
  return sound;
}

function toggleMuteAllSounds() {
  isMuted = !isMuted;
  allAudios.forEach((audio) => (audio.muted = isMuted));
  const muteButtonImg = document.querySelector('#muteButton img');
  if (isMuted) {
    muteButtonImg.src = './assets/img/5_background/noSound2.png';
  } else {
    muteButtonImg.src = './assets/img/5_background/sound2.png';
  }
}

function showImprint() {
  window.open('imprint.html', '_blank');
}

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

function startGame(startButton) {
  startButton.innerText = 'Pause';
  startButton.classList.add('pause');
  initLevel1();
  init();
  gameStarted = true;
  gameStatusPause = false;
  document.getElementById('buttonContainerMobilePlay').classList.add('mobileSee');
  document.getElementById('main-Buttons').classList.remove('mainButtonsStart');
  restartSound(start_sound);
  restartSound(background_sound);
}

function PauseGame(startButton) {
  startButton.innerText = 'Play';
  startButton.classList.remove('pause');
  gameStatusPause = true;
  background_sound.pause();
}

function playGame(startButton) {
  startButton.innerText = 'Pause';
  startButton.classList.add('pause');
  gameStatusPause = false;
  restartSound(background_sound);
}

function restartGame() {
  if (helpWindowActive) return;
  const startButton = document.querySelector('.startButton');
  document.getElementById('overlay').style.display = 'none';
  world.character.stopGame();
  resetSettings(startButton);
  resetCanvas();
}

function resetCanvas() {
  const buttonContainer = document.getElementById('button-container');
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

function resetSettings(startButton) {
  gameStarted = false;
  gameStatusPause = false;
  helpWindowActive = false;
  startButton.innerText = 'Start';
  startButton.classList.remove('pause');
  document.getElementById('buttonContainerMobilePlay').classList.remove('mobileSee');
  document.getElementById('main-Buttons').classList.add('mainButtonsStart');
}

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

function closeHelp(helpOverlay, startButton, restartButton, explanationButton, canvas) {
  helpWindowActive = false;
  helpOverlay.style.display = 'none';
  canvas.style.display = 'block';
  startButton.classList.remove('disabled-button');
  restartButton.classList.remove('disabled-button');
  explanationButton.classList.remove('back');
  explanationButton.innerText = 'Help';
  if (gameStarted) {
    restartSound(background_sound);
  }
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
});

function clickArrowRight() {
  rightInterval = setInterval(() => {
    keyboard.RIGHT = true;
  }, 100);
  intervalIds.push(rightInterval);
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

function clickArrowLeft() {
  leftInterval = setInterval(() => {
    keyboard.LEFT = true;
  }, 100);
  intervalIds.push(leftInterval);
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

function clickSpace() {
  spaceInterval = setInterval(() => {
    keyboard.SPACE = true;
  }, 100);
  intervalIds.push(spaceInterval);
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

function clickX() {
  throwInterval = setInterval(() => {
    keyboard.X = true;
  }, 100);
  intervalIds.push(throwInterval);
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

function restartSound(audio) {
  if (audio) {
    if (gameStatusPause) return;
    if (!audio.paused) {
      audio.pause();
      audio.currentTime = 0;
    }
    if (audio.readyState < 3) {
      return;
    } else {
      audio.play().catch((error) => console.error(error));
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const fullscreenOpenButton = document.getElementById('fullscreenOpenButton');
  const fullscreenCloseButton = document.getElementById('fullscreenCloseButton');
  const gameContainer = document.getElementById('game-container');

  fullscreenOpenButton.addEventListener('click', () => {
    openFullscreen(fullscreenOpenButton, fullscreenCloseButton, gameContainer);
  });

  fullscreenCloseButton.addEventListener('click', () => {
    closeFullscreen(fullscreenOpenButton, fullscreenCloseButton, gameContainer);
  });
});

function openFullscreen(fullscreenOpenButton, fullscreenCloseButton, gameContainer) {
  fullscreenOpenButton.classList.add('hideButton');
  fullscreenCloseButton.classList.remove('hideButton');
  document.querySelector('.buttonFullscreenImg').style.width = '48px';
  document.querySelector('.buttonFullscreenImg').style.height = '48px';
  if (gameContainer.requestFullscreen) {
    gameContainer.requestFullscreen();
  } else if (gameContainer.webkitRequestFullscreen) {
    gameContainer.webkitRequestFullscreen();
  } else if (gameContainer.msRequestFullscreen) {
    gameContainer.msRequestFullscreen();
  }
}

function closeFullscreen(fullscreenOpenButton, fullscreenCloseButton, gameContainer) {
  fullscreenOpenButton.classList.remove('hideButton');
  fullscreenCloseButton.classList.add('hideButton');
  document.querySelector('.buttonFullscreenImg').style.width = '24px';
  document.querySelector('.buttonFullscreenImg').style.height = '24px';
  if (document.fullscreenElement || document.webkitFullscreenElement || document.msFullscreenElement) {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
  }
}

document.addEventListener('fullscreenchange', () => {
  if (!document.fullscreenElement) {
    closeFullscreen();
  }
});
