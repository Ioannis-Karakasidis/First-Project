class MovableObject extends DrawableObject {
  speed = 0.15;
  otherDirection = false;
  speedY = 0;
  acceleration = 1;
  energy = 100;
  lasthit = 0;

  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 25);
  }

  death() {
    setInterval(() => {
      this.y -= this.speedY;
      this.speedY -= this.acceleration;
    }, 60);
  }

  isAboveGround() {
    if (this instanceof ThrowableObject) {
      return true;
    } else {
      return this.y < 170;
    }
  }

  moveLeft() {
    this.x -= this.speed;
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

  isHURT() {
    let timepassed = new Date().getTime() - this.lasthit;
    timepassed = timepassed / 1000;
    return timepassed < 1;
  }

  hit() {
    this.energy -= 20;
    if (this.energy < 0) {
      this.energy = 0;
    } else {
      this.lasthit = new Date().getTime();
    }
    console.log(this.energy);
  }

  isDead() {
    return this.energy == 0;
  }

  playAnimation(images) {
    let i = this.currentimage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentimage++;
  }
}
