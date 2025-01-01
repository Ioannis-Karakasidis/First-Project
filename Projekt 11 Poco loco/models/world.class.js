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
  gameOver = false; // Add a flag to indicate when the game is over
  initf;
  coins = new Coinsstatusbar();
  constructor(canvas, keyboard, initf) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.initf = initf;
    this.keyboard = keyboard;
    this.draw();
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
    console.log("Throwing salsa bottle");

    this.throwableobject.push(bottle);
  }

  checkCollisions() {
    this.level.coins = this.level.coins.filter((coin) => {
      if (this.character.isColliding(coin)) {
        this.coinsstatusbar.setpercentage(this.coinsstatusbar.percentage + 20); // Update the coins status bar
        return false;
      }
      return true; // Keep the coin in the array
    });
    this.level.bottles = this.level.bottles.filter((bottle) => {
      if (this.character.isColliding(bottle)) {
        this.bottlestatusbar.setpercentage(
          this.bottlestatusbar.percentage + 20
        );
        return false; // Remove the bottle from the array
      }
      return true; // Keep the bottle in the array
    });
    this.level.enemies.forEach((enemy) => {
      if (this.character.isColliding(enemy)) {
        this.character.hit();
        this.statusbar.setpercentage(this.character.energy);
      }
      this.throwableobject.forEach((bottle) => {
        if (enemy.isColliding(bottle)) {
          console.log(this.enemybosshealthbar);
          console.log(enemy.constructor.name);

          if (enemy.constructor.name === "Chicken") {
            const chickendeath = setInterval(() => {
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
            console.log(enemy);
            this.enemybosshealthbar.setpercentage(enemy.energy);
            if (enemy.energy == 0) {
              const bossdeath = setInterval(() => {
                enemy.playAnimation(enemy.IMAGES_DEAD);
              }, 200);
              setTimeout(() => {
                enemy.death();
              }, 1000);
              setTimeout(() => {
                enemy.win_audio.play();
                this.clearAllIntervals();
                this.clearCanvas();
              }, 2000);
            }
          }
        }
      });
    });
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
    this.addToMap(this.statusbar);
    this.addToMap(this.coinsstatusbar);
    this.addToMap(this.bottlestatusbar);
    this.addToMap(this.enemybosshealthbar);
    this.ctx.translate(this.camera_x, 0);
    this.addToMap(this.character);
    this.addObjectsToMap(this.level.coins);
    this.addObjectsToMap(this.level.bottles);
    this.addObjectsToMap(this.level.Cloud);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.throwableobject);
    this.ctx.translate(-this.camera_x, 0);
    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
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

  drawIntro(image) {
    const img = new Image();
    img.src = image;
    img.onload = () => {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
    };
  }

  drawOverlay() {
    const img = new Image();
    img.src = this.overlayImage;
    img.onload = () => {
      this.ctx.drawImage(img, 70, 200, 720, 480);
      console.log("Overlay drawn"); // Debug log
    };
  }

  clearAllIntervals() {
    for (let i = 1; i < 9999; i++) window.clearInterval(i);
  }
}
