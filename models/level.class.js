/**
 * Represents a game level containing various game objects.
 *
 * @class Level
 * @property {Enemy[]} enemies - Array of enemy objects in the level.
 * @property {Clouds[]} clouds - Array of cloud objects in the level.
 * @property {Background1[]} background - Array of background layer objects.
 * @property {Bottle[]} bottle - Array of bottle objects available in the level.
 * @property {Coins[]} coins - Array of coin objects in the level.
 * @property {number} level_end_x - The x-coordinate marking the end of the level (default: 2250).
 */
class Level {
  enemies;
  clouds;
  background;
  bottle;
  coins;
  level_end_x = 2250;

  constructor(enemies, clouds, background, bottle, coins) {
    this.enemies = enemies;
    this.clouds = clouds;
    this.background = background;
    this.bottle = bottle;
    this.coins = coins;
  }
}
