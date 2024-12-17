class MovableObject {
  x = 120;
  y = 400;
  img;

  loadImage(path) {
    this.img = new Image(); // Image() ist bereits vorrogrammiert als (document.getElementById('image') <img id="image">), braucht man nicht extra definieren
    this.img.src = path;
  }

  moveRight() {
    //in modernen Paradigmen braucht man function nicht mehr, Objektorientierung ist modern
    console.log('Moving right');
  }

  moveDown() {}
  moveLeft() {}
}
