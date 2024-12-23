class MovableObject {
  x = 120;
  y = 200;
  img;
  height = 150;
  width = 100;
  imageCache = {};
  currentimage = 0;
  speed = 0.15;
  otherDirection = false;

  loadImage(path, x, y) {
    this.img = new Image();
    (this.img.src = path), x, y;
  }

  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }

  moveLeft() {
    setInterval(() => {
      this.x -= this.speed;
      if (this.x <= -200) {
        this.x = 500 + Math.random() * 700;
      }
    }, 1000 / 75);
  }

  moveRight() {
    setInterval(() => {
      this.x -= this.speed;
    }, 1000 / 75);
  }

  playAnimation(images) {
    let i = this.currentimage % this.IMAGES_WALKING.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentimage++;
  }
}
