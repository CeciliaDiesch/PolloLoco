/**
 * Represents a chicken enemy in the game.
 * Extends MovableObject.
 *
 * @class Chicken
 * @extends MovableObject
 * @property {number} y - The vertical position.
 * @property {number} height - The height of the chicken.
 * @property {number} width - The width of the chicken.
 * @property {Object} offset - Collision offset values.
 * @property {number} offset.top - Top offset.
 * @property {number} offset.bottom - Bottom offset.
 * @property {number} offset.left - Left offset.
 * @property {number} offset.right - Right offset.
 * @property {string[]} Images_Walking - Array of image paths for the walking animation.
 */
class Chicken extends MovableObject {
  y = 382;
  img;
  height = 50;
  width = 40;
  offset = {
    top: 0,
    bottom: 0,
    left: 5,
    right: 7,
  };
  Images_Walking = [
    './assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
    './assets/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
    './assets/img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
  ];
  Images_Dead = ['./assets/img/3_enemies_chicken/chicken_normal/2_dead/dead.png'];

  /**
   * Constructs a new Chicken instance by initializing its default image,
   * loading its walking animations, setting a random horizontal position,
   * assigning a random speed, and starting its animation.
   * @constructor
   */
  constructor() {
    super();
    this.loadImage('./assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
    this.loadImages(this.Images_Walking);
    this.x = 750 + Math.random() * 900;
    this.speed = 0.1 + Math.random() * 0.7;
    this.animate();
  }

  /**
   * Animates the chicken by moving it left at 60 FPS and updating its walking animation every 300 ms.
   * Both intervals are paused when the game is paused.
   */
  animate() {
    this.ChickenMovementInterval = setInterval(() => {
      if (gameStatusPause) return;
      this.moveLeft();
    }, 1000 / 60);
    intervalIds.push(this.ChickenMovementInterval);

    this.ChickenAnimationInterval = setInterval(() => {
      if (gameStatusPause) return;
      this.playAnimation(this.Images_Walking);
    }, 300);
    intervalIds.push(this.ChickenAnimationInterval);
  }
}
