class World {

  /**
 * @property {Character} character - The character instance in the game.
 * @property {Endboss} enemyboss - The enemy boss instance in the game.
 * @property {ThrowableObject} bottle - The throwable object instance in the game.
 * @property {Level} level - The current level in the game.
 * @property {HTMLCanvasElement} canvas - The canvas element for the game.
 * @property {CanvasRenderingContext2D} ctx - The 2D rendering context for the canvas.
 * @property {World} world - The world instance.
 * @property {Keyboard} keyboard - The keyboard input handler.
 * @property {number} camera_x - The camera's x-coordinate.
 * @property {Statusbar} statusbar - The status bar instance.
 * @property {Coinsstatusbar} coinsstatusbar - The coins status bar instance.
 * @property {Bottlestatusbar} bottlestatusbar - The bottles status bar instance.
 * @property {Enemybosshealthbar} enemybosshealthbar - The enemy boss health bar instance.
 * @property {Array<ThrowableObject>} throwableobject - Array of throwable objects.
 * @property {Array<ThrowableObject>} bottles - Array of bottles.
 * @property {Array<number>} intervals - Array of interval IDs.
 * @property {HTMLImageElement} overlayImage - The overlay image.
 * @property {string} rotatephoto - The path to the rotate photo image.
 * @property {Coinsstatusbar} coins - The coins status bar instance.
 * @property {boolean} isEndbossHit - Flag indicating if the end boss is hit.
 * @property {boolean} isEndbosshit - Flag indicating if the end boss is hit.
 * @property {number} bottles - Number of bottles.
 */

  character = new Character();
  enemyboss = new Endboss();
  bottle = new ThrowableObject();
  level = level1;
  canvas;
  ctx;
  world;
  keyboard;
  camera_x = 0;
  statusbar = new Statusbar();
  coinsstatusbar = new Coinsstatusbar();
  bottlestatusbar = new Bottlestatusbar();
  enemybosshealthbar = new Enemybosshealthbar();
  throwableobject = [];
  bottles = [];
  intervals = [];
  overlayImage = null;
  rotatephoto = "img/rotate.png";
  coins = new Coinsstatusbar();
  isEndbossHit = false;
  isEndbosshit = false;
  bottles = 0;

  /**
   * The background audio instance.
   * @type {HTMLAudioElement}
   */
  background_audio = new Audio(
    "audio/sonido-ambiente-desierto-ambience-sound-desert-217122.mp3"
  );

