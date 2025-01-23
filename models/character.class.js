class Character extends MovableObject {
  height = 240;
  y = 80;
  speed = 10;
  offset = {
    top: 20,
    bottom: 20,
    left: 20,
    right: 10,
  };
  /* für ein korrigierten character drawFrame () { ctx.rect(this.x + this.offset.left, this.y + this.offset.bottom, this.width - this.offset.right,...)}  in movable-object
   offset = {
    top: 110,
    bottom: 100,
    left: 20,
    right: 40,
  };*/

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

  world;
  walking_sound = new Audio('audio/walking4.mp3');

  constructor() {
    super();
    this.loadImage('../assets/img/2_character_pepe/2_walk/W-22.png');
    this.loadImages(this.Images_Walking);
    this.loadImages(this.Images_Jumping);
    this.loadImages(this.Images_Hurt);
    this.loadImages(this.Images_Dead);
    /*this.walking_sound.playbackRate = 4;*/

    this.animate();
    this.applyGravity();
  }

  animate() {
    let moving = setInterval(() => {
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
    intervalIds.push(moving);

    let animation = setInterval(() => {
      if (this.isDead()) {
        this.playAnimation(this.Images_Dead);
        this.stopGame();
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
