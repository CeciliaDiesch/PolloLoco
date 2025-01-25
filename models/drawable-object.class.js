class DrawableObject {
  x = 120;
  y = 280;
  img;
  height = 150;
  width = 100;
  imageCache = {}; //ist ein json statt ein array, damit man bei loadImages den pfad als schlüssel nutzen kann
  currentImage = 0; // Variable um durch die Bilder durch zu iterieren
  offset = {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  };

  loadImage(path) {
    this.img = new Image(); // Image() ist bereits vorrogrammiert als (document.getElementById('image') <img id="image">), braucht man nicht extra definieren
    this.img.src = path;
  }

  draw(ctx) {
    try {
      ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    } catch (e) {
      console.log('Error loading image', e);
      console.log('Could not load image', this.img);
    }
  }

  /**
   *
   * @param {Array} arr - ['img/image1.png', ...,..]
   */
  loadImages(arr) {
    //soweit ich das verstehe, werden hier zb alle 6 bewegungsbilder von pepe in das json imageCache geladen, und nun kann man jedes mit dem jeweiligen Pfad aufrufen
    arr.forEach((path) => {
      let img = new Image(); //hier definieren wir img innerhalb der fkt und brauchen deshalb im folgenden nicht this. davor schreiben, im gegensatz zu imageCache zb
      img.src = path;
      this.imageCache[path] = img;
    });
  }

  drawFrame(ctx) {
    if (
      this instanceof Character ||
      this instanceof Chicken ||
      this instanceof Endboss ||
      this instanceof Coins ||
      this instanceof Bottle
    ) {
      //bezieht sich nur noch auf die classes character und chicken, obwohl noch mehr classes die class movable-object erben, die anderen sind dann hier ausgenommen
      ctx.beginPath();
      ctx.lineWidth = '5';
      ctx.strokeStyle = 'blue';
      ctx.rect(
        this.x + this.offset.left,
        this.y + this.offset.top,
        this.width - this.offset.right - this.offset.right,
        this.height - this.offset.top - this.offset.bottom
      );
      ctx.stroke();
    }
  }
}
