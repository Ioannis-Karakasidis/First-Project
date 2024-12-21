class MovableObject {
  x = 120;
  y = 200;
  img;

  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  moreRight() {
    console.log("Moving right");
  }
}
