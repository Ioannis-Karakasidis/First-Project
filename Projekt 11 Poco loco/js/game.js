
/**
 * Main game script that initializes and manages the game state, handles user input,
 * and controls game mechanics such as throwing objects, jumping, and toggling fullscreen mode.
 */

let canvas;
let world;
let coins;
let throwableobject = new ThrowableObject();
let keyboard = new Keyboard();
let intervalsIds = [];
let lastWidth = window.innerWidth;
let lastHeight = window.innerHeight;
let isMobileUserAgent = navigator.userAgent.toLowerCase().includes("mobi");
let i = 1;

/**
 * Initializes the game.
 */
function init() {
  canvas = document.getElementById("canvas");
  initleve1();
  world = new World(canvas, keyboard);
  setStoppableInterval(checkgamestatus, 40);
}

/**
 * Throws salsa bottles in the game.
 */
function throwSalsaBottles() {
  world.throwSalsaBottle();
}

/**
 * Makes the character jump.
 */
function jump() {
  world.character.jump();
}

/**
 * Toggles fullscreen mode.
 */
function fullscreen() {
  let fullscreenElement = document.getElementById("content");
  if (isFullscreen()) {
    closeFullscreen();
  } else {
    openFullscreen(fullscreenElement);
  }
}

/**
 * Stops the game by clearing all intervals.
 */
function stopGame() {
  intervalsIds.forEach(clearInterval);
  intervalsIds = [];
}

/**
 * Stops a specific interval in the game.
 *
 * @param {number} targetIndex - The index of the interval to stop.
 */
function stopSpecificGame(targetIndex) {
  if (intervalsIds[targetIndex]) {
    clearInterval(intervalsIds[targetIndex]);
    intervalsIds[targetIndex] = null;
  }
}

/**
 * Moves the character to the left.
 */
function moveLeft() {
  if (world.character.x > 0) {
    world.character.handleMoveLeft();
  }
}

/**
 * Checks if the game is in fullscreen mode.
 *
 * @returns {boolean} True if in fullscreen mode, false otherwise.
 */
function isFullscreen() {
  return (
    document.fullscreenElement != null ||
    document.webkitFullscreenElement != null ||
    document.msFullscreenElement != null
  );
}

/**
 * Opens the game in fullscreen mode.
 *
 * @param {HTMLElement} elem - The element to display in fullscreen.
 */
function openFullscreen(elem) {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) {
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) {
    elem.msRequestFullscreen();
  }
}

/**
 * Sets an interval that can be stopped later.
 *
 * @param {Function} fn - The function to execute at each interval.
 * @param {number} time - The interval time in milliseconds.
 */
function setStoppableInterval(fn, time) {
  let id = setInterval(fn, time);
  intervalsIds.push(id);
}

/**
 * Closes the fullscreen mode.
 */
function closeFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen();
  }
}

/**
 * Moves the character to the right.
 */
function moveRight() {
  if (world.character.x < world.level.level_end_x) {
    world.character.handleMoveRight();
  }
}

/**
 * Restarts the game.
 */
function restartgame() {
  stopGame();
  init();
  world.ctx.clearRect(0, 0, canvas.width, canvas.height);
  world = new World(canvas, keyboard);
  document.querySelector(".gameovercontainer").classList.add("d-none");
  document.querySelector(".intro").classList.add("d-none");
  document.querySelector(".outro").classList.add("d-none");
  document.getElementById("canvas").classList.remove("d-none");
  document.getElementById("start").style.display = "none";
  restartgamepart2();
}

/**
 * Additional steps to restart the game.
 */
function restartgamepart2() {
  world.level.enemies.forEach((enemy) => {
    if (enemy instanceof Chicken) {
      enemy.animatechickens();
    }
  });
  world.level.Cloud.forEach((cloud) => {
    cloud.animate();
  });
  setStoppableInterval(checkgamestatus, 40);
  if (world.background_audio) {
    world.background_audio.currentTime = 0;
    world.background_audio.play();
  }
}

