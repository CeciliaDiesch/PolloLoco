class Coins extends MovableObject {
  y = 100;
  width = 200;
  height = 200;
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
    this.x = 200 + Math.random() * 2200 + 200;
  }

  animate() {
    this.moveUpAndDown();
  }
}
