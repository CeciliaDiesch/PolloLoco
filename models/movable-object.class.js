/**
 * Represents a movable object with physics, health, and sound properties.
 * Extends DrawableObject.
 *
 * @class MovableObject
 * @extends DrawableObject
 *
 * @property {number} speed - Horizontal speed (default 0.1).
 * @property {number} speedY - Vertical speed (default 0).
 * @property {number} accelartion - Acceleration value (default 2.5).
 * @property {number} energy - Characters health value (default 100).
 * @property {number} coins - Characters Collected coins (default 0).
 * @property {number} bottle - Characters Collected bottles (default 0).
 * @property {number} lastHit - Timestamp of the characters last collision with a chicken (default 0).
 * @property {number} bottleHitEndboss - Damage percentage for the endboss (default 100).
 * @property {Object} world - Reference to the game world.
 * @property {HTMLAudioElement} coin_sound - Sound played when a coin is collected.
 * @property {HTMLAudioElement} bottle_sound - Sound played when a bottle is collected.
 * @property {HTMLAudioElement} bottle_sound_splash - Sound played when a bottle splashes.
 * @property {HTMLAudioElement} gameOver_sound - Sound played when the game is over.
 * @property {HTMLAudioElement} jippie_sound - Sound played for a "jippie" event.
 * @property {HTMLAudioElement} ohNo_sound - Sound played for an "oh no" event.
 * @property {boolean} splashPlayed - Indicates if the splash sound has been played.
 * @property {boolean} bottleHitCounted - Indicates if the hit on the endboss has been counted.
 * @property {boolean} hasStartedDeadAnimation - Indicates if the death animation has started.
 */
class MovableObject extends DrawableObject {
  speed = 0.1;
  speedY = 0;
  accelartion = 2.5;
  energy = 100;
  coins = 0;
  bottle = 0;
  lastHit = 0;
  bottleHitEndboss = 100;
  world;
  coin_sound = createSound('audio/coin.mp3');
  bottle_sound = createSound('audio/collect3.mp3');
  bottle_sound_splash = createSound('audio/bottleSplash.mp3');
  gameOver_sound = createSound('audio/gameOver.mp3');
  jippie_sound = createSound('audio/jippie.mp3');
  ohNo_sound = createSound('audio/ohNo.mp3');
  splashPlayed = false;
  bottleHitCounted = false;
  hasStartedDeadAnimation = false;

  /**
   * Constructs a new instance and sets the game over sound volume to 0.5.
   * @constructor
   */
  constructor() {
    super();
    this.gameOver_sound.volume = 0.5;
  }

