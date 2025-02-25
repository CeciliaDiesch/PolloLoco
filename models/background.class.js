/**
 * Represents a background layer with specified dimensions and a speed factor for parallax scrolling.
 * Extends MovableObject.
 *
 * @class Background1
 * @extends MovableObject
 *
 * @property {number} height - The height of the background.
 * @property {number} width - The width of the background.
 * @property {number} speedFactor - The movement factor relative to the camera.
 */
class Background1 extends MovableObject {
  height = 480;
  width = 720;
  speedFactor = 1;

  /**
   * Constructs a new Background1 instance by loading the specified image,
   * setting its horizontal position, aligning its vertical position relative to its height,
   * and applying the given speed factor for parallax scrolling.
   *
   * @param {string} imgPath - The path to the background image.
   * @param {number} x - The horizontal position of the background.
   * @param {number} y - The vertical position.
   * @param {number} [speedFactor=1] - The movement factor for parallax scrolling.
   * @returns {void}
   */
  constructor(imgPath, x, y, speedFactor = 1) {
    super().loadImage(imgPath);
    this.x = x;
    this.y = 480 - this.height;
    this.speedFactor = speedFactor;
  }
}
