class Level {
  enemies;
  clouds;
  background;
  bottle;
  coins;
  level_end_x = 2250;

  constructor(enemies, clouds, background, bottle, coins) {
    //hier wird enemies reingegeben und zu this.enemies, also die variable in zeile 2 bekommt diesen wert
    this.enemies = enemies;
    this.clouds = clouds;
    this.background = background;
    this.bottle = bottle;
    this.coins = coins;
  }
}
