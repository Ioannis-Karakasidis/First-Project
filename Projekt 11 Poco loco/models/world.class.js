class World extends Wordpart2 {
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
    super();
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
    if (this.bottles.length === 0) {
      return;
    } else {
      let bottle = new ThrowableObject(
        this.character.x + 40,
        this.character.y + 40
      );
      this.throwableobject.push(bottle);
      this.bottles.splice(0, 1);
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

      if (this.character.iscolliding(bottle)) {

        this.bottles.push(bottle);
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
    if (this.character.isAboveGround()) {
      this.enemykill(enemy);
      return;
    } else {
      this.characterattacked();
      return;
    }
  }


  /**
   * Handles character collisions.
   */
  charactercollision() {
    this.level.enemies.forEach((enemy) => {
      if (this.character.iscolliding(enemy)) {
        this.enemydead(enemy)
      }
      this.throwbottles(enemy);

    });
  }

  /**
   * Handles character being attacked.
   */
  characterattacked() {
    world.character.hit();
    this.statusbar.setpercentage(world.character.energy);
  }

  /**
   * Handles enemy kill.
   *
   * @param {Enemy} enemy - The enemy instance.
   */
  enemykill(enemy) {
    if (enemy.constructor.name === "Chicken") {
      this.chickenkill(enemy)
    } else if (enemy.constructor.name === "Smallchicken") {
      this.smallchickenkill(enemy)
    } else {
      this.character.hit();
      this.statusbar.setpercentage(this.character.energy);
    }
  }

  /**
 * Handles the death of a small chicken.
 *
 * @param {Enemy} enemy - The enemy instance.
 */
  smallchickenkill(enemy) {
    setInterval(() => {
      enemy.playAnimation(enemy.DEAD_SMALLCHICKEN);
    }, 1000 / 75);
    enemy.deadchicken_audio.play();
    enemy.death();
  }

  /**
   * Handles the death of a chicken.
   *
   * @param {Enemy} enemy - The enemy instance.
   */
  chickenkill(enemy) {
    setInterval(() => {
      enemy.playAnimation(enemy.DEAD_CHICKEN);
    }, 1000 / 75);
    enemy.hit();
    enemy.death();
    enemy.deadchicken_audio.play();
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
   *abe
   * @param {Enemy} enemy - The enemy instance.
   */
  enemiescollision(enemy) {
    if (enemy.constructor.name === "Chicken") {
      this.chickencollision(enemy)
    } else if (enemy.constructor.name === "Smallchicken") {
      this.smallchickencollision(enemy)
    } else if (enemy.constructor.name === "Endboss") {
      this.endbosscollision()
    }
  }

  /**
 * Handles the collision between a chicken and throwable objects.
 *
 * @param {object} enemy - The enemy instance representing a chicken.
 */
  chickencollision(enemy) {
    setInterval(() => {
      enemy.playAnimation(enemy.DEAD_CHICKEN);
    }, 1000 / 75);
    enemy.death();
    this.throwableobject.forEach((bottle, index) => {
      if (enemy.iscolliding(bottle)) {
        bottle.remove(this.ctx);
        this.throwableobject.splice(index, 1);
      }
    });
  }

  /**
  * Handles the collision between a small chicken and throwable objects.
  *
  * @param {object} enemy - The enemy instance representing a small chicken.
  */
  smallchickencollision(enemy) {
    setInterval(() => {
      enemy.playAnimation(enemy.DEAD_SMALLCHICKEN);
    }, 1000 / 75);
    enemy.death();
    this.throwableobject.forEach((bottle, index) => {
      if (enemy.iscolliding(bottle)) {
        bottle.remove(this.ctx);
        this.throwableobject.splice(index, 1);
      }
    });
  }

  /**
  * Handles the collision between the end boss and throwable objects.
  *
  * @param {object} enemy - The enemy instance representing the end boss.
  */
  endbosscollision(enemy) {
    this.throwableobject.forEach((bottle, index) => {
      if (enemy.iscolliding(bottle)) {
        bottle.remove(this.ctx);
        this.throwableobject.splice(index, 1);
      }
    });
    this.enemybosscollision(enemy);
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

}