  /**
   * Applies gravity to the object by updating its vertical position and speed.
   * @returns {number} The interval ID for the gravity interval which can be used to clear the interval.
   */
  applyGravity() {
    return setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.accelartion;
      }
    }, 1000 / 25);
  }

  /**
   * Checks if the object is above ground. For ThrowableObject instances, returns true if y is less than 360 and for others, if y is less than 180.
   * @returns {boolean} True if the object is above ground, otherwise false.
   */
  isAboveGround() {
    if (this instanceof ThrowableObject) {
      return this.y < 360;
    } else {
      return this.y < 180;
    }
  }

  /**
   * Plays the jump animation if the object is above ground.
   * @returns {boolean} True if the jump animation is played, false otherwise.
   */
  checkJumpAnimation() {
    if (this.isAboveGround()) {
      this.playAnimation(this.Images_Jumping);
      return true;
    }
    return false;
  }

  /**
   * Determines whether this object is colliding with another object based on their positions and offsets.
   * @param {Object} obj - The object to check collision against.
   * @returns {boolean} True if a collision is detected, otherwise false.
   */
  isColliding(obj) {
    return (
      this.x + this.width - this.offset.right >= obj.x + obj.offset.left &&
      this.x + this.offset.left <= obj.x + obj.width - obj.offset.right &&
      this.y + this.height - this.offset.bottom >= obj.y + obj.offset.top &&
      this.y + this.offset.top <= obj.y + obj.height - obj.offset.bottom
    );
  }

  /**
   * Reduces characetrs energy by 5, plays the hit sound, and updates the last hit timestamp. It also ensures that energy does not drop below 0.
   */
  hit() {
    this.energy -= 5;
    restartSound(this.hitChicken_sound);
    if (this.energy < 0) {
      this.energy = 0;
    } else {
      this.lastHit = new Date().getTime();
    }
  }

  /**
   * Increases coin count by 20 (up to a maximum of 100), removes the coin from the world, sets the coin sound volume, and plays the coin sound.
   * @param {Object} coin - The coin object to collect.
   */
  hitCoin(coin) {
    this.coins += 20;
    if (this.coins > 100) {
      this.coins = 100;
    }
    this.world.removeObject(coin);
    this.coin_sound.volume = 0.3;
    this.coin_sound.play();
  }

  /**
   * Increases bottle count by 20 (up to a maximum of 100), removes the bottle from the world and plays the bottle collection sound.
   * @param {Object} bottle - The bottle object to collect.
   */
  hitBottle(bottle) {
    this.bottle += 20;
    if (this.bottle > 100) {
      this.bottle = 100;
    }
    this.world.removeObject(bottle);
    this.bottle_sound.play();
  }

  /**
   * Reduces the endboss's health points by 20, plays an ouch sound, and temporarily pauses the endboss`s motion.
   * If a thrown bottle is provided and its splash hasn't been played, triggers the bottle's splash.
   * @param {Object} bottleThrown - The thrown bottle object that hit the endboss.
   */
  hitEndboss(bottleThrown) {
    this.bottleHitEndboss -= 20;
    if (this.bottleHitEndboss < 0) {
      this.bottleHitEndboss = 0;
    }
    restartSound(this.ouch_sound);
    this.paused = true;
    setTimeout(() => {
      this.paused = false;
    }, 1000);
    if (bottleThrown && !bottleThrown.splashPlayed) {
      bottleThrown.splash();
    }
  }

  /**
   * Determines if the object is hurt by checking if less than 0.5 seconds have passed since the last hit.
   * @returns {boolean} True if the object is still in a hurt state.
   */
  isHurt() {
    let timepassed = new Date().getTime() - this.lastHit;
    timepassed = timepassed / 1000;
    return timepassed < 0.5;
  }

  /**
   * Plays the hurt animation if the object is hurt.
   * @returns {boolean} True if the hurt animation is played, otherwise false.
   */
  checkHurtAnimation() {
    if (this.isHurt()) {
      this.playAnimation(this.Images_Hurt);
      return true;
    }
    return false;
  }

  /**
   * Determines if the object is dead based on its energy points.
   * @returns {boolean} True if the object is dead.
   */
  isDead() {
    if (this.bottleHitEndboss == 0 || this.energy == 0) {
      return true;
    }
  }

  /**
   * Checks if the death animation should start and triggers the death sequence.
   * Pauses intervals, plays the dead animation, stops the game, plays final sounds, and sets game over state.
   * @returns {boolean} True if the death animation is initiated, otherwise false.
   */
  checkDeadAnimation() {
    if (this.isDead() && !this.hasStartedDeadAnimation) {
      this.hasStartedDeadAnimation = true;
      clearInterval(this.checkBossStart);
      clearInterval(this.EndbossAnimationInterval);
      this.playDeadAnimation();
      setTimeout(() => {
        this.stopGame();
        this.playFinalSoundCharacter();
      }, 1000);
      setTimeout(() => {
        this.setGameOver();
      }, 2000);
      return true;
    }
    return false;
  }

  /**
   * Plays the dead animation by cycling through the dead images.
   */
  playDeadAnimation() {
    let deadFrame = 0;
    let deadAnimation = setInterval(() => {
      this.img = this.imageCache[this.Images_Dead[deadFrame]];
      deadFrame++;
      if (deadFrame >= this.Images_Dead.length) {
        clearInterval(deadAnimation);
      }
    }, 300);
  }

  /**
   * Stops the game by clearing all intervals, pausing the character's walking sound (if active) and pausing the background sound.
   */
  stopGame() {
    intervalIds.forEach(clearInterval);
    if (this.world && this.world.character) {
      let character = this.world.character;

      if (character.walking_sound) {
        character.walking_sound.pause();
        character.walking_sound.currentTime = 0;
        character.isWalkingPlaying = false;
      }
    }
    background_sound.pause();
  }

  /**
   * Plays the final sound for the character based on its state.
   */
  playFinalSoundCharacter() {
    if (this.bottleHitEndboss == 0) {
      restartSound(this.jippie_sound);
    }
    if (this.energy == 0) {
      restartSound(this.ohNo_sound);
    }
  }

  /**
   * Sets the game over state and plays the game over sound if the character's energy is zero,
   */
  setGameOver() {
    if (this.energy == 0) {
      restartSound(this.gameOver_sound);
      this.world.lost = true;
    }
    this.world.gameOver = true;
  }

  /**
   * Plays an animation by cycling through the provided array of image paths.
   * @param {string[]} images - An array of image paths for the animation.
   */
  playAnimation(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  /**
   * Moves the object to the left by decreasing its x-coordinate by its speed.
   * If the object moves completely off the left side of the screen it wraps around by resetting its x-coordinate to the level's end.
   */
  moveLeft() {
    this.x -= this.speed;
    if (this.x + this.width < 0) {
      this.x = this.world.level.level_end_x;
    }
  }

  /**
   * Moves the object to the right by increasing its x-coordinate by its speed.
   */
  moveRight() {
    this.x += this.speed;
  }

  /**
   * Oscillates the object's vertical position between a minimum and maximum value.
   */
  moveUpAndDown() {
    let direction = 1;
    let step = 1;
    let minY = 30;
    let maxY = 50;
    let UpAndDownInterval = setInterval(() => {
      this.y += direction * step;
      if (this.y <= minY) {
        this.y = minY;
        direction = 1;
      } else if (this.y >= maxY) {
        this.y = maxY;
        direction = -1;
      }
    }, 1000 / 60);
    intervalIds.push(UpAndDownInterval);
  }

  /**
   * Initiates the throw action for the object.
   * Decreases the bottle count by 20 (resets to 0 if below 100), sets vertical speed, applies gravity, and starts horizontal movement and ground/release checks.
   */
  throw() {
    this.bottle -= 20;
    if (this.bottle < 100) {
      this.bottle = 0;
    }
    this.speedY = 30;
    this.gravityInterval = this.applyGravity();
    intervalIds.push(this.gravityInterval);
    this.throwHorizontal();
    this.checkBottleGroundLevel();
    this.checkReleaseX();
  }

  /**
   * Initiates horizontal movement for the thrown object.
   */
  throwHorizontal() {
    if (this.otherDirection === true) {
      this.x -= 50;
    }
    this.moveXInterval = setInterval(() => {
      if (this.otherDirection === true) {
        this.x -= 10;
      } else {
        this.x += 10;
      }
    }, 25);
    intervalIds.push(this.moveXInterval);
  }

  /**
   * Periodically checks if the throw key (X) has been released while the object is in flight.
   * If so and the object is above ground and the splash hasn't been played, the acceleration increases to make it sink faster.
   */
  checkReleaseX() {
    this.sinkInterval = setInterval(() => {
      if (this.world.keyboard && !this.world.keyboard.X && this.isAboveGround() && !this.splashPlayed) {
        this.accelartion = 10;
      }
    }, 200);
    intervalIds.push(this.sinkInterval);
  }

  /**
   * Stops the flying motion by clearing the horizontal movement, gravity, and ground check intervals.
   */
  stopFlying() {
    clearInterval(this.moveXInterval);
    clearInterval(this.gravityInterval);
    clearInterval(this.checkGroundInterval);
  }
}
