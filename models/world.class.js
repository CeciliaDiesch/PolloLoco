class World {
  character = new Character();
  endboss = new Endboss();
  level = level1; // enemies, clouds, background wird jetzt definiert in level1.js und level.class.js über das level1.
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

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext('2d'); //mit dieser variable kann man jetzt viele funktionen aufrufen
    this.canvas = canvas;
    this.keyboard = keyboard;
    /*const canvasWidth = this.canvas.width; // Canvas-Breite holen
    this.background = new Background1(canvasWidth); // Canvas-Breite an Background1 übergeben
    */

    this.draw();
    this.setWorld();
    this.run();
  }

  setWorld() {
    this.character.world = this; //eine instanz auf alle movable objects übergeben, haupstsächlich erstmal auf den character
    this.endboss.world = this;
    this.enemies.forEach((enemy) => {
      enemy.world = this; // Welt-Referenz an alle Feinde übergeben
    });
    this.clouds.forEach((cloud) => {
      cloud.world = this; // Welt-Referenz an alle Clouds übergeben
    });
    this.bottle.forEach((bottle) => {
      bottle.world = this; // Welt-Referenz an alle Bottles übergeben
    });

    this.statusbar.world = this;
  }

  run() {
    let run = setInterval(() => {
      //check collisions
      this.checkCollisions();
      this.checkThrowObjects();
    }, 1000 / 5);
    intervalIds.push(run);
    console.log('InetervalArray is', intervalIds);
  }

  checkThrowObjects() {
    if (this.keyboard.X && !this.keyboard.xWasPressed && this.character.bottle >= 20) {
      this.keyboard.xWasPressed = true;
      this.character.bottle -= 20;
      let bottlesFly = new ThrowableObject(this.character.x + 100, this.character.y + 100, this);
      this.throwableObjects.push(bottlesFly);

      this.throwableObjects.world = this; // Welt-Referenz an alle throwableObjects übergeben
      bottlesFly.throw(); // Nur das neue Objekt werfen
      this.statusbar.setPercentageBottles(this.character.bottle);
      console.log('Bottle thrown', this.character.bottle);
    }
  }

  checkCollisions() {
    this.level.enemies.forEach((enemy) => {
      if (this.character.isColliding(enemy)) {
        this.character.hit(); //so rufen wir funktionen auf, mit dem subjekt character, die funktion hit() ist allerdings in movable-object definiert. ich glaube es ist egal wo sie definiert wird. In den klammern wird das obj weitergegeben
        this.statusbar.setPercentage(this.character.energy);
        console.log('collision with Character', this.character.energy);
      }
    });
    this.level.coins.forEach((coin) => {
      if (this.character.isColliding(coin)) {
        this.character.hitCoin(coin);
        this.statusbar.setPercentageCoins(this.character.coins);
        console.log('collision with Coins', this.character.coins);
      }
    });
    this.level.bottle.forEach((bottle) => {
      if (this.character.isColliding(bottle)) {
        this.character.hitBottle(bottle);
        this.statusbar.setPercentageBottles(this.character.bottle);
        console.log('collision with Bottle', this.character.bottle);
      }
    });
    this.throwableObjects.forEach((bottleThrown) => {
      if (this.endboss.isColliding(bottleThrown)) {
        this.endboss.hitEndboss(bottleThrown);
        this.statusbar.setPercentageEndboss(this.endboss.bottleHitEndboss);
        console.log('collision with BottleThrown', this.endboss.bottleHitEndboss);
      }
    });
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); //cleared das ganze canvas um nur neue position von inhalten anzuzeigen

    this.ctx.translate(this.camera_x, 0); //elemente nach links verschieben

    this.addObjectToMap(this.level.background);

    this.ctx.translate(-this.camera_x, 0); //trafo matrix resetet
    this.addToMap(this.statusbar);
    this.ctx.translate(this.camera_x, 0); //elemente nach links verschieben

    this.addToMap(this.character);

    this.addToMap(this.endboss);
    this.addObjectToMap(this.throwableObjects);
    this.addObjectToMap(this.level.enemies);
    this.addObjectToMap(this.level.clouds);
    this.addObjectToMap(this.level.bottle);
    this.addObjectToMap(this.level.coins);

    this.ctx.translate(-this.camera_x, 0); //trafo matrix resetet

    //hiermit wird die funktion so oft aufgerufen in der sekunde, wie die grafikkarte es zulässt
    let self = this; //das ist ein vorgehen in der objektorientierung, weil er this in der klammer nicht mehr kennt
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  addObjectToMap(obj) {
    obj.forEach((object) => {
      this.addToMap(object);
    });
  }

  addToMap(mo) {
    //dies ist unsere draw methode
    if (mo.otherDirection) {
      this.flipImage(mo);
    } else {
      mo.draw(this.ctx); //ist in movable-object.class gespeichert
    }
    mo.drawFrame(this.ctx); //ist in movable-object.class gespeichert
  }

  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.x + mo.width, 0); //dies verändert die transformationsmatrix, wie alle folgenden zeichnungen auf dem canvas dargestellt werden, bis die Transformationen rückgängig gemacht werden mit vorher ctx.save und hinterher ctx.restore
    this.ctx.scale(-1, 1);
    this.ctx.drawImage(mo.img, 0, mo.y, mo.width, mo.height);
    this.ctx.restore(); // hier wird die trafo matrix wieder zurückgesetzt, nachdem das eine gespiegelte character bild eingefügt wurde
  }

  removeObject(obj) {
    const levelArrays = ['bottle', 'coins'];

    for (let arrayName of levelArrays) {
      const index = this.level[arrayName].indexOf(obj);
      if (index > -1) {
        this.level[arrayName].splice(index, 1);
        console.log(`${arrayName} entfernt:`, obj);
        return;
      } else {
        console.log(`${arrayName} nicht gefunden:`, obj);
      }
    }

    const throwableIndex = this.throwableObjects.indexOf(obj);
    if (throwableIndex > -1) {
      this.throwableObjects.splice(throwableIndex, 1);
      console.log(`throwableObjects entfernt:`, obj);
      return;
    } else {
      console.log(`throwableObjects nicht gefunden:`, obj);
    }
  }
}
