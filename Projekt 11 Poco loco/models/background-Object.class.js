class BackgroundObject extends MovableObject {
  height = 500;
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
