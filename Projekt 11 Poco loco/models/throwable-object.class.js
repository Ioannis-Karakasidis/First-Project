class ThrowableObject extends MovableObject {
  bottles = [];
  bottlerotation = [
    'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
    'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
    'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
    'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
  ]

  bottlesplash = [
    'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
    'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
    'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
    'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
    'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
    'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',
  ]

  /**
   * Creates a new ThrowableObject.
   * @param {number} x The initial x-coordinate position of the object.
   * @param {number} y The initial y-coordinate position of the object.
   */
  constructor(x, y) {
    super();
    this.loadImages(this.bottlerotation)
    this.loadImages(this.bottlesplash)
    this.x = x;
    this.y = y;
    this.height = 100;
    this.width = 110;
    this.throw();
    this.animate()

  }

  remove(ctx) {
    ctx.clearRect(this.x, this.y, this.width, this.height);  // Clears the bottle from the canvas
  }

  animate() {
    setInterval(() => {
      this.playAnimation(this.bottlerotation)
    }, 200);
  }

  /**
   * Makes the object move forward and apply gravity to simulate throwing.
   */
  throw() {
    this.speedY = 5;
    this.applyGravity();
    setInterval(() => {
      this.x += 5;
    }, 10);
  }
}
