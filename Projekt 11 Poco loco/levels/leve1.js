let level1;

/**
 * Initializes the first level of the game by creating a new instance of the level.
 * It sets up the level with enemies, background objects, coins, and bottles.
 * 
 * @function
 * @name initleve1
 * @returns {void}
 */

function initleve1() {
  level1 = new level(
    [
      new Smallchicken(),
      new Chicken(),
      new Chicken(),
      new Chicken(),
      new Chicken(),
      new Chicken(),
      new Endboss(),
    ],
    [
      new Clouds("img/5_background/layers/4_clouds/2.png"),
      new Clouds("img/5_background/layers/4_clouds/1.png"),
    ],
    [
      new BackgroundObject("img/5_background/layers/air.png", -718),
      new BackgroundObject("img/5_background/layers/3_third_layer/2.png", -718),
      new BackgroundObject("img/5_background/layers/2_second_layer/2.png", -718),
      new BackgroundObject("img/5_background/layers/1_first_layer/2.png", -718),

      new BackgroundObject("img/5_background/layers/air.png", 0),
      new BackgroundObject("img/5_background/layers/3_third_layer/1.png", 0),
      new BackgroundObject("img/5_background/layers/2_second_layer/1.png", 0),
      new BackgroundObject("img/5_background/layers/1_first_layer/1.png", 0),

      new BackgroundObject("img/5_background/layers/air.png", 718),
      new BackgroundObject("img/5_background/layers/3_third_layer/2.png", 718),
      new BackgroundObject("img/5_background/layers/2_second_layer/2.png", 718),
      new BackgroundObject("img/5_background/layers/1_first_layer/2.png", 718),

      new BackgroundObject("img/5_background/layers/air.png", 718 * 2),
      new BackgroundObject("img/5_background/layers/3_third_layer/1.png", 718 * 2),
      new BackgroundObject("img/5_background/layers/2_second_layer/1.png", 718 * 2),
      new BackgroundObject("img/5_background/layers/1_first_layer/1.png", 718 * 2),

      new BackgroundObject("img/5_background/layers/air.png", 718 * 3),
      new BackgroundObject("img/5_background/layers/3_third_layer/2.png", 718 * 3),
      new BackgroundObject("img/5_background/layers/2_second_layer/2.png", 718 * 3),
      new BackgroundObject("img/5_background/layers/1_first_layer/2.png", 718 * 3),
    ],
    [
      new Coins(),
      new Coins(),
      new Coins(),
      new Coins(),
      new Coins(),
    ],
    [
      new Bottle(),
      new Bottle(),
      new Bottle(),
      new Bottle(),
      new Bottle(),
    ]
  );
}
