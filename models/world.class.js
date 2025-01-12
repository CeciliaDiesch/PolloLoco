class World {
  character = new Character();
  enemies = [new Chicken(), new Chicken(), new Chicken()];
  clouds = [new Clouds(), new Clouds(), new Clouds()];
  background = [
    new Background1('../assets/img/5_background/layers/air.png', 0),
    new Background1('../assets/img/5_background/layers/3_third_layer/1.png', 0),
    new Background1('../assets/img/5_background/layers/2_second_layer/1.png', 0),
    new Background1('../assets/img/5_background/layers/1_first_layer/1.png', 0),
  ];
  canvas;
  ctx;
  keyboard;

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
  }

  draw() {
    this.ctx.clearRect(0, 0, canvas.width, canvas.height); //cleared das ganze canvas um nur neue position von inhalten anzuzeigen

    this.addObjectToMap(this.background);
    this.addToMap(this.character);
    this.addObjectToMap(this.enemies);
    this.addObjectToMap(this.clouds);

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
    this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);
  }
}
