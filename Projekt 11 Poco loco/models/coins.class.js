class Coins extends DrawableObject {
  coinanimation = ["img/8_coin/coin_1.png", "img/8_coin/coin_2.png"];
  constructor() {
    super();
    this.loadImages(this.coinanimation);
    this.x = 500 + Math.random() * 700;
    this.y = 250 + Math.random() * 100;
    this.animate();
  }
  animate() {
    setInterval(() => {
      this.playAnimation(this.coinanimation);
    }, 400);
  }
}
