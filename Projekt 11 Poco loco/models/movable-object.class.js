
class MovableObject extends DrawableObject {
  speed = 0.15;
  otherDirection = false;
  speedY = 0.5;
  acceleration = 1;
  lasthit = 0;
  charactersarray = new Characterarrays();
  deadchicken_audio = new Audio("audio/slap-hurt-pain-sound-effect-262618.mp3");

  /**
   * Applies gravity to the object, causing it to move downward unless it is above the ground.
   * Gravity is applied at regular intervals.
   */
  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 40);
  }

  /**
   * Causes the object to fall and decrease its vertical speed, simulating death.
   * This is applied at regular intervals.
   */
  death() {
    setInterval(() => {
      this.y -= this.speedY;
      this.speedY -= this.acceleration;
    }, 0);
  }

  /**
   * Checks if the object is above the ground.
   * @returns {boolean} Returns true if the object is above the ground, false otherwise.
   */
  isAboveGround() {
    if (this instanceof ThrowableObject) {
      return true;
    } else {
      return this.y < 170;
    }
  }

  /**
   * Moves the object left by its horizontal speed.
   */
  moveLeft() {
    this.x -= this.speed;
  }

  /**
   * Moves the object right by its horizontal speed.
   */
  moveRight() {
    this.x += this.speed;
  }

  /**
   * Makes the object jump by setting its vertical speed.
   */
  jump() {
    this.speedY = 20;
  }

  /**
   * Checks if the current object is colliding with another object.
   * @param {MovableObject} mo The other movable object to check collision with.
   * @returns {boolean} Returns true if the objects are colliding, false otherwise.
   */
  iscolliding(mo) {
    return this.x + this.width > mo.x &&
      this.y + this.height > mo.y &&
      this.x < mo.x &&
      this.y < mo.y + mo.height;
  }

  /**
   * Checks if the current object is colliding with another object, taking offsets into account.
   * @param {MovableObject} mo The other movable object to check collision with.
   * @returns {boolean} Returns true if the objects are colliding, false otherwise.
   */
  isColliding(mo) {
    if (!this.offset || !mo.offset) {
      console.error('Offset is undefined:', this.offset, mo.offset);
      return false;
    }
    return (
      this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
      this.y + this.height - this.offset.bottom > mo.y - 10 + mo.offset.top &&
      this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
      this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom
    );
  }

  /**
   * Determines if the object has been recently hurt.
   * @returns {boolean} Returns true if the object was hurt recently (within 1 second), false otherwise.
   */
  isHURT() {
    let timepassed = new Date().getTime() - this.lasthit;
    timepassed = timepassed / 1000;
    return timepassed < 1;
  }

  /**
   * Reduces the object's energy when it is hit.
   * If the energy drops below 0, it is set to 0.
   */
  hit() {
    this.energy -= 20;
    this.percentage;
    if (this.energy < 0) {
      this.energy = 0;
    } else {
      this.lasthit = new Date().getTime();
    }
  }

  /**
   * Reduces the object's health (percentage) when hit by a boss.
   * If the health drops below 0, it is set to 0.
   */
  bosshit() {
    this.percentage -= 20;
    if (this.percentage < 0) {
      this.percentage = 0;
    } else {
      this.lasthit = new Date().getTime();
    }
  }

  /**
   * Determines if the object is dead based on its energy.
   * @returns {boolean} Returns true if the object is dead (energy == 0), false otherwise.
   */
  isDead() {
    return this.energy == 0;
  }

  /**
   * Determines if the boss object is dead based on its health percentage.
   * @returns {boolean} Returns true if the boss is dead (percentage == 0), false otherwise.
   */
  isDeadboss() {
    return this.percentage == 0;
  }

  /**
   * Animates the object by moving it left at a set interval.
   */
  animate() {
    setInterval(() => {
      this.moveLeft();
    }, 1000 / 75);
  }
}
