class Smallchicken extends MovableObject {
  height = 100;
  y = 350;
  offset = {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  };
  IMAGES_WALKING = [
    "img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_small/1_walk/3_w.png",
  ];
  DEAD_SMALLCHICKEN = ["img/3_enemies_chicken/chicken_small/2_dead/dead.png"];

  /**
   * Creates a new Smallchicken object.
   * @param {Object} world The world object that the chicken belongs to.
   */
  constructor(world) {
    super();
    this.world = world;
    this.x = 500 + Math.random() * 700 * 2;
    this.loadImage("img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.DEAD_SMALLCHICKEN);
    this.applyGravity();
    this.animatechickens();
    this.speed = 0.15 + Math.random() * 0.5;
  }

  /**
   * Starts the animations for the small chicken.
   * Includes walking animation and movement to the left.
   */
  animatechickens() {
    const walkinganimation = setInterval(() => {
      this.playAnimation(this.IMAGES_WALKING);
    }, 250);
    const moveleftanimation = setInterval(() => {
      this.moveLeft();
    }, 1000 / 60);
  }
}
