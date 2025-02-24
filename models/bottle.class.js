class Bottle extends MovableObject {
  x;
  maximalX = 2150;
  y = 360;
  img;
  height = 80;
  width = 60;
  offset = {
    top: 15,
    bottom: 10,
    left: 10,
    right: 5,
  };
  constructor() {
    super();
    this.loadImage('../assets/img/6_salsa_bottle/1_salsa_bottle_on_ground.png');
    this.x = Math.min(200 + Math.random() * 2200, this.maximalX);
  }
}
