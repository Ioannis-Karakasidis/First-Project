/**
 * Class representing a cloud object that extends the MovableObject class.
 * Handles cloud movement and animation.
 */
class Clouds extends MovableObject {
  /**
   * The y-coordinate position of the cloud.
   * @type {number}
   */
  y = 0;

  /**
   * The width of the cloud.
   * @type {number}
   */
  width = 550;

  /**
   * The height of the cloud.
   * @type {number}
   */
  height = 300;

  /**
   * The speed at which the cloud moves.
   * @type {number}
   */
  speed = 0.35;

  /**
   * Creates an instance of Clouds.
   * Initializes the cloud's position and loads the image.
   * Starts the cloud animation by calling `animate()`.
   * 
   * @param {string} Imagepath - The path to the cloud image.
   */
  constructor(Imagepath) {
    super();
    this.x = 300 + Math.random() * 700 * 3;
    this.loadImage(Imagepath);
    this.x = 500 + Math.random() * 700;
    this.animate();
  }
}
