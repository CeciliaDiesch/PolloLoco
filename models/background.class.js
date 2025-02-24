class Background1 extends MovableObject {
  height = 480;
  width = 720;
  speedFactor = 1;

  constructor(imgPath, x, y, speedFactor = 1) {
    super().loadImage(imgPath);
    this.x = x;
    this.y = 480 - this.height;
    this.speedFactor = speedFactor;
  }
}
