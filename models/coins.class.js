class Coins extends MovableObject {
  y = 100;
  width = 200;
  height = 200;
  maximalX = 2150;
  offset = {
    top: 65,
    bottom: 65,
    left: 65,
    right: 65,
  };
  constructor() {
    super();
    this.loadImage('../assets/img/8_coin/coin_1.png');
    this.animate();
    this.x = Math.min(400 + Math.random() * 2200, this.maximalX);
  }

  animate() {
    this.moveUpAndDown();
  }
}
