class MovableObject extends DrawableObject {
  speed = 0.1;
  otherDirection = false;
  world;
  speedY = 0;
  accelartion = 2.5;
  energy = 100;
  coins = 100;
  lastHit = 0;
  world;

  constructor() {
    super();
  }

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

  isColliding(obj) {
    return (
      this.x + this.width - this.offset.right >= obj.x + obj.offset.left &&
      this.x + this.offset.left <= obj.x + obj.width - obj.offset.right &&
      this.y + this.height - this.offset.top >= obj.y + obj.offset.bottom && //irgendwie noch + this.offsetY mit in this.y + this.offsetY + this.height reinbringen für besserer genauigkeit?!
      this.y + this.offset.bottom <= obj.y + obj.height - obj.offset.top // irgendwie noch this.y + this.offsetY mit reinbringen für besserer genauigkeit ?!
    );
  }

  hitCoin() {
    this.coin += 20;
    if (this.coin > 100) {
      this.coin = 100;
    }
  }

  hit() {
    this.energy -= 5;
    if (this.energy < 0) {
      this.energy = 0;
    } else {
      this.lastHit = new Date().getTime(); //ms die seit dem 1.1.1970 vergangen sind
    }
  }

  isHurt() {
    let timepassed = new Date().getTime() - this.lastHit; // Difference in ms
    timepassed = timepassed / 1000; // Difference in s
    return timepassed < 1; // wird als true zurück gegeben wenn differenz kleiner als 5 sekunden
  }

  isDead() {
    return this.energy == 0;
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
