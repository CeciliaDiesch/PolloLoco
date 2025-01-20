class Bottle {
  x;
  y = 360;
  img;
  height = 80;
  width = 60;
  constructor() {
    this.loadImage('../assets/img/6_salsa_bottle/1_salsa_bottle_on_ground.png'); //es braucht kein super wenn man nicht von einer anderen klasse erbt mit extend ..
    this.x = 200 + Math.random() * 2200;
  }
  loadImage(path) {
    this.img = new Image(); // Image() ist bereits vorrogrammiert als (document.getElementById('image') <img id="image">), braucht man nicht extra definieren
    this.img.src = path;
  }
}
