class worldDrawer {
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


