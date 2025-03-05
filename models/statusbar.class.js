/**
 * Represents the game's status bars, displaying the characters health, coins, bottles, and the endboss health.
 * Extends DrawableObject and holds image arrays for the corresponding status indicators.
 *
 * @class Statusbar
 * @extends DrawableObject
 *
 * @property {boolean} showEndbossStatusbar - Whether to display the endboss status bar.
 * @property {number} percentage - The characters health percentage (default 100).
 * @property {number} percentageCoins - The characters coin percentage (default 0).
 * @property {number} percentageBottles - The characters bottle percentage (default 0).
 * @property {number} percentageEndboss - The endboss health percentage (default 100).
 * @property {*} imgHealth - The image element for the characters health status bar.
 * @property {*} imgCoins - The image element for the characters coins status bar.
 * @property {*} imgBottles - The image element for the characters bottle status bar.
 * @property {*} imgEndboss - The image element for the endboss health status bar.
 * @property {string[]} Images_Health - Array of image paths for the characters health status bar.
 * @property {string[]} Images_Coins - Array of image paths for the characters coin status bar.
 * @property {string[]} Images_Bottles - Array of image paths for the characters bottle status bar.
 * @property {string[]} Images_Endboss - Array of image paths for the endboss health status bar.
 */
class Statusbar extends DrawableObject {
  showEndbossStatusbar = false;
  percentage = 100;
  percentageCoins = 0;
  percentageBottles = 0;
  percentageEndboss = 100;
  imgHealth;
  imgCoins;
  imgBottles;
  imgEndboss;

  Images_Health = [
    './assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png',
    './assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png',
    './assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png',
    './assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png',
    './assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png',
    './assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png',
  ];

  Images_Coins = [
    './assets/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png',
    './assets/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png',
    './assets/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png',
    './assets/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png',
    './assets/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png',
    './assets/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png',
  ];

  Images_Bottles = [
    './assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png',
    './assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png',
    './assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png',
    './assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png',
    './assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png',
    './assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png',
  ];

  Images_Endboss = [
    './assets/img/7_statusbars/2_statusbar_endboss/orange/orange0.png',
    './assets/img/7_statusbars/2_statusbar_endboss/orange/orange20.png',
    './assets/img/7_statusbars/2_statusbar_endboss/orange/orange40.png',
    './assets/img/7_statusbars/2_statusbar_endboss/orange/orange60.png',
    './assets/img/7_statusbars/2_statusbar_endboss/orange/orange80.png',
    './assets/img/7_statusbars/2_statusbar_endboss/orange/orange100.png',
  ];

  /**
   * Constructs a new Statusbar instance by loading images, initializing percentage values,
   * and setting the status bar's position and dimensions.
   * @constructor
   */
  constructor() {
    super();
    this.loadImages(this.Images_Coins);
    this.loadImages(this.Images_Health);
    this.loadImages(this.Images_Bottles);
    this.loadImages(this.Images_Endboss);
    this.setPercentage(100);
    this.setPercentageCoins(0);
    this.setPercentageBottles(0);
    this.setPercentageEndboss(100);
    this.x = 40;
    this.y = 0;
    this.width = 200;
    this.height = 60;
  }

  /**
   * Sets the characters health percentage and updates the health image accordingly.
   * @param {number} percentage - The new characters health percentage.
   */
  setPercentage(percentage) {
    this.percentage = percentage;
    let path = this.Images_Health[this.resolveImageIndex(percentage)];
    this.imgHealth = this.imageCache[path];
  }

  /**
   * Sets the characters coin percentage and updates the coin image accordingly.
   * @param {number} percentageCoins - The new characters coin percentage.
   */
  setPercentageCoins(percentageCoins) {
    this.percentageCoins = percentageCoins;
    let pathCoins = this.Images_Coins[this.resolveImageIndex(percentageCoins)];
    this.imgCoins = this.imageCache[pathCoins];
  }

  /**
   * Sets the characters bottle percentage and updates the bottle image accordingly.
   * @param {number} percentageBottles - The new characters bottle percentage.
   */
  setPercentageBottles(percentageBottles) {
    this.percentageBottles = percentageBottles;
    let pathBottles = this.Images_Bottles[this.resolveImageIndex(percentageBottles)];
    this.imgBottles = this.imageCache[pathBottles];
  }

  /**
   * Sets the endboss health percentage and updates the endboss image accordingly.
   * @param {number} percentageEndboss - The new endboss health percentage.
   */
  setPercentageEndboss(percentageEndboss) {
    this.percentageEndboss = percentageEndboss;
    let pathEndboss = this.Images_Endboss[this.resolveImageIndex(percentageEndboss)];
    this.imgEndboss = this.imageCache[pathEndboss];
  }

  /**
   * Resolves the image index based on a given percentage.
   * @param {number} percentage - The percentage value.
   * @returns {number} The corresponding image index.
   */
  resolveImageIndex(percentage) {
    if (percentage >= 100) {
      return 5;
    } else if (percentage >= 80) {
      return 4;
    } else if (percentage >= 60) {
      return 3;
    } else if (percentage >= 40) {
      return 2;
    } else if (percentage >= 20) {
      return 1;
    } else {
      return 0;
    }
  }

  /**
   * Draws the status bar images (characters health, characters coins, characters bottles, and optionally endboss health) onto the provided canvas context.
   * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
   */
  draw(ctx) {
    if (this.imgHealth) {
      ctx.drawImage(this.imgHealth, this.x, this.y, this.width, this.height);
    }
    if (this.imgCoins) {
      ctx.drawImage(this.imgCoins, this.x, this.y + 50, this.width, this.height);
    }
    if (this.imgBottles) {
      ctx.drawImage(this.imgBottles, this.x, this.y + 100, this.width, this.height);
    }
    if (this.showEndbossStatusbar && this.imgEndboss) {
      ctx.drawImage(this.imgEndboss, this.x + 370, this.y + 12, this.width + 100, this.height + 30);
    }
  }
}
