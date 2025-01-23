class level {
  enemies;
  Cloud;
  backgroundObjects;
  coins;
  level_end_x = 2250;

  /** 
   * Creates a new level with the specified enemies, cloud, background objects, coins, and bottles.
   * 
   * @param {Array} enemies - The enemies present in the level.
   * @param {Array} Cloud - The clouds present in the level.
   * @param {Array} backgroundObjects - The background objects in the level.
   * @param {Array} coins - The coins scattered across the level.
   * @param {Array} bottles - The bottles in the level.
   */
  constructor(enemies, Cloud, backgroundObjects, coins, bottles) {
    this.enemies = enemies;
    this.Cloud = Cloud;
    this.backgroundObjects = backgroundObjects;
    this.coins = coins;
    this.bottles = bottles;
  }
}
