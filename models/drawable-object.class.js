/**
 * Base class for objects that should be drawn on the canvas.
 *
 * @class DrawableObject
 * @property {number} x - The x-coordinate.
 * @property {number} y - The y-coordinate.
 * @property {HTMLImageElement} img - The current image of the object.
 * @property {number} height - The height of the object.
 * @property {number} width - The width of the object.
 * @property {Object} imageCache - Cache for loaded images.
 * @property {number} currentImage - Index of the current image (default 0).
 * @property {Object} offset - Collision offsets.
 * @property {number} offset.top - Top offset.
 * @property {number} offset.bottom - Bottom offset.
 * @property {number} offset.left - Left offset.
 * @property {number} offset.right - Right offset.
 */
class DrawableObject {
  x = 120;
  y = 280;
  img;
  height = 150;
  width = 100;
  imageCache = {};
  currentImage = 0;
  offset = {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  };

  /**
   * Loads a single image from the given path and assigns it to this.img.
   * @param {string} path - The URL or path of the image to load.
   */
  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  /**
   * Draws the object's image onto the provided canvas context.
   * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
   */
  draw(ctx) {
    try {
      ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    } catch (e) {
      console.log('Error loading image', e);
      console.log('Could not load image', this.img);
    }
  }

  /**
   * Loads multiple images from an array of paths and stores them in the image cache.
   * @param {string[]} arr - An array of image paths to load.
   */
  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }

  /**
   * Draws a blue debug frame around the object if it is an instance of Character, Chicken, Endboss, Coins, or Bottle.
   * The frame helps visualize the object's collision boundaries.
   * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
   */
  drawFrame(ctx) {
    if (this instanceof Character || this instanceof Chicken || this instanceof Endboss || this instanceof Coins || this instanceof Bottle) {
      ctx.beginPath();
      ctx.lineWidth = '5';
      ctx.strokeStyle = 'blue';
      ctx.rect(this.x + this.offset.left, this.y + this.offset.top, this.width - this.offset.right - this.offset.right, this.height - this.offset.top - this.offset.bottom);
      ctx.stroke();
    }
  }
}
