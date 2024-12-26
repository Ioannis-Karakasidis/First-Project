let canvas;
let world;
let keyboard = new Keyboard();
function init() {
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);
  console.log("My character is", world.character);
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
