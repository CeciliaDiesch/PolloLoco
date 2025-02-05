class Endboss extends MovableObject {
  height = 420;
  width = 220;
  y = 40;
  offset = {
    top: 75,
    bottom: 100,
    left: 60,
    right: 25,
  };
  world;
  endbossWalk = false;
  hasStartedBossMovement = false;

  ouch_sound = new Audio('audio/ouch1.mp3');
  paused = false;

  Images_Walking = [
    '../assets/img/4_enemie_boss_chicken/1_walk/G1.png',
    '../assets/img/4_enemie_boss_chicken/1_walk/G2.png',
    '../assets/img/4_enemie_boss_chicken/1_walk/G3.png',
    '../assets/img/4_enemie_boss_chicken/1_walk/G4.png',
  ];

  Images_Angry = [
    '../assets/img/4_enemie_boss_chicken/2_alert/G5.png',
    '../assets/img/4_enemie_boss_chicken/2_alert/G6.png',
    '../assets/img/4_enemie_boss_chicken/2_alert/G7.png',
    '../assets/img/4_enemie_boss_chicken/2_alert/G8.png',
    '../assets/img/4_enemie_boss_chicken/2_alert/G9.png',
    '../assets/img/4_enemie_boss_chicken/2_alert/G10.png',
    '../assets/img/4_enemie_boss_chicken/2_alert/G11.png',
    '../assets/img/4_enemie_boss_chicken/2_alert/G12.png',
  ];

  Images_Hurt = [
    '../assets/img/4_enemie_boss_chicken/4_hurt/G21.png',
    '../assets/img/4_enemie_boss_chicken/4_hurt/G22.png',
    '../assets/img/4_enemie_boss_chicken/4_hurt/G23.png',
  ];

  Images_Dead = [
    '../assets/img/4_enemie_boss_chicken/5_dead/G24.png',
    '../assets/img/4_enemie_boss_chicken/5_dead/G25.png',
    '../assets/img/4_enemie_boss_chicken/5_dead/G26.png',
  ];

  constructor() {
    super();
    this.loadImage(this.Images_Angry[0]);
    this.x = 2350;

    this.loadImages(this.Images_Angry);
    this.loadImages(this.Images_Walking);
    this.loadImages(this.Images_Hurt);
    this.loadImages(this.Images_Dead);
    this.speed = 0.1;
    this.previousX = this.x;

    this.animate();
  }

  animate() {
    this.EndbossAnimationInterval = setInterval(() => {
      if (this.checkDeadAnimation()) {
      } else if (this.x == this.previousX && this.world && this.world.camera_x <= -1900) {
        this.playAnimation(this.Images_Angry);
        this.world.statusbar.showEndbossStatusbar = true;
      } else if (this.paused) {
        this.playAnimation(this.Images_Hurt);
      } else if (this.x !== this.previousX && !this.paused) {
        this.playAnimation(this.Images_Walking);
      }
    }, 300);
    intervalIds.push(this.EndbossAnimationInterval);

    this.checkBossStart = setInterval(() => {
      if (this.world && this.world.camera_x <= -1900 && !this.hasStartedBossMovement) {
        if (this.paused) return;
        this.hasStartedBossMovement = true;
        setTimeout(() => {
          this.EndbossMovementInterval = setInterval(() => {
            if (!this.paused) {
              this.moveLeft();
            }
          }, 1000 / 500);
          intervalIds.push(this.EndbossMovementInterval);
        }, 3000);
      }
    }, 100);
    intervalIds.push(this.checkBossStart);
  }
}
