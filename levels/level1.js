let level1;

/**
 * Initializes level1 by creating a new Level instance with arrays of Chickens, Clouds, Background layers, Bottles, and Coins.
 */
function initLevel1() {
  level1 = new Level(
    [new ChickenSmall(), new ChickenSmall(), new ChickenSmall(), new ChickenSmall(), new Chicken(), new Chicken(), new Chicken(), new Chicken()],
    [new Clouds(), new Clouds(), new Clouds()],
    [
      new Background1('./assets/img/5_background/layers/air.png', -719, 0, 1),
      new Background1('./assets/img/5_background/layers/3_third_layer/2.png', -719, 0, 0.75),
      new Background1('./assets/img/5_background/layers/2_second_layer/2.png', -719, 0, 0.5),
      new Background1('./assets/img/5_background/layers/1_first_layer/2.png', -719, 0, 0),
      new Background1('./assets/img/5_background/layers/air.png', 0, 0, 1),
      new Background1('./assets/img/5_background/layers/3_third_layer/1.png', 0, 0, 0.75),
      new Background1('./assets/img/5_background/layers/2_second_layer/1.png', 0, 0, 0.5),
      new Background1('./assets/img/5_background/layers/1_first_layer/1.png', 0, 0, 0),
      new Background1('./assets/img/5_background/layers/air.png', 719, 0, 1),
      new Background1('./assets/img/5_background/layers/3_third_layer/2.png', 719, 0, 0.75),
      new Background1('./assets/img/5_background/layers/2_second_layer/2.png', 719, 0, 0.5),
      new Background1('./assets/img/5_background/layers/1_first_layer/2.png', 719, 0, 0),
      new Background1('./assets/img/5_background/layers/air.png', 719 * 2, 0, 1),
      new Background1('./assets/img/5_background/layers/3_third_layer/1.png', 719 * 2, 0, 0.75),
      new Background1('./assets/img/5_background/layers/2_second_layer/1.png', 719 * 2, 0, 0.5),
      new Background1('./assets/img/5_background/layers/1_first_layer/1.png', 719 * 2, 0, 0),
      new Background1('./assets/img/5_background/layers/air.png', 719 * 3, 0, 1),
      new Background1('./assets/img/5_background/layers/3_third_layer/2.png', 719 * 3, 0, 0.75),
      new Background1('./assets/img/5_background/layers/2_second_layer/2.png', 719 * 3, 0, 0.5),
      new Background1('./assets/img/5_background/layers/1_first_layer/2.png', 719 * 3, 0, 0),
    ],
    [new Bottle(), new Bottle(), new Bottle(), new Bottle(), new Bottle()],
    [new Coins(), new Coins(), new Coins(), new Coins(), new Coins(), new Coins(), new Coins()]
  );
}
