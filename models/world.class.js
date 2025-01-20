class World {
  character = new Character();
  level = level1; // enemies, clouds, background wird jetzt definiert in level1.js und level.class.js über das level1.
  enemies = level1.enemies;
  clouds = level1.clouds;
  background = level1.background;
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
  }

  setWorld() {
    this.character.world = this; //eine instanz auf alle movable objects übergeben, haupstsächlich erstmal auf den character
    this.enemies.forEach((enemy) => {
      enemy.world = this; // Welt-Referenz an alle Feinde übergeben, einschließlich Endboss
    });
  }

  draw() {
    this.ctx.clearRect(0, 0, canvas.width, canvas.height); //cleared das ganze canvas um nur neue position von inhalten anzuzeigen

    this.ctx.translate(this.camera_x, 0); //elemente nach links verschieben

    this.addObjectToMap(this.level.background);
    this.addToMap(this.character);
    this.addObjectToMap(this.level.enemies);
    this.addObjectToMap(this.level.clouds);

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
      this.ctx.save();
      this.ctx.translate(mo.x + mo.width, 0); //dies verändert die transformationsmatrix, wie alle folgenden zeichnungen auf dem canvas dargestellt werden, bis die Transformationen rückgängig gemacht werden mit vorher ctx.save und hinterher ctx.restore
      this.ctx.scale(-1, 1);
      this.ctx.drawImage(mo.img, 0, mo.y, mo.width, mo.height);
      this.ctx.restore(); // hier wird die trafo matrix wieder zurückgesetzt, nachdem das eine gespiegelte character bild eingefügt wurde
    } else {
      this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);
    }
  }
}
