class EndScreen extends DrawableObject {
  constructor() {
    super();
    this.loadImage('../assets/img/9_intro_outro_screens/game_over/oh no you lost!.png');
    this.animate();
  }

  animate() {
    this.EndbossAnimationInterval = setInterval(() => {
      draw(ctx);
    }, 300);
  }

  draw(ctx) {
    // Zeichnet das Endscreen-Bild über den gesamten Canvas
    ctx.drawImage(this.img, 0, 0, ctx.canvas.width, ctx.canvas.height);
  }
}
