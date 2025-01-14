/**
 * Class representing a background object that extends the MovableObject class.
 * Used to create background elements with specific dimensions and positions.
 */
class BackgroundObject extends MovableObject {
  /**
   * The height of the background object.
   * @type {number}
   */
  height = 500;

  /**
   * The width of the background object.
   * @type {number}
   */
  width = 719;

  /**
   * Creates an instance of BackgroundObject.
   * @param {string} imagePath - The path to the image to be loaded.
   * @param {number} x - The x-coordinate position of the object.
   */
  constructor(imagePath, x) {
    super();
    this.loadImage(imagePath);
    this.x = x;
    this.y = 0;
  }
}
