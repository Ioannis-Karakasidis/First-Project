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
  document.querySelector(".intro").style.display = "none";
  document.getElementById("start").style.display = "none";
  this.init();
  setInterval(() => {
    if (world.enemybosshealthbar.percentage == 0) {
      document.getElementById("outro").src =
        "img/9_intro_outro_screens/win/win_2.png";
      document.querySelector(".outro").style.position = "relative";
    } else if (world.character.energy == 0) {
      document.getElementById("outro").src =
        "img/9_intro_outro_screens/game_over/game_over.png";
      document.querySelector(".outro").style.position = "relative";
    }
  }, 1000);

  world.drawgame();
}

function checkOrientation() {
  if (window.matchMedia("(orientation: portrait)").matches) {
    console.log("Portrait mode");
    document.getElementById("start").style.display = "none";
    document.querySelector(".buttonscontainer").style.display = "none";
  } else {
    console.log("Landscape mode");
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
