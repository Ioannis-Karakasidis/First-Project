class Clouds extends MovableObject {
  y = 0;
  width = 550;
  height = 300;
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
