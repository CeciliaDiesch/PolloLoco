/**
 * Represents a bottle object in the game.
 * Extends MovableObject.
 *
 * @class Bottle
 * @extends MovableObject
 *
 * @property {number} maximalX - The maximum x-coordinate the bottle can reach (default: 2150).
 * @property {number} y - The vertical position of the bottle.
 * @property {number} height - The height of the bottle.
 * @property {number} width - The width of the bottle.
 * @property {Object} offset - The collision offsets for the bottle.
 * @property {number} offset.top - Top offset.
 * @property {number} offset.bottom - Bottom offset.
 * @property {number} offset.left - Left offset.
 * @property {number} offset.right - Right offset.
 */
class Bottle extends MovableObject {
  x;
  maximalX = 2150;
  y = 360;
  img;
  height = 80;
  width = 60;
  offset = {
    top: 15,
    bottom: 10,
    left: 10,
    right: 5,
  };

  /**
   * Constructs a new Bottle instance by loading its ground image and setting its x-coordinate
   * to a random value bounded by maximalX.
   * @constructor
   */
  constructor() {
    super();
    this.loadImage('../assets/img/6_salsa_bottle/1_salsa_bottle_on_ground.png');
    this.x = Math.min(200 + Math.random() * 2200, this.maximalX);
  }
}
