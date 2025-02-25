/**
 * Represents a throwable object (e.g. a bottle) with throwing and splash animations.
 * Extends MovableObject.
 *
 * @class ThrowableObject
 * @extends MovableObject
 *
 * @property {number} height - The object's height.
 * @property {number} width - The object's width.
 * @property {Object} world - Reference to the world instance.
 * @property {HTMLAudioElement} bottle_sound_flying - Sound played while the bottle is flying.
 * @property {HTMLAudioElement} bottle_sound_flying_straight - Sound for a straight-flying bottle.
 * @property {HTMLAudioElement} bottle_sound_splash - Sound played when the bottle splashes.
 * @property {number} moveXInterval - Interval ID for horizontal movement.
 * @property {number} checkGroundInterval - Interval ID for ground collision checks.
 * @property {string[]} Images_Throwing - Array of image paths for the throwing animation.
 * @property {string[]} Images_Splash - Array of image paths for the splash animation.
 */
class ThrowableObject extends MovableObject {
  height = 70;
  width = 50;
  world;
  bottle_sound_flying = createSound('audio/bottleFly.mp3');
  bottle_sound_flying_straight = createSound('audio/bottleFlyStraight.mp3');
  bottle_sound_splash = createSound('audio/bottleSplash.mp3');
  moveXInterval;
  checkGroundInterval;

  Images_Throwing = [
    '../assets/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
    '../assets/img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
    '../assets/img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
    '../assets/img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
  ];

  Images_Splash = [
    '../assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
    '../assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
    '../assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
    '../assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
    '../assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
    '../assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
    '../assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',
  ];

  /**
   * Constructs a new ThrowableObject, initializing its position, world, associated bottle,
   * loading images for animations, configuring sound settings, and starting its animation.
   *
   * @param {number} x - The horizontal position.
   * @param {number} y - The vertical position.
   * @param {Object} world - The game world instance.
   * @param {*} bottle - The bottle reference or related data.
   */
  constructor(x, y, world, bottle) {
    super();
    this.x = x;
    this.y = y;
    this.world = world;
    this.bottle = bottle;
    this.loadImage('../assets/img/6_salsa_bottle/salsa_bottle.png');
    this.loadImages(this.Images_Throwing);
    this.loadImages(this.Images_Splash);
    this.bottle_sound_flying.loop = true;
    this.bottle_sound_flying_straight.playbackRate = 0.5;
    this.animate();
  }

  /**
   * Animates the throwable object by periodically checking for throw input and playing the throwing animation.
   */
  animate() {
    let throwing = setInterval(() => {
      this.bottle_sound_flying.pause();
      if (this.world.keyboard && this.world.keyboard.X && this.isAboveGround() && !this.splashPlayed) {
        this.playAnimation(this.Images_Throwing);
        this.bottle_sound_flying.play();
        this.splashPlayed = false;
      }
    }, 65);
    intervalIds.push(throwing);
  }

  /**
   * Initiates the throw by resetting the flying sound, playing the straight-flying sound, and calling the parent's throw method.
   */
  throw() {
    this.bottle_sound_flying.currentTime = 0;
    this.bottle_sound_flying_straight.play();
    super.throw();
  }

  /**
   * Stops the flying state by pausing sounds, resetting their positions, calling the parent's stopFlying method,
   * and removing the object from the world after 3 seconds.
   */
  stopFlying() {
    this.bottle_sound_flying.pause();
    this.bottle_sound_flying_straight.pause();
    this.bottle_sound_flying.currentTime = 0;
    this.bottle_sound_flying_straight.currentTime = 0;
    super.stopFlying();
    setTimeout(() => {
      this.world.removeObject(this);
    }, 3000);
  }

  /**
   * Triggers the splash effect by stopping flight, marking the splash as played, playing the splash sound,
   * and animating the splash sequence.
   */
  splash() {
    this.stopFlying();
    this.splashPlayed = true;
    this.bottleHitCounted = true;
    this.bottle_sound_splash.play();
    let splashFrame = 0;
    let splashAnimation = setInterval(() => {
      this.img = this.imageCache[this.Images_Splash[splashFrame]];
      splashFrame++;
      if (splashFrame >= this.Images_Splash.length) {
        clearInterval(splashAnimation);
      }
    }, 100);
    intervalIds.push(splashAnimation);
  }

  /**
   * Continuously checks if the bottle has reached ground level, and if so, triggers the splash effect
   * and increases its acceleration.
   */
  checkBottleGroundLevel() {
    this.checkGroundInterval = setInterval(() => {
      if (this.y >= 359 && !this.splashPlayed) {
        this.splash();
        this.accelartion = 2.5;
      }
    }, 1);
    intervalIds.push(this.checkGroundInterval);
  }
}
