/**
 * Represents the game world with all its elements and starts the game loop.
 *
 * @class World
 * @property {Character} character - The main game character.
 * @property {Endboss} endboss - The final boss enemy.
 * @property {Level} level - The current level instance.
 * @property {Enemy[]} enemies - Array of enemy objects from the level.
 * @property {Clouds[]} clouds - Array of cloud objects from the level.
 * @property {Background1[]} background - Array of background layer objects.
 * @property {Bottle[]} bottle - Array of bottle objects from the level.
 * @property {Coins[]} coins - Array of coin objects from the level.
 * @property {Statusbar} statusbar - The status bars displaying game info.
 * @property {ThrowableObject[]} throwableObjects - Array of objects that can be thrown.
 * @property {HTMLCanvasElement} canvas - The canvas element used for rendering.
 * @property {CanvasRenderingContext2D} ctx - The 2D rendering context of the canvas.
 * @property {Object} keyboard - The global keyboard input object.
 * @property {number} camera_x - The horizontal camera offset.
 * @property {boolean} gameOver - Indicates if the game is over.
 */
class World {
  character = new Character();
  endboss = new Endboss();
  level = level1;
  enemies = level1.enemies;
  clouds = level1.clouds;
  background = level1.background;
  bottle = level1.bottle;
  coins = level1.coins;
  statusbar = new Statusbar();
  throwableObjects = [];
  canvas;
  ctx;
  keyboard;
  camera_x = 0;
  gameOver = false;

