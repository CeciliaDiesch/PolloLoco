/**
 * Represents the main character in the game.
 * Extends MovableObject.
 *
 * @class Character
 * @extends MovableObject
 *
 * @property {number} height - The character's height.
 * @property {number} y - The vertical position of the character.
 * @property {number} speed - The movement speed.
 * @property {Object} offset - Collision offsets for the character.
 * @property {number} offset.top - Top offset.
 * @property {number} offset.bottom - Bottom offset.
 * @property {number} offset.left - Left offset.
 * @property {number} offset.right - Right offset.
 * @property {World} world - Reference to the game world.
 * @property {number} lastMovementTime - Timestamp of the last movement (initialized with Date.now()).
 * @property {boolean} otherDirection - Indicates if the character is facing left.
 * @property {boolean} hasMoved - Indicates if the character has moved.
 * @property {HTMLAudioElement} hitChicken_sound - Sound played when the character is hit by a chicken.
 * @property {HTMLAudioElement} hitEndboss_sound - Sound played when the character hits the endboss.
 * @property {HTMLAudioElement} walking_sound - Sound played when the character is walking.
 * @property {string[]} Images_Walking - Array of image paths for the walking animation.
 * @property {string[]} Images_Idle - Array of image paths for the idle animation.
 * @property {string[]} Images_Wait - Array of image paths for the long idle (wait) animation.
 * @property {string[]} Images_Jumping - Array of image paths for the jumping animation.
 * @property {string[]} Images_Hurt - Array of image paths for the hurt animation.
 * @property {string[]} Images_Dead - Array of image paths for the death animation.
 */
class Character extends MovableObject {
  height = 240;
  y = 80;
  speed = 10;
  offset = {
    top: 100,
    bottom: 0,
    left: 40,
    right: 35,
  };
  world;
  lastMovementTime = Date.now();
  otherDirection = false;
  hasMoved = true;
  hitChicken_sound = soundManager.hitChicken_sound;
  hitEndboss_sound = soundManager.hitEndboss_sound;
  walking_sound = soundManager.walking_sound;

  Images_Walking = [
    './assets/img/2_character_pepe/2_walk/W-21.png',
    './assets/img/2_character_pepe/2_walk/W-22.png',
    './assets/img/2_character_pepe/2_walk/W-23.png',
    './assets/img/2_character_pepe/2_walk/W-24.png',
    './assets/img/2_character_pepe/2_walk/W-25.png',
    './assets/img/2_character_pepe/2_walk/W-26.png',
  ];

  Images_Idle = [
    './assets/img/2_character_pepe/1_idle/idle/I-1.png',
    './assets/img/2_character_pepe/1_idle/idle/I-2.png',
    './assets/img/2_character_pepe/1_idle/idle/I-3.png',
    './assets/img/2_character_pepe/1_idle/idle/I-4.png',
    './assets/img/2_character_pepe/1_idle/idle/I-5.png',
    './assets/img/2_character_pepe/1_idle/idle/I-6.png',
    './assets/img/2_character_pepe/1_idle/idle/I-7.png',
    './assets/img/2_character_pepe/1_idle/idle/I-8.png',
    './assets/img/2_character_pepe/1_idle/idle/I-9.png',
    './assets/img/2_character_pepe/1_idle/idle/I-10.png',
  ];

  Images_Wait = [
    './assets/img/2_character_pepe/1_idle/long_idle/I-11.png',
    './assets/img/2_character_pepe/1_idle/long_idle/I-12.png',
    './assets/img/2_character_pepe/1_idle/long_idle/I-13.png',
    './assets/img/2_character_pepe/1_idle/long_idle/I-14.png',
    './assets/img/2_character_pepe/1_idle/long_idle/I-15.png',
    './assets/img/2_character_pepe/1_idle/long_idle/I-16.png',
    './assets/img/2_character_pepe/1_idle/long_idle/I-17.png',
    './assets/img/2_character_pepe/1_idle/long_idle/I-18.png',
    './assets/img/2_character_pepe/1_idle/long_idle/I-19.png',
    './assets/img/2_character_pepe/1_idle/long_idle/I-20.png',
  ];

  Images_Jumping = [
    './assets/img/2_character_pepe/3_jump/J-31.png',
    './assets/img/2_character_pepe/3_jump/J-32.png',
    './assets/img/2_character_pepe/3_jump/J-33.png',
    './assets/img/2_character_pepe/3_jump/J-34.png',
    './assets/img/2_character_pepe/3_jump/J-35.png',
    './assets/img/2_character_pepe/3_jump/J-36.png',
    './assets/img/2_character_pepe/3_jump/J-37.png',
    './assets/img/2_character_pepe/3_jump/J-38.png',
    './assets/img/2_character_pepe/3_jump/J-39.png',
  ];

  Images_Hurt = ['./assets/img/2_character_pepe/4_hurt/H-43.png', './assets/img/2_character_pepe/4_hurt/H-41.png', './assets/img/2_character_pepe/4_hurt/H-42.png'];

