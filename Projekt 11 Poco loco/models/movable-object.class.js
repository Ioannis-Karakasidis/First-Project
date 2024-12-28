class MovableObject extends DrawableObject {
  speed = 0.15;
  otherDirection = false;
  speedY = 0;
  acceleration = 1;
  lasthit = 0;
  charactersarray = new Characterarrays();

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
    this.percentage;
    if (this.energy < 0) {
      this.energy = 0;
    } else {
      this.lasthit = new Date().getTime();
    }
    console.log(this.energy);
  }

  bosshit() {
    this.percentage -= 20;
    if (this.percentage < 0) {
      this.percentage = 0;
    } else {
      this.lasthit = new Date().getTime();
    }

    console.log(this.percentage);
  }

  isDead() {
    return this.energy == 0;
  }

  isDeadboss() {
    return this.percentage == 0;
  }

  animate() {
    setInterval(() => {
      this.moveLeft();
    }, 1000 / 75);
  }
}
