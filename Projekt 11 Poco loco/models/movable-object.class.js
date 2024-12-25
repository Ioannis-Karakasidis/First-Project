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
  speedY = 0;
  acceleration = 1;
  energy = 100;
  loadImage(path, x, y) {
    this.img = new Image();
    (this.img.src = path), x, y;
  }

  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 60);
  }

  death() {
    setInterval(() => {
      this.y -= this.speedY;
      this.speedY -= this.acceleration;
    }, 60);
  }

  isAboveGround() {
    return this.y < 170;
  }

  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }

  moveLeft() {
    this.x -= this.speed;
  }

  movableObjectborders() {
    this.ctx.beginPath();
    this.ctx.rect(mo.x, mo.y, mo.width, mo.height);
    this.ctx.stroke();
  }

  moveRight() {
    this.x += this.speed;
  }

  jump() {
    this.speedY = 20;
  }

  isColliding(mo) {
    return (
      this.x + this.width > mo.x &&
      this.y + this.height > mo.y &&
      this.x < mo.x &&
      this.y < mo.y + mo.height
    );
  }

  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  drawframe(ctx) {
    if (this instanceof Character || this instanceof Chicken) {
      ctx.beginPath();
      ctx.rect(this.x, this.y, this.width, this.height);
      ctx.stroke();
    }
  }

  hit() {
    this.energy -= 5;
    if (this.energy < 0) {
      this.energy = 0;
    }
    console.log(this.energy);
  }

  isDead() {
    return this.energy == 0;
  }

  playAnimation(images) {
    let i = this.currentimage % this.IMAGES_WALKING.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentimage++;
  }
}
