class MovableObject extends DrawableObject {
  speed = 0.15;
  otherDirection = false;
  speedY = 0.5;
  acceleration = 1;
  lasthit = 0;
  charactersarray = new Characterarrays();
  deadchicken_audio = new Audio("audio/slap-hurt-pain-sound-effect-262618.mp3");

  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 40);
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
z
  isColliding(mo) {
    return (
      this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
      this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
      this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
      this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom
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
  }

  bosshit() {
    this.percentage -= 20;
    if (this.percentage < 0) {
      this.percentage = 0;
    } else {
      this.lasthit = new Date().getTime();
    }
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