/**
 * Draws the game on the canvas.
 */
function drawgame() {
  document.getElementById('reload').classList.remove('d-none');
  document.querySelector(".intro").classList.add("d-none");
  document.getElementById("start").classList.add("d-none");
  document.getElementById("canvas").classList.remove("d-none");
  init();
  checkgamestatus();
  document.getElementById("mutebutton").classList.remove("d-none");
}

/**
 * Reloads the game.
 */
function reloadgame() {
  restartgame();
}

/**
 * Shows the game controls.
 */
function showcontrolls() {
  document.querySelector(".buttonscontainer").classList.remove("d-none");
  document.querySelector(".buttonscontainer").children[0].classList.add("closing");
  document.querySelector(".buttonscontainer").style =
    "flex-direction: column;justify-content: flex-start;gap: 190px;position: absolute;max-width: 720px; width: 100%;background-color: rgba(0, 0, 0, 0.5);height: 100%;top: 0px;z-index: 9999";
}

/**
 * Shows the story overlay.
 */
function showstory() {
  document.querySelector(".storydiv").classList.remove("d-none");
}

/**
 * Closes the story overlay.
 */
function closeinfotext() {
  document.querySelector(".storydiv").classList.add("d-none");
}

/**
 * Closes the control overlay.
 */
function closeoverlay() {
  document.querySelector(".buttonscontainer").style = "";
  document.querySelector(".buttonscontainer").classList.add("d-none");
  document.querySelector(".closing:hover").classList.remove("closing:hover");
}

/**
 * Displays the win screen.
 */
function winscreen() {
  document.getElementById("outroimg").src = "img/9_intro_outro_screens/win/win_2.png";
  setTimeout(() => {
    world.clearAllIntervals();
    world.background_audio.pause();
  }, 200);
  document.querySelector(".outro").style.position = "absolute";
  document.querySelector(".outro").classList.remove("d-none");
}

/**
 * Handles the boss death event.
 */
function bossdeath() {
  world.enemyboss.death();
  setTimeout(() => {
    document.querySelector(".gameovercontainer").classList.remove("d-none");
    winscreen();
    world.character.snooring_sound.pause();
  }, 1500);
}

/**
 * Checks the game status.
 */
function checkgamestatus() {
  if (world.enemybosshealthbar.percentage == 0) {
    bossdeath();
  }
  if (world.character.energy == 0) {
    characterdeath();
  }
}

/**
 * Handles the character death event.
 */
function characterdeath() {
  world.background_audio.pause();
  world.character.death_sound.play();
  gameoverpart1();
  world.character.death();
  setTimeout(() => {
    document.querySelector(".outro").classList.remove("d-none");
    world.clearAllIntervals();
  }, 1500);
  document.querySelector(".gameovercontainer").classList.remove("d-none");
}

/**
 * Toggles the background music.
 */
function closemusic() {
  if (world.background_audio.paused) {
    document.getElementById("audioicon").src = "img/icons8-audio-32.png";
    world.background_audio.play();
  } else {
    document.getElementById("audioicon").src = "img/icons8-no-audio-32.png";
    world.background_audio.pause();
    pausemusic();
  }
}

/**
 * Pauses the background music.
 */
function pausemusic() {
  setInterval(() => {
    if (world.character.jumping_sound.play()) {
      world.character.jumping_sound.pause();
    }
    if (world.character.hurt_sound.play()) {
      world.character.hurt_sound.pause();
    }
    if (world.character.death_sound.play()) {
      world.character.death_sound.pause();
    }
    pausemusicpart2();
  }, 1000 / 200);
}

/**
 * Additional steps to pause the background music.
 */
