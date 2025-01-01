class level {
  enemies;
  Cloud;
  backgroundObjects;
  coins;
  level_end_x = 2250;

  constructor(enemies, Cloud, backgroundObjects, coins, bottles) {
    this.enemies = enemies;
    this.Cloud = Cloud;
    this.backgroundObjects = backgroundObjects;
    this.coins = coins;
    this.bottles = bottles;
  }
}