  /**
   * Creates an instance of World.
   *
   * @constructor
   * @param {HTMLCanvasElement} canvas - The canvas element.
   * @param {Keyboard} keyboard - The keyboard input handler.
   */
  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.background_audio.play();
    this.drawgame();
    this.setWorld();
    this.run();
  }

  /**
   * Sets the world instance for the character.
   */
  setWorld() {
    this.character.world = this;
  }

  /**
   * Runs the game loop.
   */
  run() {
    setInterval(() => {
      this.checkCollisions();
      this.checkthrowobjects();
    }, 200);
  }

  /**
   * Checks if the player is throwing objects.
   */
  checkthrowobjects() {
    if (this.keyboard.D) {
      this.throwSalsaBottle();
    }
  }

  /**
   * Throws a salsa bottle.
   */
  throwSalsaBottle() {
    if (this.bottles === 0) {
      return;
    } else {
      let bottle = new ThrowableObject(
        this.character.x + 40,
        this.character.y + 40
      );
      this.throwableobject.push(bottle);
      this.bottles--;
      this.bottlestatusbar.setpercentage(
        this.bottlestatusbar.percentage - 20
      );
    }
  }

  /**
   * Handles coin collisions.
   */
  coinscollision() {
    this.level.coins = this.level.coins.filter((coin) => {
      if (this.character.isColliding(coin)) {
        this.coinsstatusbar.setpercentage(this.coinsstatusbar.percentage + 20);
        return false;
      }
      return true;
    });
  }

  /**
   * Handles bottle collisions.
   */
  bottlescollision() {
    this.level.bottles = this.level.bottles.filter((bottle) => {
      if (this.character.isColliding(bottle)) {
        this.bottles++;
        this.bottlestatusbar.setpercentage(
          this.bottlestatusbar.percentage + 20
        );
        return false;
      }
      return true;
    });
  }

  /**
   * Checks for collisions in the game.
   */
  checkCollisions() {
    this.coinscollision();
    this.charactercollision();
    this.bottlescollision();

    this.level.enemies.forEach((enemy) => {
      this.throwbottles(enemy);
    });
  }

  /**
   * Handles enemy death.
   *
   * @param {Enemy} enemy - The enemy instance.
   */
  enemydead(enemy) {
    this.isEndbosshit = true;
    enemy.death();
    this.enemykill(enemy);
    setTimeout(() => {
      this.isEndbosshit = false;
    }, 500);
  }

  /**
   * Handles character collisions.
   */
  charactercollision() {
    this.level.enemies.forEach((enemy) => {
      if (this.character.isColliding(enemy)) {
        if (world.character.isAboveGround() && !this.isEndbosshit) {
          this.enemydead(enemy);
        } else if (!world.character.isAboveGround() && !this.isEndbosshit) {
          this.characterattacked();
        }
      } else {
        this.throwbottles(enemy);
      }
    });
  }

  /**
   * Handles character being attacked.
   */
  characterattacked() {
    this.isEndbosshit = true;
    world.character.hit();
    this.statusbar.setpercentage(world.character.energy);
    setTimeout(() => {
      this.isEndbosshit = false;
    }, 100);
  }

  /**
   * Handles enemy kill.
   *
   * @param {Enemy} enemy - The enemy instance.
   */
  enemykill(enemy) {
    if (enemy.constructor.name === "Chicken") {
      setInterval(() => {
        enemy.playAnimation(enemy.DEAD_CHICKEN);
      }, 1000 / 75);
      enemy.hit();
      enemy.death();
      enemy.deadchicken_audio.play();
    } else if (enemy.constructor.name === "Smallchicken") {
      setInterval(() => {
        enemy.playAnimation(enemy.DEAD_SMALLCHICKEN);
      }, 1000 / 75);
      enemy.deadchicken_audio.play();
      enemy.death();
    } else {
      this.character.hit();
      this.statusbar.setpercentage(this.character.energy);
    }
  }

  /**
   * Handles throwing bottles at enemies.
   *
   * @param {Enemy} enemy - The enemy instance.
   */
  throwbottles(enemy) {
    this.throwableobject.forEach((bottle) => {
      if (enemy.iscolliding(bottle)) {
        this.enemiescollision(enemy);
      }
    });
  }

  /**
   * Handles collisions with enemies.
   *
   * @param {Enemy} enemy - The enemy instance.
   */
  enemiescollision(enemy) {
    if (enemy.constructor.name === "Chicken") {
      setInterval(() => {
        enemy.playAnimation(enemy.DEAD_CHICKEN);
      }, 1000 / 75);
      enemy.death();
    } else if (enemy.constructor.name === "Smallchicken") {
      setInterval(() => {
        enemy.playAnimation(enemy.DEAD_SMALLCHICKEN);
      }, 1000 / 75);
      enemy.death();
    } else if (enemy.constructor.name === "Endboss") {
      this.enemybosscollision(enemy);
    }
  }

  /**
   * Handles the death of the boss.
   *
   * @param {Enemy} enemy - The enemy instance.
   */
  deadboss(enemy) {
    setInterval(() => {
      enemy.playAnimation(enemy.IMAGES_DEAD);
    }, 200);
    setTimeout(() => {
      enemy.death();
      this.isEndbossHit = false;
    }, 10);
  }

  /**
   * Handles collisions with the boss.
   *
   * @param {Enemy} enemy - The enemy instance.
   */
  enemybosscollision(enemy) {
    if (!this.isEndbossHit) {
      this.isEndbossHit = true;
      enemy.hit();
      world.enemybosshealthbar.setpercentage(enemy.energy);
      if (world.enemybosshealthbar.percentage === 0) {
        this.deadboss(enemy);
      } else {
        this.bossattack(enemy);
      }
    }
  }

  /**
   * Handles the boss attack.
   *
   * @param {Enemy} enemy - The enemy instance.
   */
  bossattack(enemy) {
    enemy.stopGames();
    setInterval(() => {
      enemy.moveLeft();
    }, 1000 / 180);
    setInterval(() => {
      enemy.playAnimation(enemy.IMAGES_ATTACK);
    }, 150);
    setTimeout(() => {
      this.isEndbossHit = false;
    }, 1000);
  }

  /**
   * Clears the canvas.
   */
  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  /**
   * Sets the world instance for the character and enemies.
   *
   * @returns {void}
   */
  setWorld() {
    this.character.world = this;
    this.level.enemies.forEach((enemy) => {
      enemy.world = this;
    });
  }

  /**
   * Draws the game.
   */
  draw() {
    if (this.showIntro) {
      this.drawIntro(this.introImage);
    } else {
      this.drawgame();
    }
  }

  /**
   * Draws the game elements.
   */
  drawgame() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.camera_x, 0);
    if (this.level.backgroundObjects) {
      this.addObjectsToMap(this.level.backgroundObjects);
    }
    this.ctx.translate(-this.camera_x, 0);
    this.beforecamera();
    this.ctx.translate(this.camera_x, 0);
    this.aftercamera();
    this.ctx.translate(-this.camera_x, 0);
    let self = this;
    this.animationFrameId = requestAnimationFrame(function () {
      self.draw();
    });
  }

  /**
   * Draws elements before the camera.
   */
  beforecamera() {
    this.addToMap(this.statusbar);
    this.addToMap(this.coinsstatusbar);
    this.addToMap(this.bottlestatusbar);
    this.addToMap(this.enemybosshealthbar);
  }

  /**
   * Draws elements after the camera.
   */
  aftercamera() {
    this.addToMap(this.character);
    this.addObjectsToMap(this.level.coins);
    this.addObjectsToMap(this.level.bottles);
    this.addObjectsToMap(this.level.Cloud);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.throwableobject);
  }

  /**
   * Adds an object to the map.
   *
   * @param {MovableObject} mo - The movable object.
   */
  addToMap(mo) {
    if (mo.otherDirection) {
      this.flipImage(mo);
    }
    mo.draw(this.ctx);
    if (mo.otherDirection) {
      this.flipImageBack(mo);
    }
  }

  /**
   * Adds multiple objects to the map.
   *
   * @param {Array<MovableObject>} objects - The array of movable objects.
   */
  addObjectsToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  }

  /**
   * Flips an image horizontally.
   *
   * @param {MovableObject} mo - The movable object.
   */
  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }

  /**
   * Flips an image back to its original orientation.
   *
   * @param {MovableObject} mo - The movable object.
   */
  flipImageBack(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }

  /**
   * Clears all intervals.
   */
  clearAllIntervals() {
    for (let i = 1; i < 9999; i++) {
      window.clearInterval(i);
    }
  }
}