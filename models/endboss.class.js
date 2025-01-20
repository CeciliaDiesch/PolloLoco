class Endboss extends MovableObject {
  height = 420;
  width = 220;
  y = 40;
  world;

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

  constructor() {
    /*super().loadImage(this.Images_Walking[0]);*/
    /*this.loadImages(this.Images_Walking);*/
    super().loadImage(this.Images_Angry[0]);
    this.x = 2500;

    this.loadImages(this.Images_Angry);

    this.animate();
  }

  animate() {
    setInterval(() => {
      if (this.world.camera_x <= -2150) {
        this.playAnimation(this.Images_Angry);
      }
    }, 300);
  }
}
