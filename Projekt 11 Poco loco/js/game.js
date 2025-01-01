let canvas;
let world;
let throwableobject = new ThrowableObject();
let keyboard = new Keyboard();
function init() {
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard, init);
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
      winscreen();
    } else if (world.character.energy == 0) {
      gameoverpart1();
      setTimeout(() => {
        gameoverpart2();
      }, 1000);
    }
  }, 1000);
}

function gameoverpart2() {
  document.querySelector(".outro").style.zIndex = "-1";
  world.ctx.clearRect(0, 0, canvas.width, canvas.height);
  document.querySelector(".intro").style.display = "flex";
  document.getElementById("start").style.display = "flex";
  world.drawgame();
}

function gameoverpart1() {
  document.getElementById("outroimg").src =
    "img/9_intro_outro_screens/game_over/game_over.png";
  world.ctx.clearRect(0, 0, canvas.width, canvas.height);
  document.querySelector(".outro").style.position = "relative";
}

function winscreen() {
  document.getElementById("outroimg").src =
    "img/9_intro_outro_screens/win/win_2.png";
  document.querySelector(".outro").style.position = "relative";
  world.ctx.clearRect(0, 0, canvas.width, canvas.height);
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
    leftkeydown();
  } else if (code === 38) {
    upkeydown();
  } else if (code === 39) {
    rightkeydown();
  } else if (code === 40) {
    downkeydown();
  } else if (code === 32) {
    spacekeydown();
  } else if (code === 68) {
    keyboard.D = true;
  }
});

function spacekeydown() {
  keyboard.SPACE = true;
  console.log(keyboard.SPACE);
}

function downkeydown() {
  keyboard.DOWN = true;
  console.log(keyboard.DOWN);
}

function leftkeydown() {
  keyboard.LEFT = true;
  console.log(keyboard.LEFT);
}

function upkeydown() {
  keyboard.UP = true;
  console.log(keyboard.UP);
}

function rightkeydown() {
  keyboard.RIGHT = true;
  console.log(keyboard.RIGHT);
}

document.addEventListener("keyup", (e) => {
  let code = e.keyCode;
  if (code === 37) {
    leftkeyup();
  } else if (code === 38) {
    upkeyup();
  } else if (code === 39) {
    rightkeyup();
  } else if (code === 40) {
    downkeyup();
  } else if (code === 32) {
    spacekeyup();
  } else if (code === 68) {
    dkeyup();
  }
});

function dkeyup() {
  keyboard.D = false;
  console.log(keyboard.D);
}

function spacekeyup() {
  keyboard.SPACE = false;
  console.log(keyboard.SPACE);
}

function downkeyup() {
  keyboard.DOWN = false;
  console.log(keyboard.DOWN);
}

function leftkeyup() {
  keyboard.LEFT = false;
  console.log(keyboard.LEFT);
}

function rightkeyup() {
  keyboard.RIGHT = false;
  console.log(keyboard.RIGHT);
}

function upkeyup() {
  keyboard.UP = false;
  console.log(keyboard.UP);
}

// Check orientation on load
window.addEventListener("load", checkOrientation);

// Check orientation on resize
window.addEventListener("resize", checkOrientation);
