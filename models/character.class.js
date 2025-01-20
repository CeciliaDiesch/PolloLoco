class Character extends MovableObject {
  height = 240;
  y = 80;
  speed = 10;
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

  world;
  walking_sound = new Audio('audio/walking4.mp3');

  constructor() {
    super().loadImage('../assets/img/2_character_pepe/2_walk/W-22.png');
    this.loadImages(this.Images_Walking);
    this.loadImages(this.Images_Jumping);
    /*this.walking_sound.playbackRate = 4;*/

    this.animate();
    this.applyGravity();
  }

  animate() {
    setInterval(() => {
      //Bewegung nach rechts in einem extra INtervall, damit man es öfter pro sek abspielen kann, damit es smoother aussieht
      this.walking_sound.pause();
      if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
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

    setInterval(() => {
      if (this.isAboveGround()) {
        this.playAnimation(this.Images_Jumping);
      } else {
        if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
          //das logische Oder || um entweder das eine true oder das andere true ist
          //walk animation an einem standort mit Bilderwechsel
          this.playAnimation(this.Images_Walking);
        }
      }
    }, 50);
  }

  jump() {
    this.speedY = 30;
  }
}
