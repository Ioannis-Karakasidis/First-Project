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

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.run();
  }

  run() {
    setInterval(() => {
      this.checkCollisions();
      this.checkthrowobjects();
    }, 200);
  }

  checkthrowobjects() {
    if (this.keyboard.D) {
      let bottle = new ThrowableObject(
        this.character.x + 40,
        this.character.y + 40
      );
      this.throwableobject.push(bottle);
    }
  }

  checkCollisions() {
    this.level.enemies.forEach((enemy) => {
      if (this.character.isColliding(enemy)) {
        this.character.hit();
        this.statusbar.setpercentage(
          this.character.energy,
          this.statusbar.IMAGES
        );
      }
    });

    this.throwableobject.forEach((bottle) => {
      if (this.enemyboss.isColliding(bottle)) {
        this.enemyboss.bosshit();
        this.enemybosshealthbar.setpercentage(
          this.enemyboss.percentage,
          this.enemybosshealthbar.IMAGES
        );
        if (this.percentage == 0) {
          setInterval(() => {
            this.playAnimation(this.IMAGES_DEAD);
            console.log("hello");
          }, 250);
        }
      }
    });
  }

  setWorld() {
    this.character.world = this;
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

  flipImageBack(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }
}
