class Clouds extends MovableObject {
  y = 0;
  width = 550;
  height = 300;
  speed = 0.35;

  constructor(Imagepath) {
    super();
    this.x = 500 + Math.random() * 700;
    this.loadImage(Imagepath);
    this.x = 500 + Math.random() * 700;
    this.animate();
  }
}
