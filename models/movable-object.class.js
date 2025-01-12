class MovableObject {
  x = 120;
  y = 280;
  img;
  height = 150;
  width = 100;
  imageCache = {}; //ist ein json statt ein array, damit man bei loadImages den pfad als schlüssel nutzen kann
  currentImage = 0; // Variable um durch die Bilder durch zu iterieren
  speed = 0.1;

  loadImage(path) {
    this.img = new Image(); // Image() ist bereits vorrogrammiert als (document.getElementById('image') <img id="image">), braucht man nicht extra definieren
    this.img.src = path;
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

  moveRight() {
    //in modernen Paradigmen braucht man function nicht mehr, Objektorientierung ist modern

    console.log('Moving right');
  }

  moveLeft() {
    setInterval(() => {
      this.x -= this.speed;
    }, 1000 / 60); //60 mal pro sekunde wird 0.1px von der x koordinate abgezogen
  }
}
