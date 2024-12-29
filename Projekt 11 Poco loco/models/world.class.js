class World {
  character = new Character();
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

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
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
      let bottle = new ThrowableObject(
        this.character.x + 40,
        this.character.y + 60
      );
      this.throwableobject.push(bottle);
    }
  }

  checkCollisions() {
    this.level.enemies.forEach((enemy) => {
      if (this.character.isColliding(enemy)) {
        this.character.hit();
        this.statusbar.setpercentage(this.character.energy);
      }

      this.throwableobject.forEach((bottle) => {
        if (enemy.isColliding(bottle)) {
          console.log(this.enemybosshealthbar);

          if (enemy.constructor.name === "Chicken") {
            const chickendeath = setInterval(() => {
              enemy.playAnimation(enemy.DEAD_CHICKEN);
            }, 1000 / 75);
            this.intervals.push(chickendeath);

            enemy.death();
          } else if (enemy.constructor.name === "Endboss") {
            enemy.hit();
            console.log(enemy);

            this.enemybosshealthbar.setpercentage(enemy.energy);
            if (enemy.energy == 0) {
              const bossdeath = setInterval(() => {
                enemy.playAnimation(enemy.IMAGES_DEAD);
              }, 200);
              this.intervals.push(bossdeath);

              setTimeout(() => {
                enemy.death();
                this.setOverlayImage(enemy.Win); // Set the overlay image
                console.log("Overlay image set:", this.overlayImage); // Debug log
                enemy.win_audio.play();
                this.clearAllIntervals(); // Corrected function call
                this.drawOverlay(); // Draw the overlay immediately
              }, 500);
            }
          }
        }
      });
    });
  }

  setWorld() {
    this.character.world = this;
    this.level.enemies.forEach((enemy) => {
      enemy.world = this; // Pass reference to World instance to each enemy
    });
  }

  draw() {
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.level.backgroundObjects);
    this.ctx.translate(-this.camera_x, 0);
    this.addToMap(this.statusbar);
    this.addToMap(this.coinsstatusbar);
    this.addToMap(this.bottlestatusbar);
    this.addToMap(this.enemybosshealthbar);
    this.ctx.translate(this.camera_x, 0);
    this.addToMap(this.character);
    this.addObjectsToMap(this.level.Cloud);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.throwableobject);
    this.ctx.translate(-this.camera_x, 0);

    if (this.overlayImage) {
      console.log("Drawing overlay"); // Debug log
      this.drawOverlay();
    }

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

  drawOverlay() {
    const img = new Image();
    img.src = this.overlayImage;
    img.onload = () => {
      this.ctx.drawImage(img, 70, 200, 720, 480);
      console.log("Overlay drawn"); // Debug log
    };
  }

  clearAllIntervals() {
    this.intervals.forEach(clearInterval);
  }
}
