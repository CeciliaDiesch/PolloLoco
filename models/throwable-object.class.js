class ThrowableObject extends MovableObject {
  height = 70;
  width = 50;
  world;
  bottle_sound_flying = new Audio('audio/bottleFly.mp3');
  bottle_sound_flying_straight = new Audio('audio/bottleFlyStraight.mp3');
  bottle_sound_splash = new Audio('audio/bottleSplash.mp3');
  moveXInterval;
  checkGroundInterval;

  Images_Throwing = [
    '../assets/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
    '../assets/img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
    '../assets/img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
    '../assets/img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
  ];

  Images_Splash = [
    '../assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
    '../assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
    '../assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
    '../assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
    '../assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
    '../assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
    '../assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',
  ];

  constructor(x, y, world, bottle) {
    super();
    this.x = x;
    this.y = y;
    this.world = world;
    this.bottle = bottle;
    this.loadImage('../assets/img/6_salsa_bottle/salsa_bottle.png');
    this.loadImages(this.Images_Throwing);
    this.loadImages(this.Images_Splash);
    this.bottle_sound_flying.loop = true; //Loopt den Sound
    this.bottle_sound_flying_straight.playbackRate = 0.5;
    this.animate();
  }

  animate() {
    let throwing = setInterval(() => {
      this.bottle_sound_flying.pause();
      if (this.world.keyboard && this.world.keyboard.X && this.isAboveGround()) {
        console.log('x wurde gedrückt');
        this.playAnimation(this.Images_Throwing);
        this.bottle_sound_flying.play();
        this.splashPlayed = false;
      }
    }, 65);
  }

  throw() {
    this.bottle_sound_flying.currentTime = 0;
    this.bottle_sound_flying_straight.play();
    super.throw();
  }

  stopFlying() {
    // Pausiere den Flug-Sound
    this.bottle_sound_flying.pause();
    this.bottle_sound_flying_straight.pause();
    this.bottle_sound_flying.currentTime = 0; // Setze den Startpunkt zurück
    this.bottle_sound_flying_straight.currentTime = 0;
    super.stopFlying();

    // Setzt eine kurze Verzögerung, bevor die Splash-Flasche entfernt wird
    setTimeout(() => {
      this.world.removeObject(this); // Rufe die allgemeine stopFlying() Methode aus MovableObject auf
      console.log('Splash-Flasche wurde aus der Welt entfernt.');
    }, 3000); // Entfernt die Splash-Flasche nach 3 Sekunde
  }
}
