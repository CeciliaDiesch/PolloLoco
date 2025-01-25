class Bottle extends MovableObject {
  x;
  y = 360;
  img;
  height = 80;
  width = 60;
  offset = {
    top: 15,
    bottom: 10,
    left: 20,
    right: 15,
  };
  constructor() {
    super();
    this.loadImage('../assets/img/6_salsa_bottle/1_salsa_bottle_on_ground.png'); //es braucht kein super wenn man nicht von einer anderen klasse erbt mit extend ..
    this.x = 200 + Math.random() * 2200;
  }
}
