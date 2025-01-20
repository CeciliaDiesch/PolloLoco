class Level {
  enemies;
  clouds;
  background;
  level_end_x = 2500;

  constructor(enemies, clouds, background) {
    //hier wird enemies reingegeben und zu this.enemies, also die variable in zeile 2 bekommt diesen wert
    this.enemies = enemies;
    this.clouds = clouds;
    this.background = background;
  }
}
