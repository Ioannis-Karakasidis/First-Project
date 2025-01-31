class Coins extends DrawableObject {
  coinanimation = [
    'img/8_coin/coin_1.png',
    'img/8_coin/coin_2.png',
  ];
  offset = {
    top: 30,
    left: 30,
    right: 30,
    bottom: 30
  }

  /**
   * Initializes the coin's position, image loading, and animation.
   * The coin is randomly placed within the level.
   */
  constructor() {
    super();
    this.loadImages(this.coinanimation);
    this.x = 500 + Math.random() * 700;
    this.y = 100 + Math.random() * 250;
    this.animateCoin();
  }

  /**
   * Starts the coin's animation, alternating between coin images at a set interval.
   */
  animateCoin() {
      this.playAnimation(this.coinanimation);
  }
}
