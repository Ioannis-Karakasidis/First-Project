class World {
  /**
   * Description placeholder
   *
   * @type {*}
   */
  character = new Character(); // Initialize character with world instance
  /**
   * Description placeholder
   *
   * @type {*}
   */
  enemyboss = new Endboss();
  /**
   * Description placeholder
   *
   * @type {*}
   */
  bottle = new ThrowableObject();
  level = level1;
  /**
   * Description placeholder
   *
   * @type {*}
   */
  canvas;
  ctx;
  /**
   * Description placeholder
   *
   * @type {*}
   */
  world;
  /**
   * Description placeholder
   *
   * @type {*}
   */
  keyboard;
  /**
   * Description placeholder
   *
   * @type {number}
   */
  camera_x = 0;
  statusbar = new Statusbar();
  /**
   * Description placeholder
   *
   * @type {*}
   */
  coinsstatusbar = new Coinsstatusbar();
  bottlestatusbar = new Bottlestatusbar();
  /**
   * Description placeholder
   *
   * @type {*}
   */
  enemybosshealthbar = new Enemybosshealthbar();
  throwableobject = [];
  bottles = [];
  /**
   * Description placeholder
   *
   * @type {{}}
   */
  intervals = [];
  /**
   * Description placeholder
   *
   * @type {*}
   */
  overlayImage = null;
  /**
   * Description placeholder
   *
   * @type {string}
   */
  rotatephoto = "img/rotate.png";
  /**
   * Description placeholder
   *
   * @type {*}
   */
  coins = new Coinsstatusbar();
  /**
   * Description placeholder
   *
   * @type {boolean}
   */
  isEndbossHit = false;
  /**
   * Description placeholder
   *
   * @type {boolean}
   */
  isEndbosshit = false;
  /**
   * Description placeholder
   *
   * @type {{}}
   */
  bottles = 0;
  /**
   * Description placeholder
   *
   * @type {*}
   */
  background_audio = new Audio(
    "audio/sonido-ambiente-desierto-ambience-sound-desert-217122.mp3"
  );

  /**
   * Creates an instance of World.
   *
   * @constructor
   * @param {*} canvas 
   * @param {*} keyboard 
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

  setWorld() {
    this.character.world = this;
  }

  /** Description placeholder */
  run() {
    setInterval(() => {
      this.checkCollisions();
      this.checkthrowobjects();
    }, 200);
  }

  /** Description placeholder */
  checkthrowobjects() {
    if (this.keyboard.D) {
      this.throwSalsaBottle();

    }
  }

  /** Description placeholder */
  throwSalsaBottle() {
    if (this.bottles === 0) {
      return;
    } else {
      let bottle = new ThrowableObject(
        this.character.x + 40,
        this.character.y + 40
      );
      this.throwableobject.push(bottle);
      this.bottles--
      this.bottlestatusbar.setpercentage(
        this.bottlestatusbar.percentage - 20
      );
    }

  }

  coinscollision() {
    this.level.coins = this.level.coins.filter((coin) => {
      if (this.character.isColliding(coin)) {
        this.coinsstatusbar.setpercentage(this.coinsstatusbar.percentage + 20);
        return false;
      }
      return true;
    });
  }

  bottlescollision() {
    this.level.bottles = this.level.bottles.filter((bottle) => {
      if (this.character.isColliding(bottle)) {
        this.bottles++
        this.bottlestatusbar.setpercentage(
          this.bottlestatusbar.percentage + 20
        );
        return false;
      }

      return true;
    });
  }

  /** Description placeholder */
  checkCollisions() {
    this.coinscollision();
    this.charactercollision();
    this.bottlescollision();

    this.level.enemies.forEach((enemy) => {
      this.throwbottles(enemy);
    });
  }

  /**
   * Description placeholder
   *
   * @param {*} enemy 
   */
  enemydead(enemy) {
    this.isEndbosshit = true;
    enemy.death();
    this.enemykill(enemy);
    setTimeout(() => {
      this.isEndbosshit = false;
    }, 500);
  }

  /** Description placeholder */
  charactercollision() {
    this.level.enemies.forEach((enemy) => {
      if (this.character.isColliding(enemy)) {
        if (world.character.isAboveGround() && !this.isEndbosshit) {
          this.enemydead(enemy)
        } else if (!world.character.isAboveGround() && !this.isEndbosshit) {
          this.characterattacked()
        }

      } else {
        this.throwbottles(enemy);

      }

    });
  }

  /** Description placeholder */
  characterattacked() {
    this.isEndbosshit = true;
    world.character.hit();
    this.statusbar.setpercentage(world.character.energy);
    setTimeout(() => {
      this.isEndbosshit = false;
    }, 100);
  }

  /**
   * Description placeholder
   *
   * @param {*} enemy 
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
   * Description placeholder
   *
   * @param {*} enemy 
   */
  throwbottles(enemy) {
    this.throwableobject.forEach((bottle) => {
      if (enemy.iscolliding(bottle)) {
        this.enemiescollision(enemy);
      }
    });
  }

  /**
   * Description placeholder
   *
   * @param {*} enemy 
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
      this.enemybosscollision(enemy)
    }
  }

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
   * Description placeholder
   *
   * @param {*} enemy 
   */
  enemybosscollision(enemy) {
    if (!this.isEndbossHit) {
      this.isEndbossHit = true;
      enemy.hit();
      world.enemybosshealthbar.setpercentage(enemy.energy);
      if (world.enemybosshealthbar.percentage === 0) {
        this.deadboss(enemy)
      } else {
        this.bossattack(enemy)
      }
    }
  }

  /**
   * Description placeholder
   *
   * @param {*} enemy 
   */
  bossattack(enemy) {
    enemy.stopGames()
    setInterval(() => {
      enemy.moveLeft();
    }, 1000 / 180);
    setInterval(() => {
      enemy.playAnimation(enemy.IMAGES_ATTACK)
    }, 150);
    setTimeout(() => {
      this.isEndbossHit = false;
    }, 1000);
  }

  /** Description placeholder */
  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  /**
   * Description placeholder
   *
   * @returns 
   */
  setWorld() {
    this.character.world = this;
    this.level.enemies.forEach((enemy) => {
      enemy.world = this;
    });
  }

  /** Description placeholder */
  draw() {
    if (this.showIntro) {
      this.drawIntro(this.introImage);
    } else {
      this.drawgame();
    }
  }

  /** Description placeholder */
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

  /** Description placeholder */
  beforecamera() {
    this.addToMap(this.statusbar);
    this.addToMap(this.coinsstatusbar);
    this.addToMap(this.bottlestatusbar);
    this.addToMap(this.enemybosshealthbar);
  }

  /** Description placeholder */
  aftercamera() {
    this.addToMap(this.character);
    this.addObjectsToMap(this.level.coins);
    this.addObjectsToMap(this.level.bottles);
    this.addObjectsToMap(this.level.Cloud);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.throwableobject);
  }

  /**
   * Description placeholder
   *
   * @param {*} mo 
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
   * Description placeholder
   *
   * @param {*} objects 
   */
  addObjectsToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  }

  /**
   * Description placeholder
   *
   * @param {*} mo 
   */
  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }

  /**
   * Description placeholder
   *
   * @param {*} mo 
   */
  flipImageBack(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }

  /** Description placeholder */
  clearAllIntervals() {
    for (let i = 1; i < 9999; i++) {
      window.clearInterval(i);
    }
  }
}
