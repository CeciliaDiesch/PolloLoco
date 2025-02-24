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

  run() {
    let run = setInterval(() => {
      this.checkCollisions();
      this.checkThrowObjects();
    }, 1000 / 20);
    intervalIds.push(run);
  }

  checkCollisions() {
    this.checkCollisionCharacterEnemy();
    this.ckeckCollisionCharacterCoins();
    this.ckeckCollisionCharacterBottles();
    this.ckeckCollisionBottlesEndboss();
    this.ckeckCollisionCharacterEndboss();
  }

  checkCollisionCharacterEnemy() {
    this.level.enemies.forEach((enemy) => {
      if (this.character.isColliding(enemy)) {
        this.character.hit();
        this.statusbar.setPercentage(this.character.energy);
      }
    });
  }

  ckeckCollisionCharacterCoins() {
    this.level.coins.forEach((coin) => {
      if (this.character.isColliding(coin)) {
        this.character.hitCoin(coin);
        this.statusbar.setPercentageCoins(this.character.coins);
      }
    });
  }

  ckeckCollisionCharacterBottles() {
    this.level.bottle.forEach((bottle) => {
      if (this.character.isColliding(bottle)) {
        this.character.hitBottle(bottle);
        this.statusbar.setPercentageBottles(this.character.bottle);
      }
    });
  }

  ckeckCollisionBottlesEndboss() {
    this.throwableObjects.forEach((bottleThrown) => {
      if (!bottleThrown.bottleHitCounted && this.endboss.isColliding(bottleThrown)) {
        this.endboss.hitEndboss(bottleThrown);
        this.statusbar.setPercentageEndboss(this.endboss.bottleHitEndboss);
      }
    });
  }

  ckeckCollisionCharacterEndboss() {
    if (this.character.isColliding(this.endboss)) {
      this.character.hit();
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

  shiftLeftBackground(movementDelta) {
    this.ctx.translate(this.camera_x, 0);
    this.addObjectToMap(this.level.background, movementDelta);
    this.ctx.restore();
  }

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

  addToMap(mo) {
    if (mo.otherDirection) {
      this.flipImage(mo);
    } else {
      mo.draw(this.ctx);
    }
  }

  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.x + mo.width, 0);
    this.ctx.scale(-1, 1);
    this.ctx.drawImage(mo.img, 0, mo.y, mo.width, mo.height);
    this.ctx.restore();
  }

  removeObject(obj) {
    const levelArrays = ['bottle', 'coins'];
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
