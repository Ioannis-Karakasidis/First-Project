class Chicken extends MovableObject {
  height = 100;
  y = 350;

  IMAGES_WALKING = [
    "img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ];

  DEAD_CHICKEN = ["img/3_enemies_chicken/chicken_normal/2_dead/dead.png"];

  offset = {
    top: 5,
    left: 5,
    right: 5,
    bottom: 5
  }
  constructor() {
    super();
    this.x = 500 + Math.random() * 700 * 3;
    this.loadImage("img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.DEAD_CHICKEN);
    this.applyGravity();
    this.animatechickens();
    this.x = 700 + Math.random() * 700;
    this.speed = 0.15 + Math.random() * 0.5;
  }

  animatechickens() {
    this.walkinganimation();
    this.moveleft();
  }
  walkinganimation() {
    setInterval(() => {
      this.playAnimation(this.IMAGES_WALKING);
    }, 250);
  }

  moveleft() {
    setInterval(() => {
      this.moveLeft();
    }, 1000 / 60);
  }
}