  /**
   * Constructs a new World instance, initializing the rendering context, keyboard input, and game state.
   */
  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext('2d');
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.characterAttackCounted = false;
    this.draw();
    this.setWorld();
    this.run();
    this.lost = false;
    this.endscreen = new EndScreen(this);
  }

  /**
   * Assigns the current world instance to all contained game objects.
   */
  setWorld() {
    this.character.world = this;
    this.endboss.world = this;
    this.enemies.forEach((enemy) => {
      enemy.world = this;
    });
    this.clouds.forEach((cloud) => {
      cloud.world = this;
    });
    this.bottle.forEach((bottle) => {
      bottle.world = this;
    });
    this.statusbar.world = this;
  }

  /**
   * Runs the game loop by repeatedly checking collisions and thrown objects.
   */
  run() {
    let run = setInterval(() => {
      this.checkCollisions();
      this.checkThrowObjects();
    }, 1000 / 20);
    intervalIds.push(run);
  }

  /**
   * Checks all collision events by calling individual collision check methods.
   */
  checkCollisions() {
    this.checkCollisionCharacterEnemy();
    this.ckeckCollisionCharacterCoins();
    this.ckeckCollisionCharacterBottles();
    this.ckeckCollisionBottlesEndboss();
    this.ckeckCollisionCharacterEndboss();
    this.checkCollisionBottlesEnemy();
  }

  /**
   * Checks collision between the character and each enemy.
   * If colliding, the character is hit and the statusbar energy is updated.
   */
  checkCollisionCharacterEnemy() {
    this.level.enemies.forEach((enemy) => {
      if (this.character.isColliding(enemy)) {
        if (enemy instanceof ChickenSmall) {
          this.character.hit(2);
        } else {
          this.character.hit(3);
        }
        this.statusbar.setPercentage(this.character.energy);
      }
    });
  }

  /**
   * Checks collision between the character and coins.
   * If colliding, the character collects the coin and the statusbar coin percentage is updated.
   */
  ckeckCollisionCharacterCoins() {
    this.level.coins.forEach((coin) => {
      if (this.character.isColliding(coin)) {
        this.character.hitCoin(coin);
        this.statusbar.setPercentageCoins(this.character.coins);
      }
    });
  }

  /**
   * Checks collision between the character and bottles.
   * If colliding, the character collects the bottle and the statusbar bottle percentage is updated.
   */
  ckeckCollisionCharacterBottles() {
    this.level.bottle.forEach((bottle) => {
      if (this.character.isColliding(bottle)) {
        this.character.hitBottle(bottle);
        this.statusbar.setPercentageBottles(this.character.bottle);
      }
    });
  }

  /**
   * Checks collision between thrown bottles and the chickens.
   * If a collision occurs the chicken disappears.
   */
  checkCollisionBottlesEnemy() {
    this.level.enemies.forEach((enemy) => {
      this.throwableObjects.forEach((bottleThrown) => {
        if (enemy.isColliding(bottleThrown)) {
          enemy.hitEnemyBottle(bottleThrown);
        }
      });
    });
  }

  /**
   * Checks collision between thrown bottles and the endboss.
   * If a collision occurs and the bottle hasn't been counted yet as a hit, the endboss is hit and the statusbar is updated.
   */
  ckeckCollisionBottlesEndboss() {
    this.throwableObjects.forEach((bottleThrown) => {
      if (!bottleThrown.bottleHitCounted && this.endboss.isColliding(bottleThrown)) {
        this.endboss.hitEndboss(bottleThrown);
        this.statusbar.setPercentageEndboss(this.endboss.bottleHitEndboss);
      }
    });
  }

  /**
   * Checks collision between the character and the endboss.
   * If colliding on the ground, the character is hit and the characters statusbar energy is updated.
   * Additionally, if the character is above ground and not already counted, the endboss is hit and the endbosses statusbar is updated, and a hit sound is played.
   */
  ckeckCollisionCharacterEndboss() {
    if (this.character.isColliding(this.endboss)) {
      this.character.hit(8);
      this.statusbar.setPercentage(this.character.energy);
    }
    if (this.character.isColliding(this.endboss) && this.character.isAboveGround()) {
      if (!this.characterAttackCounted) {
        this.endboss.hitEndboss();
        this.statusbar.setPercentageEndboss(this.endboss.bottleHitEndboss);
        this.characterAttackCounted = true;
        restartSound(this.character.hitEndboss_sound);
      }
      setTimeout(() => {
        this.characterAttackCounted = false;
      }, 3000);
    }
  }

  /**
   * Checks if the throw action is triggered (X key pressed) and, if so, creates and throws a new throwable object.
   * Deducts bottle count and updates the bottle statusbar accordingly.
   */
  checkThrowObjects() {
    if (this.keyboard.X && !this.keyboard.xWasPressed && this.character.bottle >= 20) {
      this.keyboard.xWasPressed = true;
      this.character.bottle -= 20;
      let bottlesFly = new ThrowableObject(this.character.x + 50, this.character.y + 100, this);
      bottlesFly.otherDirection = this.character.otherDirection;
      this.throwableObjects.push(bottlesFly);
      this.throwableObjects.world = this;
      bottlesFly.throw();
      this.statusbar.setPercentageBottles(this.character.bottle);
    }
  }

  /**
   * Draws the current game frame by clearing the canvas and shifts background and game objects to the left when pov (perspective of view) is moving right,
   * and recursively schedules the next frame.
   */
  draw() {
    let movementDelta = this.camera_x - (this.previousCamera_x || 0);
    this.previousCamera_x = this.camera_x;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.save();
    this.shiftLeftBackground(movementDelta);
    this.addToMap(this.statusbar);
    this.ctx.save();
    this.shiftleftRest();
    if (this.gameOver) {
      this.addToMap(this.endscreen);
    }
    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  /**
   * Shifts the background layer to the left by translating the canvas and drawing background objects.
   * @param {number} movementDelta - The change in camera position since the last frame.
   */
  shiftLeftBackground(movementDelta) {
    this.ctx.translate(this.camera_x, 0);
    this.addObjectToMap(this.level.background, movementDelta);
    this.ctx.restore();
  }

  /**
   * Shifts the remaining game objects (endboss, character, throwable objects, enemies, clouds, bottles, coins) to the left and draws them on the canvas.
   */
  shiftleftRest() {
    this.ctx.translate(this.camera_x, 0);
    this.addToMap(this.endboss);
    this.addToMap(this.character);
    this.addObjectToMap(this.throwableObjects);
    this.addObjectToMap(this.level.enemies);
    this.addObjectToMap(this.level.clouds);
    this.addObjectToMap(this.level.bottle);
    this.addObjectToMap(this.level.coins);
    this.ctx.restore();
  }

  /**
   * Moves each object based on their movement adjustment factor and draws it on the canvas.
   * For Background1 objects and Bottles, applies a movement delta before drawing.
   * @param {Array} obj - An array of game objects.
   * @param {number} [movementDelta=0] - The movement adjustment factor for background objects.
   */
  addObjectToMap(obj, movementDelta = 0) {
    obj.forEach((object) => {
      if (object instanceof Background1) {
        object.x -= movementDelta * object.speedFactor;
      }
      if (object instanceof Bottle) {
        object.x -= movementDelta * 0.3;
      }
      this.addToMap(object);
    });
  }

  /**
   * Draws a game object on the canvas. If the object is marked to be flipped (otherDirection),
   * it calls flipImage; otherwise, it calls the object's draw method.
   * @param {Object} mo - A movable object with a draw method and optional otherDirection flag.
   */
  addToMap(mo) {
    if (mo.otherDirection) {
      this.flipImage(mo);
    } else {
      mo.draw(this.ctx);
    }
  }

  /**
   * Draws a flipped image of the given game object on the canvas.
   * @param {Object} mo - A movable object with properties: img, x, y, width, and height.
   */
  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.x + mo.width, 0);
    this.ctx.scale(-1, 1);
    this.ctx.drawImage(mo.img, 0, mo.y, mo.width, mo.height);
    this.ctx.restore();
  }

  /**
   * Removes an object from the level's bottle or coins arrays, or from the throwableObjects array.
   * @param {Object} obj - The object to be removed.
   */
  removeObject(obj) {
    const levelArrays = ['bottle', 'coins', 'enemies'];
    for (let arrayName of levelArrays) {
      const index = this.level[arrayName].indexOf(obj);
      if (index > -1) {
        this.level[arrayName].splice(index, 1);
        return;
      }
    }
    const throwableIndex = this.throwableObjects.indexOf(obj);
    if (throwableIndex > -1) {
      this.throwableObjects.splice(throwableIndex, 1);
      return;
    }
  }
}
