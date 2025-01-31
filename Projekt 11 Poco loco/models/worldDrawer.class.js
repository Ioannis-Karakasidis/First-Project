class worldDrawer {
  /**
   * Draws elements before the camera.
   */
  drawBeforeCamera() {
    this.addToMap(this.statusbar);
    this.addToMap(this.coinsstatusbar);
    this.addToMap(this.bottlestatusbar);
    this.addToMap(this.enemybosshealthbar);
  }

  /**
   * Draws elements after the camera.
   */
  drawAfterCamera() {
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
   * Flips an image.
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

  /**
   * Draws the game.
   */
  drawgame() {
    if (this.showIntro) {
      this.drawIntro(this.introImage);
    } else {
      this.drawcanva();
    }
  }

  /**
   * Draws the game elements.
   */
  drawcanva() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.camera_x, 0);
    if (this.level.backgroundObjects) {
      this.addObjectsToMap(this.level.backgroundObjects);
    }
    this.applyCameraTranslation()
    let self = this;
    this.animationFrameId = requestAnimationFrame(function () {
      self.drawcanva();
    });
  }

  /**
   * Adjusts the canvas context to apply camera translation and renders elements before and after the camera shift.
   */
  applyCameraTranslation() {
    this.drawAfterCamera();
    this.ctx.translate(-this.camera_x, 0);
    this.drawBeforeCamera();
    this.ctx.translate(this.camera_x, 0);
    this.ctx.translate(-this.camera_x, 0);

  }

  /**
   * Handles collisions with the boss.
   *
   * @param {Enemy} enemy - The enemy instance.
   */
  handleBossDamage(enemy) {
    enemy.hit();
    enemy.speed += 0.2;
    enemy.playAnimation(enemy.IMAGES_HURT);
    this.resetBossState(enemy)
    if (world.enemybosshealthbar.percentage === 0) {
      this.handleBossDeath(enemy);
    } else {
      this.initiateBossAttack(enemy);
    }
  }

  /**
   * Handles the boss's recovery or reset behavior, playing the appropriate sound and updating the health bar.
   */
  resetBossState(enemy) {
    if (!mute) {
      enemy.deadchicken_audio.play();
    }
    world.enemybosshealthbar.setpercentage(enemy.energy);
  }

  /**
   * Handles the boss attack.
   *
   * @param {Enemy} enemy - The enemy instance.
   */
  initiateBossAttack(enemy) {
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


