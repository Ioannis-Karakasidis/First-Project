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

  loadImage(path, x, y, width, height) {
    this.img = new Image();
    (this.img.src = path), x, y, width, height;
  }

  playAnimation(images) {
    let i = this.currentimage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentimage++;
  }

  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  setpercentage(percentage) {
    this.percentage = percentage;
    console.log(this.percentage);
    let path = this.IMAGES[this.resolveImageIndex()];
    console.log([this.resolveImageIndex()]);
    this.img = this.imageCache[path];
    console.log(this.img);
  }

  resolveImageIndex() {
    console.log(this.percentage);

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
