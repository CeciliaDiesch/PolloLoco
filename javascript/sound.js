let isMuted = false;
const soundManager = {};

/**
 * Initializes the sound manager once the DOM content is loaded.
 *
 * This event listener creates and stores all required audio elements in the global
 * soundManager object. It retrieves and applies the stored mute status and makes the soundManager globally accessible.
 *
 * @listens DOMContentLoaded
 */
document.addEventListener('DOMContentLoaded', () => {
  soundManager.start_sound = createSound('./audio/startLetsGo3.mp3');
  soundManager.background_sound = createSound('./audio/backgroundMusic2.mp3');
  soundManager.coin_sound = createSound('./audio/coin.mp3');
  soundManager.bottle_sound = createSound('./audio/collect3.mp3');
  soundManager.bottle_sound_splash = createSound('./audio/bottleSplash.mp3');
  soundManager.bottle_sound_flying = createSound('./audio/bottleFly.mp3');
  soundManager.bottle_sound_flying_straight = createSound('./audio/bottleFlyStraight.mp3');
  soundManager.gameOver_sound = createSound('./audio/gameOver.mp3');
  soundManager.jippie_sound = createSound('./audio/jippie.mp3');
  soundManager.ohNo_sound = createSound('./audio/Ohno.mp3');
  soundManager.hitChicken_sound = createSound('./audio/hitChicken.mp3');
  soundManager.hitEndboss_sound = createSound('./audio/hitEndboss.mp3');
  soundManager.walking_sound = createSound('./audio/walking42.mp3');
  soundManager.ouch_sound = createSound('./audio/ouch1.mp3');
  soundManager.ching_sound = createSound('./audio/ching.mp3');
  soundManager.background_sound.volume = 0.1;
  soundManager.background_sound.loop = true;
  soundManager.start_sound.volume = 0.5;
  getMuteStatus();
  window.soundManager = soundManager;
});

/**
 * Listens for the DOMContentLoaded event and then retrieves the mute status from localStorage.
 */
function getMuteStatus() {
  const storedMuteStatus = localStorage.getItem('isMuted');
  if (storedMuteStatus !== null) {
    isMuted = JSON.parse(storedMuteStatus);
    Object.values(soundManager).forEach((audio) => {
      audio.muted = isMuted;
    });
    const muteButtonImg = document.querySelector('#muteButton img');
    muteButtonImg.src = isMuted ? './assets/img/5_background/noSound2.png' : './assets/img/5_background/sound2.png';
  }
}

/**
 * Starts or Restarts the given audio element by cloning the sound if the game is not paused.
 * @param {HTMLAudioElement} audio - The audio element to play.
 */
function restartSound(audio) {
  if (!audio) return;
  if (gameStatusPause) return;
  let soundClone = audio.cloneNode();
  soundClone.muted = isMuted;
  soundClone.play().catch((error) => {
    console.error('Error playing cloned sound:', error);
  });
}

/**
 * Creates a new audio object with the provided source, adds it to the global allAudios array, and returns the audio object.
 * @param {string} src - The URL of the audio file.
 * @returns {HTMLAudioElement} The newly created audio object.
 */
function createSound(src) {
  const sound = new Audio(src);
  return sound;
}

/**
 * Toggles the global mute state, updates all audio objects, and changes the mute button image accordingly.
 */
function toggleMuteAllSounds() {
  isMuted = !isMuted;
  localStorage.setItem('isMuted', JSON.stringify(isMuted));
  Object.entries(soundManager).forEach(([key, audio]) => {
    audio.muted = isMuted;
    if (isMuted) {
      audio.pause();
    } else {
      if (key === 'background_sound') {
        audio.play().catch((error) => console.error('Hintergrundsound konnte nicht gestartet werden:', error));
      }
    }
  });
  const muteButtonImg = document.querySelector('#muteButton img');
  if (isMuted) {
    muteButtonImg.src = './assets/img/5_background/noSound2.png';
  } else {
    muteButtonImg.src = './assets/img/5_background/sound2.png';
  }
  localStorage.setItem('isMuted', JSON.stringify(isMuted));
}

/**
 * Returns a Promise that resolves when the given audio element is sufficiently loaded.
 * It resolves immediately if the audio's readyState is 3 or higher, or once the
 * 'canplaythrough' event is fired. A fallback timeout of 5 seconds is also applied.
 *
 * @param {HTMLAudioElement} audio - The audio element to wait for.
 * @returns {Promise<void>} A promise that resolves when the audio is ready.
 */
function waitForAudio(audio) {
  return new Promise((resolve) => {
    if (audio.readyState >= 3) {
      resolve();
    } else {
      audio.addEventListener('canplaythrough', resolve, { once: true });
      setTimeout(resolve, 5000);
    }
  });
}

/**
 * Returns a Promise that resolves when all audio elements in the global allAudios array
 * are sufficiently loaded. It uses waitForAudio() on each audio element.
 *
 * @returns {Promise<void[]>} A promise that resolves when all audio elements are ready.
 */
function waitForAllAudiosToLoad() {
  return Promise.all(Object.values(soundManager).map((audio) => waitForAudio(audio)));
}
