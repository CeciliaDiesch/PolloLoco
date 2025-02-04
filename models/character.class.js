class Character extends MovableObject {
  height = 240;
  y = 80;
  speed = 10;
  offset = {
    top: 100,
    bottom: 0,
    left: 40,
    right: 35,
  };
  world;
  hasStartedDeadAnimation = false;
  gameOver_sound = new Audio('audio/gameOver.mp3');
  hitChicken_sound = new Audio('audio/hitChicken.mp3');
  hitEndboss_sound = new Audio('audio/hitEndboss.mp3');
  walking_sound = new Audio('audio/walking4.mp3');

  Images_Walking = [
    '../assets/img/2_character_pepe/2_walk/W-21.png',
    '../assets/img/2_character_pepe/2_walk/W-22.png',
    '../assets/img/2_character_pepe/2_walk/W-23.png',
    '../assets/img/2_character_pepe/2_walk/W-24.png',
    '../assets/img/2_character_pepe/2_walk/W-25.png',
    '../assets/img/2_character_pepe/2_walk/W-26.png',
  ];

  Images_Jumping = [
    '../assets/img/2_character_pepe/3_jump/J-31.png',
    '../assets/img/2_character_pepe/3_jump/J-32.png',
    '../assets/img/2_character_pepe/3_jump/J-33.png',
    '../assets/img/2_character_pepe/3_jump/J-34.png',
    '../assets/img/2_character_pepe/3_jump/J-35.png',
    '../assets/img/2_character_pepe/3_jump/J-36.png',
    '../assets/img/2_character_pepe/3_jump/J-37.png',
    '../assets/img/2_character_pepe/3_jump/J-38.png',
    '../assets/img/2_character_pepe/3_jump/J-39.png',
  ];

  Images_Hurt = [
    '../assets/img/2_character_pepe/4_hurt/H-43.png',
    '../assets/img/2_character_pepe/4_hurt/H-41.png',
    '../assets/img/2_character_pepe/4_hurt/H-42.png',
  ];

  Images_Dead = [
    '../assets/img/2_character_pepe/5_dead/D-51.png',
    '../assets/img/2_character_pepe/5_dead/D-52.png',
    '../assets/img/2_character_pepe/5_dead/D-53.png',
    '../assets/img/2_character_pepe/5_dead/D-54.png',
    '../assets/img/2_character_pepe/5_dead/D-55.png',
    '../assets/img/2_character_pepe/5_dead/D-56.png',
    '../assets/img/2_character_pepe/5_dead/D-57.png',
  ];

  constructor() {
    super();
    this.loadImage('../assets/img/2_character_pepe/2_walk/W-22.png');
    this.loadImages(this.Images_Walking);
    this.loadImages(this.Images_Jumping);
    this.loadImages(this.Images_Hurt);
    this.loadImages(this.Images_Dead);
    this.animate();
    this.applyGravity();
  }

  animate() {
    let moving = setInterval(() => {
      //Bewegung nach rechts in einem extra INtervall, damit man es öfter pro sek abspielen kann, damit es smoother aussieht
      this.walking_sound.pause();
      if (
        this.world.keyboard.RIGHT &&
        this.x < this.world.level.level_end_x &&
        this.x < this.world.endboss.x - 10
      ) {
        this.moveRight();
        this.otherDirection = false;
        this.walking_sound.play();
      }

      if (this.world.keyboard.LEFT && this.x > 0) {
        this.moveLeft();
        this.otherDirection = true;
        this.walking_sound.play();
      }

      if (this.world.keyboard.SPACE && !this.isAboveGround()) {
        //wenn pepe wieder am ground ist, hat er ein speedY von -22.5, also ab da, kann er wieder springen
        this.jump();
      }

      this.world.camera_x = -this.x + 100;
    }, 1000 / 60);
    intervalIds.push(moving);

    let animation = setInterval(() => {
      if (this.isDead() && !this.hasStartedDeadAnimation) {
        this.hasStartedDeadAnimation = true;
        let deadFrame = 0;
        let deadAnimation = setInterval(() => {
          this.img = this.imageCache[this.Images_Dead[deadFrame]];
          deadFrame++;
          if (deadFrame >= this.Images_Dead.length) {
            this.gameOver_sound.play();
            clearInterval(deadAnimation);
          }
        }, 300);
        setTimeout(() => {
          this.stopGame();
        }, 2000);
      } else if (this.isHurt()) {
        this.playAnimation(this.Images_Hurt);
      } else if (this.isAboveGround()) {
        this.playAnimation(this.Images_Jumping);
      } else {
        if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
          //das logische Oder || um entweder das eine true oder das andere true ist
          //walk animation an einem standort mit Bilderwechsel
          this.playAnimation(this.Images_Walking);
        }
      }
    }, 50);
    intervalIds.push(animation);
  }

  stopGame() {
    intervalIds.forEach(clearInterval);
  }

  jump() {
    this.speedY = 30;
  }
}