function pausemusicpart2() {
  if (world.character.snooring_sound.play()) {
    world.character.snooring_sound.pause();
  }
  if (world.background_audio.play()) {
    world.background_audio.pause();
  }
  if (world.character.walking_sound.play()) {
    world.character.walking_sound.pause();
  }
  if (world.movableObject.deadchicken_audio.play) {
    world.movableObject.deadchicken_audio.pause();
  }
}

/**
 * Returns to the main menu.
 */
function returntomenu() {
  document.getElementById('start').style.display = 'flex';
  world.clearAllIntervals();
  world.character.walking_sound.pause();
  world.character.jumping_sound.pause();
  world.character.hurt_sound.pause();
  world.character.death_sound.pause();
  world.character.snooring_sound.pause();
  world.background_audio.pause();
  document.querySelector(".gameovercontainer").classList.add("d-none");
  document.querySelector(".intro").classList.add("d-none");
  document.getElementById("canvas").classList.add("d-none");
  returntomenupart2();
}

/**
 * Additional steps to return to the main menu.
 */
function returntomenupart2() {
  document.querySelector(".outro").classList.add("d-none");
  document.querySelector(".intro").classList.remove("d-none");
  document.querySelector(".btn").classList.remove("d-none");
  if (world && world.ctx && canvas) {
    setInterval(() => {
      world.ctx.clearRect(0, 0, 720, 480);
    }, 0);
  }
  if (world && world.stopAnimation) {
    world.stopAnimation();
  }
  document.getElementById('startbutton').onclick = restartgame;
}

/**
 * Toggles the device rotation.
 */
function togglerotation() {
  deviceToggled = true;
}

/**
 * Detects if the current device is in mobile emulator mode.
 * Accounts for both portrait and landscape orientations.
 * @returns {boolean} True if in mobile emulator mode, false otherwise.
 */
function isEmulatingMobile() {
  const isMobileWidth = window.innerWidth <= 768;
  const isMobileHeight = window.innerHeight <= 480; // Check for small height (landscape)
  const isMobileUserAgent = navigator.userAgent.toLowerCase().includes("mobi");

  return (isMobileWidth || isMobileHeight) && isMobileUserAgent;
}

/**
 * Checks if the window size has changed and calls the emulator adjustment logic.
 */
function checkorientation() {
  const currentWidth = window.innerWidth;
  const currentHeight = window.innerHeight;
  if (currentWidth !== lastWidth || currentHeight !== lastHeight) {
    checkemulator(currentWidth, currentHeight);
    lastWidth = currentWidth;
    lastHeight = currentHeight;
  } else {
    checkemulator(currentWidth, currentHeight);
  }
}

/**
 * Handles layout adjustments based on emulator mode and orientation.
 * @param {number} currentWidth - The current window width.
 * @param {number} currentHeight - The current window height.
 */
function checkemulator(currentWidth, currentHeight) {
  if (isEmulatingMobile()) {
    if (currentWidth > currentHeight) {
      landscapemode();
    } else {
      portraitmode();
    }
  } else {
    nonmobilemode();
  }
}

/**
 * Adjusts the layout for non-mobile mode.
 */
function nonmobilemode() {
  document.getElementById('canvas').style.height = 'unset';
  document.querySelector('body').style = '';
  document.querySelector('.box').style.height = 'calc(100vh - 41px)';
  document.querySelector(".box h1").classList.remove('d-none');
  document.getElementById("impressum").classList.remove("d-none");
  document.querySelector('.Instructions').style.display = 'none';
  document.getElementById("introimg").classList.remove("rotatepic");
  document.getElementById("introimg").src = "img/9_intro_outro_screens/start/startscreen_2.png";
}

/**
 * Adjusts the layout for landscape mode.
 */
