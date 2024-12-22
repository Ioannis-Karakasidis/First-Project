class World {
  character = new Character();
  enemies = [new Chicken(), new Chicken(), new Chicken()];
  ctx;
  Cloud = [
    new Clouds("img/5_background/layers/4_clouds/1.png"),
    new Clouds("img/5_background/layers/4_clouds/2.png"),
  ];
  backgroundObjects = [
    new BackgroundObject("img/5_background/layers/air.png"),
    new BackgroundObject("img/5_background/layers/3_third_layer/1.png"),
    new BackgroundObject("img/5_background/layers/3_third_layer/2.png"),
    new BackgroundObject("img/5_background/layers/2_second_layer/1.png"),
    new BackgroundObject("img/5_background/layers/2_second_layer/2.png"),
    new BackgroundObject("img/5_background/layers/1_first_layer/1.png"),
    new BackgroundObject("img/5_background/layers/1_first_layer/2.png"),
  ];
  constructor(canvas) {
    this.ctx = canvas.getContext("2d");
    this.draw();
  }

  draw() {
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.addObjectsToMap(this.backgroundObjects);
    this.addObjectsToMap(this.Cloud);

    this.addObjectsToMap(this.enemies);
    this.addToMap(this.character);

    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  addToMap(mo) {
    this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);
  }
  addObjectsToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  }
}
