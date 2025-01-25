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

  /**
   * Initializes the chicken's properties, including position, image loading, gravity, and animation.
   * Randomizes the starting position and movement speed.
   */
  constructor() {
    super();
    this.loadImage("img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.DEAD_CHICKEN);
    this.applyGravity();
    this.startChickenWalkingAnimation();
    this.x = 700 + Math.random() * 700 * 2;
    this.speed = 0.15 + Math.random() * 0.5;
  }

  /**
   * Starts the chicken's walking animation and movement to the left.
   */
  startChickenWalkingAnimation() {
    this.playChickenWalkingAnimation();
    this.moveChickenLeft();
  }

  /**
   * Plays the walking animation of the chicken at a set interval.
   */
  playChickenWalkingAnimation() {
    setInterval(() => {
      this.playAnimation(this.IMAGES_WALKING);
    }, 250);
  }

  /**
   * Moves the chicken to the left at a constant speed.
   */
  moveChickenLeft() {
    setInterval(() => {
      this.moveLeft();
    }, 1000 / 60);
  }
}
