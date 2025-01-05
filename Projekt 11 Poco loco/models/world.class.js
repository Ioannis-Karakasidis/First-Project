class World {
  character = new Character(); // Initialize character with world instance
  enemyboss = new Endboss();
  bottle = new ThrowableObject();
  level = level1;
  canvas;
  ctx;
  keyboard;
  camera_x = 0;
  statusbar = new Statusbar();
  coinsstatusbar = new Coinsstatusbar();
  bottlestatusbar = new Bottlestatusbar();
  enemybosshealthbar = new Enemybosshealthbar();
  throwableobject = [];
  intervals = [];
  overlayImage = null;
  rotatephoto = "img/rotate.png";
  coins = new Coinsstatusbar();
  background_audio = new Audio(
    "audio/sonido-ambiente-desierto-ambience-sound-desert-217122.mp3"
  );
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

  run() {
    const throwobjects = setInterval(() => {
      this.checkCollisions();
      this.checkthrowobjects();
    }, 200);
    this.intervals.push(throwobjects);
  }

  checkthrowobjects() {
    if (this.keyboard.D) {
      this.throwSalsaBottle();
    }
  }

  throwSalsaBottle() {
    let bottle = new ThrowableObject(
      this.character.x + 40,
      this.character.y + 60
    );
    this.throwableobject.push(bottle);
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
        this.bottlestatusbar.setpercentage(
          this.bottlestatusbar.percentage + 20
        );
        return false;
      }
      return true;
    });
  }

  checkCollisions() {
    this.coinscollision();
    this.charactercollision();
    this.bottlescollision();
  }

  charactercollision() {
    this.level.enemies.forEach((enemy) => {
      if (this.character.isCollidingTop(enemy)) {
        this.enemykill(enemy);
      } else if (this.character.isColliding(enemy)) {
        this.character.hit();
        this.statusbar.setpercentage(this.character.energy);
      }
      this.throwbottles(enemy);
    });
  }

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

  characterkillenemy(enemy) {
    if (
      this.character.isColliding(enemy) &&
      this.character.y + this.character.height <= enemy.y + enemy.height / 2
    ) {
      enemy.hit();
      setInterval(() => {
        enemy.playAnimation(enemy.DEAD_CHICKEN);
      }, 1000 / 75);
      enemy.death();
    }
  }

  throwbottles(enemy) {
    this.throwableobject.forEach((bottle) => {
      if (enemy.isColliding(bottle)) {
        this.enemiescollision(enemy);
      }
    });
  }

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
      enemy.hit();
      this.enemybosshealthbar.setpercentage(enemy.energy);
    }
  }

  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  setWorld() {
    this.character.world = this;
    this.level.enemies.forEach((enemy) => {
      enemy.world = this; // Pass reference to World instance to each enemy
    });
  }

  draw() {
    if (this.showIntro) {
      this.drawIntro(this.introImage);
    } else {
      this.drawgame();
    }
  }

  drawgame() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.level.backgroundObjects);
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

  stopAnimation() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
  }

  beforecamera() {
    this.addToMap(this.statusbar);
    this.addToMap(this.coinsstatusbar);
    this.addToMap(this.bottlestatusbar);
    this.addToMap(this.enemybosshealthbar);
  }

  aftercamera() {
    this.addToMap(this.character);
    this.addObjectsToMap(this.level.coins);
    this.addObjectsToMap(this.level.bottles);
    this.addObjectsToMap(this.level.Cloud);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.throwableobject);
  }

  addToMap(mo) {
    if (mo.otherDirection) {
      this.flipImage(mo);
    }

    mo.draw(this.ctx);
    mo.drawframe(this.ctx);
    if (mo.otherDirection) {
      this.flipImageBack(mo);
    }
  }
  addObjectsToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  }

  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }

  setOverlayImage(imagePath) {
    this.overlayImage = imagePath;
  }

  flipImageBack(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }

  clearAllIntervals() {
    for (let i = 1; i < 9999; i++) {
      window.clearInterval(i);
    }
  }
}
