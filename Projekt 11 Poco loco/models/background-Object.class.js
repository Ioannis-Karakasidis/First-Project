class BackgroundObject extends MovableObject {
  height = 500;
  width = 719;

  constructor(imagePath, x) {
    super();
    this.loadImage(imagePath);
    this.x = x;
    this.y = 0;
  }
}
