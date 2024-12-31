class Smallchicken extends MovableObject {
  height = 100;
  y = 350;

  IMAGES_WALKING = [
    "img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_small/1_walk/3_w.png",
  ];
  DEAD_SMALLCHICKEN = ["img/3_enemies_chicken/chicken_small/2_dead/dead.png"];

  constructor(world) {
    super();
    this.world = world;
    this.x = 500 + Math.random() * 700;
    this.loadImage("img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.DEAD_SMALLCHICKEN);
    this.applyGravity();
    this.animatechickens();
    this.x = 500 + Math.random() * 700;
    this.speed = 0.15 + Math.random() * 0.5;
  }

  animatechickens() {
    const walkinganimation = setInterval(() => {
      this.playAnimation(this.IMAGES_WALKING);
    }, 250);
    const moveleftanimation = setInterval(() => {
      this.moveLeft();
    }, 1000 / 60);
  }
}
