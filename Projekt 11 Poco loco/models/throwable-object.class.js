class ThrowableObject extends MovableObject {
  bottles = [];

  /**
   * Creates a new ThrowableObject.
   * @param {number} x The initial x-coordinate position of the object.
   * @param {number} y The initial y-coordinate position of the object.
   */
  constructor(x, y) {
    super();
    this.loadImage("img/6_salsa_bottle/salsa_bottle.png"); 
    this.x = x;  
    this.y = y;  
    this.height = 100;  
    this.width = 110;  
    this.throw();  
  }

  remove(ctx) {
    ctx.clearRect(this.x, this.y, this.width, this.height);  // Clears the bottle from the canvas
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
