class ThrowableObject extends MovableObject {
  height = 70;
  width = 50;
  world;
  bottle_sound_flying = new Audio('audio/bottleFly.mp3');
  moveXInterval;
  checkGroundInterval;

  constructor(x, y, world, bottle) {
    super();
    this.x = x;
    this.y = y;
    this.world = world;
    this.bottle = bottle;
    this.loadImage('../assets/img/6_salsa_bottle/salsa_bottle.png');
    this.bottle_sound_flying.loop = true; //Loope den Sound
  }

  animate() {
    let throwing = setInterval(() => {
      this.walking_sound.pause();

      if (this.world.keyboard && this.world.keyboard.X) {
        //wenn pepe wieder am ground ist, hat er ein speedY von -22.5, also ab da, kann er wieder springen
        this.throw(100, 150);
        this.walking_sound.play();
      }

      /*this.world.camera_x = -this.x + 100;*/
    }, 1000 / 10);
    /*intervalIds.push(throwing);*/
  }

  throw() {
    this.bottle_sound_flying.currentTime = 0;
    this.bottle_sound_flying.play();
    super.throw();
  }

  stopFlying() {
    // Pausiere den Flug-Sound
    this.bottle_sound_flying.pause();
    this.bottle_sound_flying.currentTime = 0; // Setze den Startpunkt zurück

    this.loadImage(
      '../assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png'
    );
    super.stopFlying();

    // Optional: Setze eine kurze Verzögerung, bevor die Splash-Flasche entfernt wird
    setTimeout(() => {
      this.world.removeObject(this); // Rufe die allgemeine stopFlying() Methode aus MovableObject auf
      console.log('Splash-Flasche wurde aus der Welt entfernt.');
    }, 3000); // Entfernt die Splash-Flasche nach 1 Sekunde
  }
}
