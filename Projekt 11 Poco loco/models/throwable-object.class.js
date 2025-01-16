/**
 * Represents a throwable object, such as a bottle.
 * Inherits from MovableObject, allowing for movement and gravity application.
 */
class ThrowableObject extends MovableObject {
  /** @type {Array} An array that holds the bottles thrown in the game. */
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
    this.width = 50;  
    this.throw();  
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
