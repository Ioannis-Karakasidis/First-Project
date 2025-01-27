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
  i = 5

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
    this.toggleBackgroundAudio();
    this.drawgame();
    this.initializeWorld();
    this.startGameLoop();
    this.isStopped = false;
  }

  /**
   * Toggles the background audio playback based on the mute state.
   */
  toggleBackgroundAudio() {
    if (mute) {
      this.background_audio.pause();
    } else {
      this.background_audio.play();
    }
  }

  /**
   * Sets the world instance for the character.
   */
  initializeWorld() {
    this.character.world = this;
    this.level.enemies.forEach((enemy) => {
      enemy.world = this;
    });
  }

  /**
   * Runs the game loop.
   */
  startGameLoop() {
    setInterval(() => {
      this.detectCollisions();
    }, 0);
    setInterval(() => {
      this.checkForThrowables();
    }, 150);
  }

  /**
   * Checks if the player is throwing objects.
   */
  checkForThrowables() {
    if (this.keyboard.D) {
      this.throwBottleIfAvailable();
    }
  }

  /**
   * Throws a salsa bottle.
   */
  throwBottleIfAvailable() {
    if (this.bottles.length === 0) {
      return;
    } else {
      this.throwNewBottle()
    }
  }

  /**
   * Throws a salsa bottle by creating a new throwable object and updating the bottle inventory and status bar.
   */
  throwNewBottle() {
    let bottle = new ThrowableObject(
      this.character.x + 20,
      this.character.y + 40
    );
    this.throwAndUpdateBottle(bottle)
  }

  /**
   * Throws a bottle, updates the inventory, and checks if all bottles have been thrown.
   * Reduces the bottle status bar by 20%.
   * 
   * @param {Object} bottle - The bottle object to be thrown.
   */
  throwAndUpdateBottle(bottle) {
    this.throwableobject.push(bottle);
    this.bottles.splice(0, 1);
    setTimeout(() => {
      if (world.bottles.length === 0 && this.level.bottles.length === 0 && this.enemyboss.energy !== 0) {
        gameover()
      }
    }, 1500);
    this.bottlestatusbar.setpercentage(
      this.bottlestatusbar.percentage - 20
    );
  }

  /**
   * Handles coin collisions.
   */
  checkForCoinCollisions() {
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
  checkForBottleCollisions() {
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
  detectCollisions() {
    this.checkForCoinCollisions();
    this.checkCharacterCollisions();
    this.checkForBottleCollisions();
    this.level.enemies.forEach((enemy) => {
      this.throwBottlesAtEnemies(enemy);
    });
  }

  /**
   * Handles enemy death.
   *
   * @param {Enemy} enemy - The enemy instance.
   */
  handleEnemyDeath(enemy) {
    if (this.character.isAboveGround()) {
      this.killEnemy(enemy);
      return;
    }
    if (!this.characterAlreadyAttacked) {
      this.characterAlreadyAttacked = true;
      this.handleCharacterAttacked();
      setTimeout(() => {
        this.characterAlreadyAttacked = false;
      }, 500);
    }
  }

  /**
   * Handles character collisions.
   */
  checkCharacterCollisions() {
    this.level.enemies.forEach((enemy) => {
      if (this.character.isColliding(enemy)) {
        this.handleEnemyDeath(enemy)
        return;
      }
      this.throwBottlesAtEnemies(enemy);
    });
  }

  /**
   * Handles character being attacked.
   */
  handleCharacterAttacked() {
    world.character.hit();
    world.character.playAnimation(world.character.characterarrays.IMAGES_HURT)
    this.statusbar.setpercentage(world.character.energy);
  }

  /**
   * Handles enemy kill.
   *
   * @param {Enemy} enemy - The enemy instance.
   */
  killEnemy(enemy) {
    if (enemy.constructor.name === "Chicken") {
      this.handleChickenDeath(enemy)
    } else if (enemy.constructor.name === "Smallchicken") {
      this.handleSmallChickenDeath(enemy)
    }
  }

  /**
 * Handles the death of a small chicken.
 *
 * @param {Enemy} enemy - The enemy instance.
 */
  handleSmallChickenDeath(enemy) {
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
  handleChickenDeath(enemy) {
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
  throwBottlesAtEnemies(enemy) {
    this.throwableobject.forEach((bottle) => {
      if (enemy.iscolliding(bottle)) {
        this.handleEnemyBottleCollisions(enemy);
      }
    });
  }

  /**
   * Handles collisions with enemies.
   *abe
   * @param {Enemy} enemy - The enemy instance.
   */
  handleEnemyBottleCollisions(enemy) {
    if (enemy.constructor.name === "Chicken") {
      this.handleChickenBottleCollision(enemy)
    } else if (enemy.constructor.name === "Smallchicken") {
      this.handleSmallChickenBottleCollision(enemy)
    } else if (enemy.constructor.name === "Endboss") {
      this.handleBossBottleCollision(enemy)
    }
  }

  /**
   * Handles the collision between a chicken and throwable objects.
   *
   * @param {object} enemy - The enemy instance representing a chicken.
   */
  handleChickenBottleCollision(enemy) {
    this.throwableobject.forEach((bottle, index) => {
      if (enemy.iscolliding(bottle)) {
        this.handleBottleCollisionWithEnemy(enemy, bottle, index)
      }
    });
  }

  /**
   * Handles bottle collision with an enemy, including changing the enemy's image, playing a splash animation, 
   * removing the bottle, and triggering the enemy's death.
   * 
   * @param {Object} enemy - The enemy involved in the collision.
   */
  handleBottleCollisionWithEnemy(enemy, bottle, index) {
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
  handleSmallChickenBottleCollision(enemy) {
    this.throwableobject.forEach((bottle, index) => {
      if (enemy.iscolliding(bottle)) {
        this.handleBottleImpactWithEnemy(enemy, bottle, index)
      }
    });
  }

  /**
   * Handles the impact of a bottle with an enemy, triggering the bottle's animation and enemy's death.
   * @param {Object} enemy - The enemy object that is impacted by the bottle.
   * @param {Object} bottle - The bottle object that causes the impact.
   * @param {number} index - The index of the bottle in the throwable object array.
   */
  handleBottleImpactWithEnemy(enemy, bottle, index) {
    setInterval(() => {
      enemy.loadImage(enemy.DEAD_SMALLCHICKEN);
    }, 0);
    bottle.playAnimation(bottle.bottlesplash)
    this.bottleremoval(bottle, enemy, index)
  }

  /**
   * Removes the bottle and triggers the enemy's death after a delay.
   * @param {Object} bottle - The bottle object to remove from the scene.
   * @param {Object} enemy - The enemy object to be destroyed.
   * @param {number} index - The index of the bottle in the throwable object array.
   */
  bottleremoval(bottle, enemy, index) {
    setTimeout(() => {
      bottle.remove(this.ctx);
      this.throwableobject.splice(index, 1);
    }, 600);
    setTimeout(() => {
      enemy.death()
    }, 150);
  }

  /**
  * Handles the collision between the end boss and throwable objects.
  *
  * @param {object} enemy - The enemy instance representing the end boss.
  */
  handleBossBottleCollision(enemy) {
    this.throwableobject.forEach((bottle, index) => {
      if (enemy.iscolliding(bottle)) {
        bottle.playAnimation(bottle.bottlesplash);
        bottle.remove(this.ctx);
        this.throwableobject.splice(index, 1);
        this.handleBossDamage(enemy);
      }
    });
  }

  /**
   * Handles the death of the boss.
   *
   * @param {Enemy} enemy - The enemy instance.
   */
  handleBossDeath(enemy) {
    setInterval(() => {
      enemy.playAnimation(enemy.IMAGES_DEAD);
    }, 60);
    setTimeout(() => {
      enemy.death();
    }, 500);
    this.isEndbossHit = false;
  }
}