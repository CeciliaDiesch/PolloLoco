class World {
  character = new Character();
  level = level1; // enemies, clouds, background wird jetzt definiert in level1.js und level.class.js über das level1.
  enemies = level1.enemies;
  clouds = level1.clouds;
  background = level1.background;
  bottle = level1.bottle;
  coins = level1.coins;
  canvas;
  ctx;
  keyboard;
  camera_x = 0;
  intervalIds = [];
  i = 1;

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext('2d'); //mit dieser variable kann man jetzt viele funktionen aufrufen
    this.canvas = canvas;
    this.keyboard = keyboard;
    /*const canvasWidth = this.canvas.width; // Canvas-Breite holen
    this.background = new Background1(canvasWidth); // Canvas-Breite an Background1 übergeben
    */

    this.draw();
    this.setWorld();
    this.checkCollisions();
  }

  setWorld() {
    this.character.world = this; //eine instanz auf alle movable objects übergeben, haupstsächlich erstmal auf den character
    this.enemies.forEach((enemy) => {
      enemy.world = this; // Welt-Referenz an alle Feinde übergeben, einschließlich Endboss
    });
    this.clouds.forEach((cloud) => {
      cloud.world = this; // Welt-Referenz an alle Clouds übergeben
    });
  }

  checkCollisions() {
    setInterval(() => {
      this.level.enemies.forEach((enemy) => {
        if (this.character.isColliding(enemy)) {
          this.character.hit(); //so rufen wir funktionen auf, mit dem subjekt character, die funktion hit()steht ist allerdings in movable-object definiert. ich glaube es ist egal wo sie definiert wird
          console.log('collision with Character', this.character.energy);
        }
      });
    }, 1000);
  }

  draw() {
    this.ctx.clearRect(0, 0, canvas.width, canvas.height); //cleared das ganze canvas um nur neue position von inhalten anzuzeigen

    this.ctx.translate(this.camera_x, 0); //elemente nach links verschieben

    this.addObjectToMap(this.level.background);
    this.addToMap(this.character);
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
}
