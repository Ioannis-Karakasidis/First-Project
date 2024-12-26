class DrawableObject {
  img;
  imageCache = {};
  currentimage = 0;
  x = 120;
  y = 200;
  height = 150;
  width = 100;

  loadImage(path, x, y) {
    this.img = new Image();
    (this.img.src = path), x, y;
  }

  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }

  drawframe(ctx) {
    if (this instanceof Character || this instanceof Chicken) {
      ctx.beginPath();
      ctx.rect(this.x, this.y, this.width, this.height);
      ctx.stroke();
    }
  }
}
