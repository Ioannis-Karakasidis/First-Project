/**
 * Class representing a bottle that extends the DrawableObject class.
 * Handles bottle animations and positioning.
 */
class Bottle extends DrawableObject {
  /**
   * Array of image paths for the bottle animation.
   * @type {string[]}
   */
  bottleanimation = [
    "img/6_salsa_bottle/1_salsa_bottle_on_ground.png",
    "img/6_salsa_bottle/2_salsa_bottle_on_ground.png",
  ];

  /**
   * Offset values for the bottle object.
   * @type {{ top: number, left: number, right: number, bottom: number }}
   */
  offset = {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  };

  /**
   * Creates an instance of Bottle.
   * Initializes the bottle animation, randomizes the x-coordinate,
   * and sets a fixed y-coordinate. Starts an interval for playing the animation.
   */
  constructor() {
    super();
    this.loadImages(this.bottleanimation);
    this.x = 500 + Math.random() * 700; // Random x position between 500 and 1200.
    this.y = 300; // Fixed y position.

    setInterval(() => {
      this.playAnimation(this.bottleanimation);
    }, 400); // Plays animation every 400ms.
  }
}
