class ThrowableObject extends MovableObject {
  speed = 0.1;
  speedY = 0;
  speedX = 0;
  accelartion = 2.5;
  world;
  bottle_sound_flying = new Audio('audio/collect.mp3');
  walking_sound = new Audio('audio/walking4.mp3');

  constructor() {
    super();
    /*this.x=0;
    this.y=0;
    this.loadImage('../assets/img/6_salsa_bottle/1_salsa_bottle_on_ground.png');*/
  }

  applyGravityThrow() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        //speed Y wird ja positiv wenn man hoch springen will, was ja passiert, wenn man UP drückt
        this.y -= this.speedY;
        this.speedY -= this.accelartion;
        this.x += this.speedX;
      }
    }, 1000 / 25);
  }

  isAboveGround() {
    return this.y < 360; //gibt an, sobald die flasche wieder bis auf ground level runtergefallen ist
  }

  animate() {
    let throwing = setInterval(() => {
      this.walking_sound.pause();

      if (this.world.keyboard && this.world.keyboard.X && !this.isAboveGround()) {
        //wenn pepe wieder am ground ist, hat er ein speedY von -22.5, also ab da, kann er wieder springen
        this.throw();
        this.walking_sound.play();
      }

      /*this.world.camera_x = -this.x + 100;*/
    }, 1000 / 10);
    /*intervalIds.push(throwing);*/
  }

  throw() {
    this.speedY = 30;
    this.speedX = 20;
  }
}
