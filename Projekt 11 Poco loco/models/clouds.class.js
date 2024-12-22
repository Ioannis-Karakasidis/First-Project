class Clouds extends MovableObject {
  y = 50;
  width = 550;
  height = 350;

  constructor(Imagepath) {
    super();
    this.loadImage(Imagepath);
    this.x = 0 + Math.random() * 500;
    this.animate();
  }

  animate() {
    setInterval(() => {
      this.x -= 0.15;
    }, 1000 / 60);
  }
}