  Images_Dead = [
    './assets/img/2_character_pepe/5_dead/D-51.png',
    './assets/img/2_character_pepe/5_dead/D-52.png',
    './assets/img/2_character_pepe/5_dead/D-53.png',
    './assets/img/2_character_pepe/5_dead/D-54.png',
    './assets/img/2_character_pepe/5_dead/D-55.png',
    './assets/img/2_character_pepe/5_dead/D-56.png',
    './assets/img/2_character_pepe/5_dead/D-57.png',
  ];

  /**
   * Constructs a new Character instance by loading all necessary image sets,
   * starting animations and gravity, and initializing sound and position properties.
   * @constructor
   */
  constructor() {
    super();
    this.loadImage('./assets/img/2_character_pepe/2_walk/W-22.png');
    this.loadImages(this.Images_Walking);
    this.loadImages(this.Images_Idle);
    this.loadImages(this.Images_Wait);
    this.loadImages(this.Images_Jumping);
    this.loadImages(this.Images_Hurt);
    this.loadImages(this.Images_Dead);
    this.animate();
    this.applyGravity();
    this.previousX = this.x;
    this.previousY = this.y;
    this.walking_sound.preload = 'auto';
    this.hitChicken_sound.volume = 0.2;
  }

  /**
   * Initiates all character animations including movement, waiting, and jumping.
   */
  animate() {
    this.moveCharacter();
    this.checkHasMoved();
    this.animateMovingCharacter();
    this.animateWaitingCharacter();
    this.animateJumpingCharacter();
  }

  /**
   * Moves the character based on keyboard input at 60 FPS.
   * Updates direction, triggers movement functions, and adjusts the camera position.
   */
  moveCharacter() {
    let moving = setInterval(() => {
      this.hasMoved = false;
      if (gameStatusPause) return;
      if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x && this.x < this.world.endboss.x - 10) {
        this.characterMoveRight();
      }
      if (this.world.keyboard.LEFT && this.x > 100) {
        this.characterMoveLeft();
      }
      if (this.world.keyboard.SPACE && !this.isAboveGround()) {
        this.characterJump();
      }
      this.world.camera_x = -this.x + 100;
    }, 1000 / 60);
    intervalIds.push(moving);
  }

  /**
   * Moves the character to the right.
   * Calls moveRight(), sets otherDirection to false, and flags that movement occurred.
   */
  characterMoveRight() {
    this.moveRight();
    this.otherDirection = false;
    this.hasMoved = true;
  }

  /**
   * Moves the character to the left.
   * Calls moveLeft(), sets otherDirection to true, and flags that movement occurred.
   */
  characterMoveLeft() {
    this.moveLeft();
    this.otherDirection = true;
    this.hasMoved = true;
  }

  /**
   * Makes the character jump.
   * Calls jump() and flags that movement occurred.
   */
  characterJump() {
    this.jump();
    this.hasMoved = true;
  }

  /**
   * Checks if the character has moved and updates the last movement time accordingly.
   * This is used to control idle animations.
   */
  checkHasMoved() {
    let checkHasMoved = setInterval(() => {
      if (this.hasMoved) {
        this.lastMovementTime = Date.now();
      }
    }, 1000 / 60);
    intervalIds.push(checkHasMoved);
  }

  /**
   * Animates the character's walking motion.
   * Pauses walking sound if character is not moving, checks for death or hurt states, and plays walking animation if moving.
   */
  animateMovingCharacter() {
    let Animation = setInterval(() => {
      if (gameStatusPause) return;
      if (this.checkDeadAnimation()) {
      } else if (this.checkHurtAnimation()) {
      } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
        this.playAnimation(this.Images_Walking);
        this.walking_sound.play();
      } else if (!this.world.keyboard.RIGHT || !this.world.keyboard.LEFT) {
        this.walking_sound.pause();
      }
    }, 50);
    intervalIds.push(Animation);
  }

  /**
   * Animates the character's idle state based on time since the last movement.
   * Plays a wait animation if idle for 5 seconds or longer, otherwise plays the idle animation.
   */
  animateWaitingCharacter() {
    let waitAnimation = setInterval(() => {
      if (gameStatusPause) return;
      if (Date.now() - this.lastMovementTime >= 5000) {
        this.playAnimation(this.Images_Wait);
      }
      if (Date.now() - this.lastMovementTime >= 100 && Date.now() - this.lastMovementTime < 5000) {
        this.playAnimation(this.Images_Idle);
      }
    }, 500);
    intervalIds.push(waitAnimation);
  }

  /**
   * Animates the character's jumping state by regularly checking if the jump animation should be played.
   */
  animateJumpingCharacter() {
    let jumpAnimation = setInterval(() => {
      this.checkJumpAnimation();
    }, 80);
    intervalIds.push(jumpAnimation);
  }

  /**
   * Initiates a jump by setting the vertical speed.
   */
  jump() {
    this.speedY = 30;
  }
}
