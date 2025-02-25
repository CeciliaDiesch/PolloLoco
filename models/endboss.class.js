/**
 * Represents the Endboss character in the game.
 * Extends MovableObject and defines its size, collision offsets, state flags,
 * associated sounds, and animations for walking, being angry, hurt, and dead.
 *
 * @class Endboss
 * @extends MovableObject
 * @property {number} height - The height of the endboss.
 * @property {number} width - The width of the endboss.
 * @property {number} y - The vertical position of the endboss.
 * @property {Object} offset - Collision offsets.
 * @property {number} offset.top - Top offset.
 * @property {number} offset.bottom - Bottom offset.
 * @property {number} offset.left - Left offset.
 * @property {number} offset.right - Right offset.
 * @property {Object} world - Reference to the game world.
 * @property {boolean} endbossWalk - Indicates if the endboss is walking.
 * @property {boolean} hasStartedBossMovement - Indicates if the endboss movement has started.
 * @property {HTMLAudioElement} ouch_sound - Sound played when the endboss is hurt.
 * @property {boolean} paused - Indicates if the endboss is paused.
 * @property {string[]} Images_Walking - Image paths for the walking animation.
 * @property {string[]} Images_Angry - Image paths for the angry animation.
 * @property {string[]} Images_Hurt - Image paths for the hurt animation.
 * @property {string[]} Images_Dead - Image paths for the death animation.
 */
class Endboss extends MovableObject {
  height = 420;
  width = 220;
  y = 40;
  offset = {
    top: 75,
    bottom: 100,
    left: 60,
    right: 25,
  };
  world;
  endbossWalk = false;
  hasStartedBossMovement = false;
  ouch_sound = createSound('audio/ouch1.mp3');
  paused = false;

  Images_Walking = [
    '../assets/img/4_enemie_boss_chicken/1_walk/G1.png',
    '../assets/img/4_enemie_boss_chicken/1_walk/G2.png',
    '../assets/img/4_enemie_boss_chicken/1_walk/G3.png',
    '../assets/img/4_enemie_boss_chicken/1_walk/G4.png',
  ];

  Images_Angry = [
    '../assets/img/4_enemie_boss_chicken/2_alert/G5.png',
    '../assets/img/4_enemie_boss_chicken/2_alert/G6.png',
    '../assets/img/4_enemie_boss_chicken/2_alert/G7.png',
    '../assets/img/4_enemie_boss_chicken/2_alert/G8.png',
    '../assets/img/4_enemie_boss_chicken/2_alert/G9.png',
    '../assets/img/4_enemie_boss_chicken/2_alert/G10.png',
    '../assets/img/4_enemie_boss_chicken/2_alert/G11.png',
    '../assets/img/4_enemie_boss_chicken/2_alert/G12.png',
  ];

  Images_Hurt = ['../assets/img/4_enemie_boss_chicken/4_hurt/G21.png', '../assets/img/4_enemie_boss_chicken/4_hurt/G22.png', '../assets/img/4_enemie_boss_chicken/4_hurt/G23.png'];

  Images_Dead = ['../assets/img/4_enemie_boss_chicken/5_dead/G24.png', '../assets/img/4_enemie_boss_chicken/5_dead/G25.png', '../assets/img/4_enemie_boss_chicken/5_dead/G26.png'];

  /**
   * Constructs a new Endboss instance by initializing its position, loading all animation images,
   * setting its speed, recording its initial position, and starting its animation cycle.
   * @constructor
   */
  constructor() {
    super();
    this.loadImage(this.Images_Angry[0]);
    this.x = 2350;
    this.loadImages(this.Images_Angry);
    this.loadImages(this.Images_Walking);
    this.loadImages(this.Images_Hurt);
    this.loadImages(this.Images_Dead);
    this.speed = 0.1;
    this.previousX = this.x;
    this.animate();
  }

  /**
   * Initiates the endboss animation cycle by starting motion animations and checking when to trigger the endboss movement.
   * Sets an interval that, once the camera reaches a threshold and boss movement hasn't started,
   * the moveEndboss() is triggered after a 3-second delay.
   */
  animate() {
    this.animateMotionEndboss();
    this.checkBossStart = setInterval(() => {
      if (gameStatusPause) return;
      if (this.world && this.world.camera_x <= -1900 && !this.hasStartedBossMovement) {
        if (this.paused) return;
        this.hasStartedBossMovement = true;
        setTimeout(() => {
          this.moveEndboss();
        }, 3000);
      }
    }, 100);
    intervalIds.push(this.checkBossStart);
  }

  /**
   * Animates the endboss's motion based on its current state.
   * - If the endboss is dead, stops further animations.
   * - If the endboss hasn't moved and the camera threshold is met, plays the angry animation and shows the status bar.
   * - If paused, plays the hurt animation.
   * - Otherwise, if moving and not paused, plays the walking animation.
   */
  animateMotionEndboss() {
    this.EndbossAnimationInterval = setInterval(() => {
      if (gameStatusPause) return;
      if (this.checkDeadAnimation()) {
      } else if (this.x == this.previousX && this.world && this.world.camera_x <= -1900) {
        this.playAnimation(this.Images_Angry);
        this.world.statusbar.showEndbossStatusbar = true;
      } else if (this.paused) {
        this.playAnimation(this.Images_Hurt);
      } else if (this.x !== this.previousX && !this.paused) {
        this.playAnimation(this.Images_Walking);
      }
    }, 300);
    intervalIds.push(this.EndbossAnimationInterval);
  }

  /**
   * Moves the endboss to the left at a high frequency if the game is not paused.
   * This movement is continuously executed once triggered.
   */
  moveEndboss() {
    this.EndbossMovementInterval = setInterval(() => {
      if (gameStatusPause) return;
      if (!this.paused) {
        this.moveLeft();
      }
    }, 1000 / 500);
    intervalIds.push(this.EndbossMovementInterval);
  }
}
