/**
 * Represents a coin object in the game.
 * Extends MovableObject
 *
 * @class Coins
 * @extends MovableObject
 * @property {number} y - The vertical position of the coin.
 * @property {number} width - The width of the coin.
 * @property {number} height - The height of the coin.
 * @property {number} maximalX - The maximum x-coordinate the coin can reach (default: 2150).
 * @property {Object} offset - The collision offsets for the coin.
 * @property {number} offset.top - Top offset.
 * @property {number} offset.bottom - Bottom offset.
 * @property {number} offset.left - Left offset.
 * @property {number} offset.right - Right offset.
 */
class Coins extends MovableObject {
  y = 100;
  width = 200;
  height = 200;
  maximalX = 2150;
  offset = {
    top: 65,
    bottom: 65,
    left: 65,
    right: 65,
  };

  /**
   * Constructs a new Coins instance by loading its image, starting its animation,
   * and setting its x-coordinate to a random value bounded by maximalX.
   * @constructor
   */
  constructor() {
    super();
    this.loadImage('../assets/img/8_coin/coin_1.png');
    this.animate();
    this.x = Math.min(400 + Math.random() * 2200, this.maximalX);
  }

  /**
   * Starts the coin's animation by triggering its vertical oscillation.
   */
  animate() {
    this.moveUpAndDown();
  }
}
