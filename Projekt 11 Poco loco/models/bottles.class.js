class Bottle extends DrawableObject {
  bottleanimation = [
    "img/6_salsa_bottle/1_salsa_bottle_on_ground.png",
    "img/6_salsa_bottle/2_salsa_bottle_on_ground.png",
  ];

  offset = {
    top: 120,
    left: 30,
    right: 40,
    bottom: 30
  }
  constructor() {
    super();
    this.loadImages(this.bottleanimation);
    this.x = 500 + Math.random() * 700;
    this.y = 300;

    setInterval(() => {
      this.playAnimation(this.bottleanimation);
    }, 400);
  }
}
