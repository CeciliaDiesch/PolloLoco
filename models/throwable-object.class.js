class ThrowableObject extends MovableObject {
  height = 70;
  width = 50;
  world;
  bottle_sound_flying = createSound('audio/bottleFly.mp3');
  bottle_sound_flying_straight = createSound('audio/bottleFlyStraight.mp3');
  bottle_sound_splash = createSound('audio/bottleSplash.mp3');
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
    this.bottle_sound_flying.loop = true;
    this.bottle_sound_flying_straight.playbackRate = 0.5;
    this.animate();
  }

  animate() {
    let throwing = setInterval(() => {
      this.bottle_sound_flying.pause();
      if (this.world.keyboard && this.world.keyboard.X && this.isAboveGround() && !this.splashPlayed) {
        this.playAnimation(this.Images_Throwing);
        restartSound(this.bottle_sound_flying);
        this.splashPlayed = false;
      }
    }, 65);
    intervalIds.push(throwing);
  }

  throw() {
    this.bottle_sound_flying.currentTime = 0;
    restartSound(this.bottle_sound_flying_straight);
    super.throw();
  }

  stopFlying() {
    this.bottle_sound_flying.pause();
    this.bottle_sound_flying_straight.pause();
    this.bottle_sound_flying.currentTime = 0;
    this.bottle_sound_flying_straight.currentTime = 0;
    super.stopFlying();
    setTimeout(() => {
      this.world.removeObject(this);
    }, 3000);
  }

  splash() {
    this.stopFlying();
    this.splashPlayed = true;
    this.bottleHitCounted = true;
    restartSound(this.bottle_sound_splash);
    let splashFrame = 0;
    let splashAnimation = setInterval(() => {
      this.img = this.imageCache[this.Images_Splash[splashFrame]];
      splashFrame++;
      if (splashFrame >= this.Images_Splash.length) {
        clearInterval(splashAnimation);
      }
    }, 100);
    intervalIds.push(splashAnimation);
  }

  checkBottleGroundLevel() {
    this.checkGroundInterval = setInterval(() => {
      if (this.y >= 359 && !this.splashPlayed) {
        this.splash();
        this.accelartion = 2.5;
      }
    }, 1);
    intervalIds.push(this.checkGroundInterval);
  }
}
