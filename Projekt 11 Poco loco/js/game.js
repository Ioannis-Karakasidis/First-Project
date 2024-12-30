let canvas;
let world;
let throwableobject = new ThrowableObject();
let keyboard = new Keyboard();
function init() {
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);
}

function throwSalsaBottles() {
  world.throwSalsaBottle();
}

function jump() {
  world.character.jump();
}

function moveLeft() {
  if (world.character.x > 0) {
    world.character.handleMoveLeft();
  }
}

function moveRight() {
  if (world.character.x < world.level.level_end_x) {
    world.character.handleMoveRight();
  }
}

function drawgame() {
  if (world) {
    world.showIntro = false; // Ensure the intro is not shown
    world.drawgame();
    document.getElementById("start").style.display = "none";
  }
}

function checkOrientation() {
  if (window.innerHeight > window.innerWidth) {
    world.drawIntro(world.rotatephoto);
    document.querySelector(".buttonscontainer").style.display = "none";
  } else {
    console.log("Landscape mode");
    world.draw();
    document.querySelector("h1").style.display = "none";
    document.querySelector(".buttonscontainer").style.display = "none";
  }
}

document.addEventListener("keydown", (e) => {
  let code = e.keyCode;
  if (code === 37) {
    keyboard.LEFT = true;
    console.log(keyboard.LEFT);
  } else if (code === 38) {
    keyboard.UP = true;
    console.log(keyboard.UP);
  } else if (code === 39) {
    keyboard.RIGHT = true;
    console.log(keyboard.RIGHT);
  } else if (code === 40) {
    keyboard.DOWN = true;
    console.log(keyboard.DOWN);
  } else if (code === 32) {
    keyboard.SPACE = true;
    console.log(keyboard.SPACE);
  } else if (code === 68) {
    keyboard.D = true;
  }
});

document.addEventListener("keyup", (e) => {
  let code = e.keyCode;
  if (code === 37) {
    keyboard.LEFT = false;
    console.log(keyboard.LEFT);
  } else if (code === 38) {
    keyboard.UP = false;
    console.log(keyboard.UP);
  } else if (code === 39) {
    keyboard.RIGHT = false;
    console.log(keyboard.RIGHT);
  } else if (code === 40) {
    keyboard.DOWN = false;
    console.log(keyboard.DOWN);
  } else if (code === 32) {
    keyboard.SPACE = false;
    console.log(keyboard.SPACE);
  } else if (code === 68) {
    keyboard.D = false;
    console.log(keyboard.D);
  }
});

// Check orientation on load
window.addEventListener("load", checkOrientation);

// Check orientation on resize
window.addEventListener("resize", checkOrientation);
