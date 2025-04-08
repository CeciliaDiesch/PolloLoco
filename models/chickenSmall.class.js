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
class ChickenSmall extends Chicken {
  y = 385;
  img;
  height = 35;
  width = 30;
  offset = {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  };
  Images_Walking = [
    './assets/img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
    './assets/img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
    './assets/img/3_enemies_chicken/chicken_small/1_walk/3_w.png',
  ];
  Images_Dead = ['./assets/img/3_enemies_chicken/chicken_small/2_dead/dead.png'];

  /**
   * Constructs a new small Chicken instance by initializing its default image,
   * loading its walking animations, setting a random horizontal position,
   * assigning a random speed, and starting its animation.
   * @constructor
   */
  constructor() {
    super();
    clearInterval(this.ChickenMovementInterval);
    clearInterval(this.ChickenAnimationInterval);
    this.loadImages(this.Images_Walking);
    this.img = this.imageCache[this.Images_Walking[0]];
    this.x = 1150 + Math.random() * 500;
    this.jumpHeight = 100;
    this.jumpSpeed = 0.07;
    this.initialY = this.y;
    this.jumpPhase = 0;
    this.animate();
  }

  /**
   * Starts the ChickenSmall enemy's animations by initiating both its movement and its walking animation.
   */
  animate() {
    this.animateChickenSmallMovement();
    this.animateChickenSmallAnimation();
  }

  /**
   * Animates the movement of the ChickenSmall enemy.
   * Moves the enemy left and simulates a jumping motion using a sine function.
   * Animation stops if the game is paused or the enemy is dead.
   */
  animateChickenSmallMovement() {
    this.ChickenSmallMovementInterval = setInterval(() => {
      if (gameStatusPause || this.dead) return;
      this.moveLeft();
      this.jumpPhase += this.jumpSpeed;
      this.y = this.initialY - Math.abs(Math.sin(this.jumpPhase)) * this.jumpHeight;
      if (this.jumpPhase >= Math.PI) {
        this.jumpPhase = 0;
        this.y = this.initialY;
      }
    }, 1000 / 10);
    intervalIds.push(this.ChickenSmallMovementInterval);
  }

  /**
   * Animates the walking sequence of the ChickenSmall enemy by cycling through its walking images.
   */
  animateChickenSmallAnimation() {
    this.ChickenSmallAnimationInterval = setInterval(() => {
      if (gameStatusPause) return;
      this.playAnimation(this.Images_Walking);
    }, 300);
    intervalIds.push(this.ChickenSmallAnimationInterval);
  }
}
