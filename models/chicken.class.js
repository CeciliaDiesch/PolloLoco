class Chicken extends MovableObject {
  y = 382;
  img;
  height = 50;
  width = 40;
  offset = {
    top: 0,
    bottom: 0,
    left: 10,
    right: 10,
  };
  Images_Walking = [
    '../assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
    '../assets/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
    '../assets/img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
  ];

  constructor() {
    super();
    this.loadImage('../assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
    this.loadImages(this.Images_Walking);
    this.x = 350 + Math.random() * 500; //math.random() berechnet irgendeine random zahl zw 0 und 1 (* 500 damit zw 0 und 500)
    this.speed = 0.1 + Math.random() * 0.7;

    this.animate();
  }

  animate() {
    this.ChickenMovementInterval = setInterval(() => {
      this.moveLeft();
    }, 1000 / 60); //60 mal pro sekunde wird 0.1px von der x koordinate abgezogen
    intervalIds.push(this.ChickenMovementInterval);

    this.ChickenAnimationInterval = setInterval(() => {
      this.playAnimation(this.Images_Walking);
    }, 300);
    intervalIds.push(this.ChickenAnimationInterval);
  }
}
