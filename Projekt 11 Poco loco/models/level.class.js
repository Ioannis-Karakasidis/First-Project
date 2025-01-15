/**
 * Represents a level in the game.
 * Contains the enemies, cloud, background objects, coins, and bottles present in the level.
 */
class level {
  /** @type {Array} List of enemies in the level. */
  enemies;

  /** @type {Array} List of clouds in the level. */
  Cloud;

  /** @type {Array} List of background objects in the level. */
  backgroundObjects;

  /** @type {Array} List of coins in the level. */
  coins;

  /** @type {number} The x-coordinate where the level ends. */
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
