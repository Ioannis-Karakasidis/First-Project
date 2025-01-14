class Coins extends DrawableObject {
  coinanimation = ["img/8_coin/coin_1.png", "img/8_coin/coin_2.png"];

  offset = {
    top: 30,
    left: 30,
    right: 30,
    bottom: 30
  }
  
  constructor() {
    super();
    this.loadImages(this.coinanimation);
    this.x = 500 + Math.random() * 700;
    this.y = 100 + Math.random() * 250;
    this.animate();
  }


  animate() {
    setInterval(() => {
      this.playAnimation(this.coinanimation);
    }, 400);
  }
}