function landscapemode() {
  document.querySelector('.Instructions').style.display = 'flex';
  document.getElementById('content').style = 'height: 97%;width: 85vw;';
  document.querySelector('body').style = '';
  document.querySelector('body').style.height = '96.2vh';
  const canvas = document.querySelector('canvas');
  canvas.style.height = "60vh";
  canvas.style.width = 'height: 59vh;';
  document.querySelector('.boxalign').style.height = '94%';
  document.querySelector(".box").style.height = "100%";
  document.querySelector(".box h1").classList.add("d-none");
  document.getElementById("impressum").classList.add("d-none");
  document.getElementById("introimg").src = "img/9_intro_outro_screens/start/startscreen_2.png";
  document.getElementById("introimg").classList.remove("rotatepic");
}

/**
 * Adjusts the layout for portrait mode.
 */
function portraitmode() {
  document.getElementById('content').style = 'height: 97%';
  document.querySelector('.Instructions').style.display = 'none';
  const calculatedHeight = (window.innerHeight / window.screen.height) * 100;
  document.querySelector('body').style = 'height: 100vh;position: fixed;background: black;';
  document.getElementById("impressum").classList.add("d-none");
  document.getElementById("introimg").src = "img/rotate.png";
  document.getElementById("introimg").classList.add("rotatepic");
}

window.addEventListener("resize", checkorientation);

/**
 * Displays the game over screen.
 */
function gameoverpart1() {
  document.getElementById("outroimg").src = "img/9_intro_outro_screens/game_over/game_over.png";
  world.character.snooring_sound.pause();
  document.querySelector('.outro').style.zIndex = '99';
  document.querySelector(".outro").style.position = "absolute";
  document.getElementById("outroimg").classList.remove("d-none");
}

/**
 * Adds an event listener to handle keydown events and execute corresponding functions 
 * based on the key pressed.
 * 
 * Key mappings:
 * - Left Arrow (keyCode 37): Calls `leftkeydown()`.
 * - Up Arrow (keyCode 38): Calls `upkeydown()`.
 * - Right Arrow (keyCode 39): Calls `rightkeydown()`.
 * - Down Arrow (keyCode 40): Calls `downkeydown()`.
 * - Space (keyCode 32): Calls `spacekeydown()`.
 * - 'D' Key (keyCode 68): Sets `keyboard.D` to true.
 */
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
/**
 * Handles the space key down event.
 */
function spacekeydown() {
  keyboard.SPACE = true;
}

/**
 * Handles the down arrow key down event.
 */
function downkeydown() {
  keyboard.DOWN = true;
}

/**
 * Handles the left arrow key down event.
 */
function leftkeydown() {
  keyboard.LEFT = true;
}

/**
 * Handles the up arrow key down event.
 */
function upkeydown() {
  keyboard.UP = true;
}

/**
 * Handles the right arrow key down event.
 */
function rightkeydown() {
  keyboard.RIGHT = true;
}

/**
 * Adds an event listener to handle keyup events and execute corresponding functions 
 * based on the key pressed.
 * 
 * Key mappings:
 * - Left Arrow (keyCode 37): Calls `leftkeyup()`.
 * - Up Arrow (keyCode 38): Calls `upkeyup()`.
 * - Right Arrow (keyCode 39): Calls `rightkeyup()`.
 * - Down Arrow (keyCode 40): Calls `downkeyup()`.
 * - Space (keyCode 32): Calls `spacekeyup()`.
 * - 'D' Key (keyCode 68): Calls `dkeyup()`.
 */
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

/**
 * Handles the 'D' key up event.
 */
function dkeyup() {
  keyboard.D = false;
}

/**
 * Handles the space key up event.
 */
function spacekeyup() {
  keyboard.SPACE = false;
}

/**
 * Handles the down arrow key up event.
 */
function downkeyup() {
  keyboard.DOWN = false;
}

/**
 * Handles the left arrow key up event.
 */
function leftkeyup() {
  keyboard.LEFT = false;
}

/**
 * Handles the right arrow key up event.
 */
function rightkeyup() {
  keyboard.RIGHT = false;
}

/**
 * Handles the up arrow key up event.
 */
function upkeyup() {
  keyboard.UP = false;
}