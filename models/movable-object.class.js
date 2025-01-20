class MovableObject {
  x = 120;
  y = 280;
  img;
  height = 150;
  width = 100;
  imageCache = {}; //ist ein json statt ein array, damit man bei loadImages den pfad als schlüssel nutzen kann
  currentImage = 0; // Variable um durch die Bilder durch zu iterieren
  speed = 0.1;
  otherDirection = false;
  world;
  speedY = 0;
  accelartion = 2.5;

  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        //speed Y wird ja positiv wenn man hoch springen will, was ja passiert, wenn man UP drückt
        this.y -= this.speedY;
        this.speedY -= this.accelartion;
      }
    }, 1000 / 25);
  }

  isAboveGround() {
    return this.y < 180; //gibt an, sobald pepe wieder bis auf ground level runtergefallen ist
  }

  loadImage(path) {
    this.img = new Image(); // Image() ist bereits vorrogrammiert als (document.getElementById('image') <img id="image">), braucht man nicht extra definieren
    this.img.src = path;
  }

  /**
   *
   * @param {Array} arr - ['img/image1.png', ...,..]
   */
  loadImages(arr) {
    //soweit ich das verstehe, werden hier zb alle 6 bewegungsbilder von pepe in das json imageCache geladen, und nun kann man jedes mit dem jeweiligen Pfad aufrufen
    arr.forEach((path) => {
      let img = new Image(); //hier definieren wir img innerhalb der fkt und brauchen deshalb im folgenden nicht this. davor schreiben, im gegensatz zu imageCache zb
      img.src = path;
      this.imageCache[path] = img;
    });
  }

  playAnimation(images) {
    let i = this.currentImage % images.length; //% steht für Modulu, ist also der Restvom Images_walking Array, also 6, also let i=0 % 6 (zb i=5%6 ist 0 Rest 5, i=6%6 ist 1 Rest 0, i=7%6 ist 1 Rest 1) also ist i = 0,1,2,3,4,5,0,1,2,3,4,5,0,1,2...
    let path = images[i];
    this.img = this.imageCache[path]; //Wir greifen auf einen Eintrag von unserem Array zu
    this.currentImage++;
  }

  moveLeft() {
    this.x -= this.speed;
    if (this.x + this.width < 0) {
      // Setze die x-Position auf level_end_x
      this.x = this.world.level.level_end_x;
    }
  }

  moveRight() {
    this.x += this.speed;
  }

  moveUpAndDown() {
    let direction = 1; // 1 = nach unten, -1 = nach oben
    let step = 1; // Schrittgröße
    let minY = 30; // Minimaler y-Wert
    let maxY = 50; // Maximaler y-Wert

    setInterval(() => {
      this.y += direction * step;
      if (this.y <= minY) {
        this.y = minY;
        direction = 1; // Richtung ändern zu nach unten
      } else if (this.y >= maxY) {
        this.y = maxY;
        direction = -1; // Richtung ändern zu nach oben
      }
    }, 1000 / 60); // 60 Mal pro Sekunde für flüssige Bewegung
  }
}
