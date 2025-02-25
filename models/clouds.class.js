/**
 * Represents a cloud object in the game.
 * Extends MovableObject.
 *
 * @class Clouds
 * @extends MovableObject
 * @property {number} y - The vertical position of the cloud.
 * @property {number} width - The width of the cloud.
 * @property {number} height - The height of the cloud.
 */
class Clouds extends MovableObject {
  y = 50;
  width = 500;
  height = 250;

  /**
   * Constructs a new Clouds instance by loading its initial image and starting its animation.
   * @constructor
   */
  constructor() {
    super().loadImage('../assets/img/5_background/layers/4_clouds/1.png');
    this.animate();
  }

  /**
   * Animates the cloud by moving it to the left at 60 frames per second.
   * If the game is paused (gameStatusPause is true), the movement is skipped.
   */
  animate() {
    this.cloudAnimationInterval = setInterval(() => {
      if (gameStatusPause) return;
      this.moveLeft();
    }, 1000 / 60);
    intervalIds.push(this.cloudAnimationInterval);
  }
}
