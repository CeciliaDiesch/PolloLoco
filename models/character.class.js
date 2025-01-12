class Character extends MovableObject {
  height = 240;
  y = 200;
  Images_Walking = [
    '../assets/img/2_character_pepe/2_walk/W-21.png',
    '../assets/img/2_character_pepe/2_walk/W-22.png',
    '../assets/img/2_character_pepe/2_walk/W-23.png',
    '../assets/img/2_character_pepe/2_walk/W-24.png',
    '../assets/img/2_character_pepe/2_walk/W-25.png',
    '../assets/img/2_character_pepe/2_walk/W-26.png',
  ];
  world;

  constructor() {
    super().loadImage('../assets/img/2_character_pepe/2_walk/W-22.png');
    this.loadImages(this.Images_Walking);

    this.animate();
  }

  animate() {
    setInterval(() => {
      if (this.world.keyboard.RIGHT) {
        let i = this.currentImage % this.Images_Walking.length; //% steht für Modulu, ist also der Restvom Images_walking Array, also 6, also let i=0 % 6 (zb i=5%6 ist 0 Rest 5, i=6%6 ist 1 Rest 0, i=7%6 ist 1 Rest 1) also ist i = 0,1,2,3,4,5,0,1,2,3,4,5,0,1,2...
        let path = this.Images_Walking[i];
        this.img = this.imageCache[path]; //Wir greifen auf einen Eintrag von unserem Array zu
        this.currentImage++;
      }
    }, 200);
  }

  jump() {}
}
