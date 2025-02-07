class EndScreen extends DrawableObject {
  constructor(world) {
    super();
    this.world = world;
    this.endscreenLost = new Image();
    this.endscreenLost.src = '../assets/img/9_intro_outro_screens/game_over/oh no you lost!.png';

    this.endscreenWon = new Image();
    this.endscreenWon.src = '../assets/img/9_intro_outro_screens/win/won_2.png';
  }

  draw(ctx) {
    if (this.world.lost) {
      if (this.endscreenLost) {
        ctx.drawImage(this.endscreenLost, 0, 0, ctx.canvas.width, ctx.canvas.height);
      }
    } else {
      if (this.endscreenWon) {
        ctx.drawImage(this.endscreenWon, 0, 0, ctx.canvas.width, ctx.canvas.height);
      }
    }
  }
}
