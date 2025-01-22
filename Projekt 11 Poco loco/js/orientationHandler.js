/**
 * Checks if the window size has changed and calls the emulator adjustment logic.
 */
function checkorientation() {
  const currentWidth = window.innerWidth;
  const currentHeight = window.innerHeight;
  if (currentWidth && currentHeight) {
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
async function checkemulator(currentWidth, currentHeight) {
  if (mobile()) {
    if (currentWidth > currentHeight) {
      await landscapemode();
    } else {
      await portraitmode();
    }
  } else {
    await nonmobilemode();
  }
}

/**
 * Adjusts the layout for non-mobile mode.
 */
async function nonmobilemode() {
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
async function landscapemode() {
  if (document.querySelector('.Instructions') && document.getElementById('content')) {
    document.querySelector('.Instructions').style.display = 'flex';
    document.getElementById('content').style = 'height: 97%;width: 85vw;';
    document.querySelector('body').style = '';
    document.querySelector('body').style.height = '100vh';
    const canvas = document.querySelector('canvas');
    canvas.style.width = 'height: 59vh;';
    document.querySelector('.boxalign').style.height = '94%';
    document.querySelector(".box").style.height = "77%";
    document.querySelector(".box h1").classList.add("d-none");
    document.getElementById("impressum").classList.add("d-none");
    document.getElementById("introimg").src = "img/9_intro_outro_screens/start/startscreen_2.png";
    document.getElementById("introimg").classList.remove("rotatepic");
  }
}

/**
 * Adjusts the layout for portrait mode.
 */
async function portraitmode() {
  document.querySelector('.box h1').style.display = 'none'
  document.getElementById('content').style = 'height: 97%';
  document.querySelector('.Instructions').style.display = 'none';
  const calculatedHeight = (window.innerHeight / window.screen.height) * 100;
  document.querySelector('body').style = 'height: 100vh;position: fixed;background: black;width: 100vw;margin: 0;';
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

function checkrightbutton() {
  document.getElementById('rightbuttonmobile').addEventListener('touchstart', function (e) {
    e.preventDefault();

    keyboard.RIGHT = true;
  })
  document.getElementById('rightbuttonmobile').addEventListener('touchend', function (e) {
    e.preventDefault;
    keyboard.RIGHT = false;
  })

}

function checkleftbutton() {
  document.getElementById('leftbuttonmobile').addEventListener('touchstart', function (e) {
    e.preventDefault();
    keyboard.LEFT = true;
  })
  document.getElementById('leftbuttonmobile').addEventListener('touchend', function (e) {
    e.preventDefault();
    keyboard.LEFT = false;
  })

}

function checkjumpbutton() {
  document.getElementById('upbuttonmobile').addEventListener('touchstart', function (e) {
    e.preventDefault();
    keyboard.UP = true;
  })
  document.getElementById('upbuttonmobile').addEventListener('touchend', function (e) {
    e.preventDefault();
    keyboard.UP = false;
  })
}

function checkjumpbuttonpart2() {
  document.getElementById('jump').addEventListener('touchstart', function (e) {
    e.preventDefault();
    keyboard.UP = true;
  })
  document.getElementById('jump').addEventListener('touchend', function (e) {
    e.preventDefault();
    keyboard.UP = false;
  })
}

function checkthrowsalsa() {
  document.getElementById('throwsalsa').addEventListener('touchstart', function (e) {
    e.preventDefault();
    keyboard.D = true;
  })
  document.getElementById('throwsalsa').addEventListener('touchend', function (e) {
    e.preventDefault();
    keyboard.D = false;
  })
}

function checkmobile() {
  setInterval(() => {
    checkrightbutton();
    checkleftbutton();
    checkjumpbutton();
    checkjumpbuttonpart2();
    checkthrowsalsa()
  }, 0);
}

