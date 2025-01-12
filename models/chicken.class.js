class Chicken extends MovableObject {
  y = 382;
  img;
  height = 50;
  width = 40;
  Images_Walking = [
    '../assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
    '../assets/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
    '../assets/img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
  ];

  constructor() {
    super().loadImage('../assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
    this.loadImages(this.Images_Walking);

    this.x = 200 + Math.random() * 500; //math.random() berechnet irgendeine random zahl zw 0 und 1 (* 500 damit zw 0 und 500)
    this.speed = 0.1 + Math.random() * 0.7;

    this.animate();
  }

  animate() {
    this.moveLeft();
    setInterval(() => {
      let i = this.currentImage % this.Images_Walking.length;
      let path = this.Images_Walking[i];
      this.img = this.imageCache[path];
      this.currentImage++;
    }, 300);
  }
}
