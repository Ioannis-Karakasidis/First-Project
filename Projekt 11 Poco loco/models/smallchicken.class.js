/**
 * Represents a small chicken enemy in the game that moves and can be killed.
 * Inherits from MovableObject, adding walking animation and movement.
 */
class Smallchicken extends MovableObject {
  /** @type {number} The height of the small chicken. */
  height = 100;

  /** @type {number} The initial vertical position of the small chicken. */
  y = 350;

  /** @type {Object} The offset used for collision detection. */
  offset = {
    top: 5,
    left: 5,
    right: 5,
    bottom: 5
  };

  /** @type {Array} The images used for the walking animation of the small chicken. */
  IMAGES_WALKING = [
    "img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_small/1_walk/3_w.png",
  ];

  /** @type {Array} The image used when the small chicken is dead. */
  DEAD_SMALLCHICKEN = ["img/3_enemies_chicken/chicken_small/2_dead/dead.png"];

  /**
   * Creates a new Smallchicken object.
   * @param {Object} world The world object that the chicken belongs to.
   */
  constructor(world) {
    super();
    this.world = world;
    this.x = 500 + Math.random() * 700;  
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
