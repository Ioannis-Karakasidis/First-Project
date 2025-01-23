class DrawableObject {
  img;
  imageCache = {};
  currentimage = 0;
  x = 120;
  y = 200;
  height = 150;
  width = 100;
  energy = 100;
  percentage = 100;

  /**
   * Loads an image and assigns it to the object's image property.
   * 
   * @param {string} path - The path to the image to load.
   * @param {number} [x] - Optional x-coordinate for the image position.
   * @param {number} [y] - Optional y-coordinate for the image position.
   * @param {number} [width] - Optional width for the image size.
   * @param {number} [height] - Optional height for the image size.
   */
  loadImage(path, x, y, width, height) {
    this.img = new Image();
    (this.img.src = path), x, y, width, height;
  }

  /**
   * Plays an animation by cycling through a list of image paths.
   * 
   * @param {string[]} images - An array of image paths to be used in the animation.
   */
  playAnimation(images) {
    let i = this.currentimage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentimage++;
  }

  /**
   * Draws the image on the canvas at the specified coordinates and size.
   * 
   * @param {CanvasRenderingContext2D} ctx - The canvas context on which to draw the image.
   */
  draw(ctx) {
    try {
      ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    } catch (error) {
    }
  }

  /**
   * Updates the object's percentage and changes the image based on the percentage.
   * 
   * @param {number} percentage - The new percentage value (0-100).
   */
  setpercentage(percentage) {
    this.percentage = percentage;
    let path = this.IMAGES[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }

  /**
   * Resolves the appropriate image index based on the current percentage.
   * 
   * @returns {number} The index of the image in the images array.
   */
  resolveImageIndex() {
    if (this.percentage === 100) {
      return 5;
    } else if (this.percentage === 80) {
      return 4;
    } else if (this.percentage === 60) {
      return 3;
    } else if (this.percentage === 40) {
      return 2;
    } else if (this.percentage === 20) {
      return 1;
    } else if (this.percentage === 0) {
      return 0;
    }
  }

  /**
   * Loads multiple images into the image cache.
   * 
   * @param {string[]} arr - An array of image paths to load.
   */
  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }

  /**
   * Draws the frame of the object for debugging purposes.
   * Only draws the frame for Character or Chicken objects.
   * 
   * @param {CanvasRenderingContext2D} ctx - The canvas context on which to draw the frame.
   */
  drawframe(ctx) {
    if (this instanceof Character || this instanceof Chicken) {
      ctx.beginPath();
      ctx.rect(this.x, this.y, this.width, this.height);
      ctx.stroke();
    }
  }
}
