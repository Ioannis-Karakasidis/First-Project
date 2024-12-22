class BackgroundObject extends MovableObject {
  x = 0;
  y = 0;
  height = 500;
  width = 720;
  constructor(Imagepath) {
    super();
    this.loadImage(Imagepath);
  }
}
