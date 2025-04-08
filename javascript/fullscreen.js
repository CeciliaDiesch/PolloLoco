/**
 * Sets up click event listeners for fullscreen buttons once the DOM is loaded.
 */
document.addEventListener('DOMContentLoaded', () => {
  const fullscreenOpenButton = document.getElementById('fullscreenOpenButton');
  const fullscreenCloseButton = document.getElementById('fullscreenCloseButton');
  const gameContainer = document.getElementById('game-container');

  fullscreenOpenButton.addEventListener('click', () => {
    openFullscreen(fullscreenOpenButton, fullscreenCloseButton, gameContainer);
  });

  fullscreenCloseButton.addEventListener('click', () => {
    closeFullscreen();
  });
});

/**
 * Opens fullscreen mode by updating UI elements and invoking the fullscreen API on the game container.
 * @param {HTMLElement} fullscreenOpenButton - The button element that triggers opening fullscreen.
 * @param {HTMLElement} fullscreenCloseButton - The button element that triggers closing fullscreen.
 * @param {HTMLElement} gameContainer - The container element to display in fullscreen.
 */
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

/**
 * Closes fullscreen mode by updating UI elements and exiting fullscreen via the appropriate API.
 * @param {HTMLElement} fullscreenOpenButton - The button element that triggers opening fullscreen.
 * @param {HTMLElement} fullscreenCloseButton - The button element that triggers closing fullscreen.
 * @param {HTMLElement} gameContainer - The container element that was displayed in fullscreen.
 */
function closeFullscreen() {
  fullscreenOpenButton = document.getElementById('fullscreenOpenButton');
  fullscreenCloseButton = document.getElementById('fullscreenCloseButton');
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

/**
 * Listens for changes in fullscreen state and, if exiting fullscreen, calls closeFullscreen.
 */
document.addEventListener('fullscreenchange', () => {
  if (!document.fullscreenElement) {
    closeFullscreen();
  }
});

/**
 * Disables the default context menu on the button container element.
 * Waits for the DOM to load, then attaches a contextmenu listener to prevent default actions.
 */
document.addEventListener('DOMContentLoaded', () => {
  const btnContainer = document.getElementById('button-container');
  if (btnContainer) {
    btnContainer.addEventListener('contextmenu', function (e) {
      e.preventDefault();
      e.stopPropagation();
    });
  }
});
