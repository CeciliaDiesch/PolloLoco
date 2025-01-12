class Background1 extends MovableObject {
  /* x = 0;
  y = 220;

 images = [];*/
  height = 480;
  width = 720;
  constructor(imgPath, x, y) {
    super().loadImage(imgPath);
    this.x = x;
    this.y = 480 - this.height; //480 ist Höhe von Canvas, in html festgelegt
    /*super();
    this.width = canvasWidth; // Setze die Breite dynamisch basierend auf dem Canvas
    this.images.push(this.loadImage('../assets/img/5_background/layers/1_first_layer/full.png'));
    this.images.push(this.loadImage('../assets/img/5_background/layers/2_second_layer/full.png'));*/
  }

  /*  loadImage(src) {
    const img = new Image();
    img.src = src;
    return img; // Gib das Bild zurück
  }*/
}
