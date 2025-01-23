class World extends worldDrawer {
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
  movableobjects = new MovableObject();
  coinsstatusbar = new Coinsstatusbar();
  bottlestatusbar = new Bottlestatusbar();
  enemybosshealthbar = new Enemybosshealthbar();
  throwableobject = [];
  bottles = [];
  overlayImage = null;
  rotatephoto = "img/rotate.png";
  coins = new Coinsstatusbar();
  isEndbossHit = false;
  background_audio = new Audio(
    "audio/sonido-ambiente-desierto-ambience-sound-desert-217122.mp3"
  );
  characterAlreadyAttacked = false;

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
    this.mute();
    this.drawgame();
    this.setWorld();
    this.run();
  }

  /**
   * Toggles the background audio playback based on the mute state.
   */
  mute() {
    if (mute) {
      this.background_audio.pause();
    } else {
      this.background_audio.play();
    }
  }

  /**
   * Sets the world instance for the character.
   */
  setWorld() {
    this.character.world = this;
    this.level.enemies.forEach((enemy) => {
      enemy.world = this;
    });
  }

  /**
   * Runs the game loop.
   */
  run() {
    setInterval(() => {
      this.checkCollisions();
    }, 0);
    setInterval(() => {
      this.checkthrowobjects();
    }, 150);
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
      this.throwSalsaBottleelse()
    }
  }

  /**
   * Throws a salsa bottle by creating a new throwable object and updating the bottle inventory and status bar.
   */
  throwSalsaBottleelse() {
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
    }
    if (!this.characterAlreadyAttacked) {
      this.characterAlreadyAttacked = true;
      this.characterattacked();
      setTimeout(() => {
        this.characterAlreadyAttacked = false;
      }, 500);
    }
  }

  /**
   * Handles character collisions.
   */
  charactercollision() {
    this.level.enemies.forEach((enemy) => {
      if (this.character.isColliding(enemy)) {
        this.enemydead(enemy)
        return;
      }
      this.throwbottles(enemy);
    });
  }

  /**
   * Handles character being attacked.
   */
  characterattacked() {
    world.character.hit();
    world.character.playAnimation(world.character.characterarrays.IMAGES_HURT)
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
    }

  }

  /**
 * Handles the death of a small chicken.
 *
 * @param {Enemy} enemy - The enemy instance.
 */
  smallchickenkill(enemy) {
    enemy.loadImage(enemy.DEAD_SMALLCHICKEN);
    this.character.jump();
    setTimeout(() => {
      enemy.death()
      if (mute) {
        enemy.deadchicken_audio.pause();
      } else {
        enemy.deadchicken_audio.play();
      }
    }, 150);
  }

  /**
   * Handles the death of a chicken.
   *
   * @param {Enemy} enemy - The enemy instance.
   */
  chickenkill(enemy) {
    enemy.loadImage(enemy.DEAD_CHICKEN);
    this.character.jump();
    setTimeout(() => {
      enemy.death()
      if (mute) {
        enemy.deadchicken_audio.pause();
      } else {
        enemy.deadchicken_audio.play();
      }
    }, 100);
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
      this.endbosscollision(enemy)
    }
  }

  /**
   * Handles the collision between a chicken and throwable objects.
   *
   * @param {object} enemy - The enemy instance representing a chicken.
   */
  chickencollision(enemy) {
    this.throwableobject.forEach((bottle, index) => {
      if (enemy.iscolliding(bottle)) {
        this.enemybottlecollidement(enemy)
      }
    });
  }

  /**
   * Handles bottle collision with an enemy, including changing the enemy's image, playing a splash animation, 
   * removing the bottle, and triggering the enemy's death.
   * 
   * @param {Object} enemy - The enemy involved in the collision.
   */
  enemybottlecollidement(enemy) {
    enemy.loadImage(enemy.DEAD_CHICKEN);
        bottle.playAnimation(bottle.bottlesplash)
        setTimeout(() => {
          bottle.remove(this.ctx);
          this.throwableobject.splice(index, 1);
        }, 5);
        setTimeout(() => {
          enemy.death()
        }, 150);
  }

  /**
   * Handles the collision between a small chicken and throwable objects.
   *
   * @param {object} enemy - The enemy instance representing a small chicken.
   */
  smallchickencollision(enemy) {
    this.throwableobject.forEach((bottle, index) => {
      if (enemy.iscolliding(bottle)) {
        setInterval(() => {
          enemy.loadImage(enemy.DEAD_SMALLCHICKEN);
        }, 0);
        bottle.playAnimation(bottle.bottlesplash)
        setTimeout(() => {
          bottle.remove(this.ctx);
          this.throwableobject.splice(index, 1);
        }, 50);
        setTimeout(() => {
          enemy.death()
        }, 10);
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
        bottle.playAnimation(bottle.bottlesplash);
        bottle.remove(this.ctx);
        this.throwableobject.splice(index, 1);
        this.enemybosscollision(enemy);
      }
    });
  }

  /**
   * Handles the death of the boss.
   *
   * @param {Enemy} enemy - The enemy instance.
   */
  deadboss(enemy) {
    setInterval(() => {
      enemy.playAnimation(enemy.IMAGES_DEAD);
    }, 300);
    setTimeout(() => {
      enemy.death();
    }, 800);
    this.isEndbossHit = false;
  }

  /**
   * Handles collisions with the boss.
   *
   * @param {Enemy} enemy - The enemy instance.
   */
  enemybosscollision(enemy) {
    enemy.hit();
    enemy.playAnimation(enemy.IMAGES_HURT);
    if (!mute) {
      enemy.deadchicken_audio.play();
    }
    world.enemybosshealthbar.setpercentage(enemy.energy);
    if (world.enemybosshealthbar.percentage === 0) {
      this.deadboss(enemy);
    } else {
      this.bossattack(enemy);
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
    }, 1000 / 60);
    setInterval(() => {
      enemy.playAnimation(enemy.IMAGES_ATTACK);

    }, 400);
  }

  /**
   * Clears the canvas.
   */
  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
}