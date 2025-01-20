class Clouds extends MovableObject {
  y = 50;
  width = 500;
  height = 250;
  constructor() {
    super().loadImage('../assets/img/5_background/layers/4_clouds/1.png');
    this.animate();
  }

  animate() {
    setInterval(() => {
      this.moveLeft();
    }, 1000 / 60);
  }
}
