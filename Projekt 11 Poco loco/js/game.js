/**
 * Description placeholder
 *
 * @type {*}
 */
let canvas;
/**
 * Description placeholder
 *
 * @type {*}
 */
let world;
/**
 * Description placeholder
 *
 * @type {*}
 */
let coins;
/**
 * Description placeholder
 *
 * @type {*}
 */
let throwableobject = new ThrowableObject();
/**
 * Description placeholder
 *
 * @type {*}
 */
let keyboard = new Keyboard();
/**
 * Description placeholder
 *
 * @type {{}}
 */
let intervalsIds = [];
/**
 * Description placeholder
 *
 * @type {*}
 */
let lastWidth = window.innerWidth;
/**
 * Description placeholder
 *
 * @type {*}
 */
let lastHeight = window.innerHeight;
/**
 * Description placeholder
 *
 * @type {*}
 */
let isMobileUserAgent = navigator.userAgent.toLowerCase().includes("mobi");

/**
 * Description placeholder
 *
 * @type {number}
 */
let i = 1;

function init() {
  canvas = document.getElementById("canvas");
  initleve1()
  world = new World(canvas, keyboard);
  setStoppableInterval(checkgamestatus, 40);
}

/** Description placeholder */
function throwSalsaBottles() {
  world.throwSalsaBottle();
}

/** Description placeholder */
function jump() {
  world.character.jump();
}

/** Description placeholder */
function fullscreen() {
  let fullscreenElement = document.getElementById("content");
  if (isFullscreen()) {
    closeFullscreen();
  } else {
    openFullscreen(fullscreenElement);
  }
}

/** Description placeholder */
function stopGame() {
  intervalsIds.forEach(clearInterval);
  intervalsIds = [];
}

/**
 * Description placeholder
 *
 * @param {*} targetIndex 
 */
function stopSpecificGame(targetIndex) {
  if (intervalsIds[targetIndex]) {
    clearInterval(intervalsIds[targetIndex]);
    intervalsIds[targetIndex] = null;
  }
}

/** Description placeholder */
function moveLeft() {
  if (world.character.x > 0) {
    world.character.handleMoveLeft();
  }
}

/**
 * Description placeholder
 *
 * @returns {boolean} 
 */
function isFullscreen() {
  return (
    document.fullscreenElement != null ||
    document.webkitFullscreenElement != null ||
    document.msFullscreenElement != null
  );
}

/**
 * Description placeholder
 *
 * @param {*} elem 
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



function setStoppableInterval(fn, time) {
  let id = setInterval(fn, time);
  intervalsIds.push(id);
}

/** Description placeholder */
function closeFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen();
  }
}

/** Description placeholder */
function moveRight() {
  if (world.character.x < world.level.level_end_x) {
    world.character.handleMoveRight();
  }
}

function restartgame() {
  stopGame();
  init()
  world.ctx.clearRect(0, 0, canvas.width, canvas.height);
  world = new World(canvas, keyboard);
  document.querySelector(".gameovercontainer").classList.add("d-none");
  document.querySelector(".intro").classList.add("d-none");
  document.querySelector(".outro").classList.add("d-none");
  document.getElementById("canvas").classList.remove("d-none");
  document.getElementById("start").style.display = "none";
  restartgamepart2()
}

/** Description placeholder */
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

/** Description placeholder */
function drawgame() {
  document.getElementById('reload').classList.remove('d-none')
  document.querySelector(".intro").classList.add("d-none");
  document.getElementById("start").classList.add("d-none");
  document.getElementById("canvas").classList.remove("d-none");
  init()
  checkgamestatus();
  document.getElementById("mutebutton").classList.remove("d-none");
}

/** Description placeholder */
function reloadgame() {
  restartgame()
}

/** Description placeholder */
function showcontrolls() {
  document.querySelector(".buttonscontainer").classList.remove("d-none");
  document
    .querySelector(".buttonscontainer")
    .children[0].classList.add("closing");
  document.querySelector(".buttonscontainer").style =
    "flex-direction: column;justify-content: flex-start;gap: 190px;position: absolute;max-width: 720px; width: 100%;background-color: rgba(0, 0, 0, 0.5);height: 100%;top: 0px;z-index: 9999";
}

/** Description placeholder */
function showstory() {
  document.querySelector(".storydiv").classList.remove("d-none");
}

/** Description placeholder */
function closeinfotext() {
  document.querySelector(".storydiv").classList.add("d-none");
}

/** Description placeholder */
function closeoverlay() {
  document.querySelector(".buttonscontainer").style = "";
  document.querySelector(".buttonscontainer").classList.add("d-none");
  document.querySelector(".closing:hover").classList.remove("closing:hover");
}

/** Description placeholder */
function winscreen() {
  document.getElementById("outroimg").src =
    "img/9_intro_outro_screens/win/win_2.png";
  setTimeout(() => {
    world.clearAllIntervals();
    world.background_audio.pause();
  }, 200);
  document.querySelector(".outro").style.position = "absolute";
  document.querySelector(".outro").classList.remove("d-none");
}

function bossdeath() {
  world.enemyboss.death();
  setTimeout(() => {
    document.querySelector(".gameovercontainer").classList.remove("d-none");
    winscreen();
    world.character.snooring_sound.pause();
  }, 1500);
}

/** Description placeholder */
function checkgamestatus() {
  if (world.enemybosshealthbar.percentage == 0) {
    bossdeath()
  }
  if (world.character.energy == 0) {
    characterdeath()
  }
}

/** Description placeholder */
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

/** Description placeholder */
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

/** Description placeholder */
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

/** Description placeholder */
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

/** Description placeholder */
function returntomenu() {
  document.getElementById('start').style.display = 'flex'
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
  returntomenupart2()
}

/** Description placeholder */
function returntomenupart2() {
  document.querySelector(".outro").classList.add("d-none");
  document.querySelector(".intro").classList.remove("d-none");
  document.querySelector(".btn").classList.remove("d-none");
  if (world && world.ctx && canvas) {
    setInterval(() => {
      world.ctx.clearRect(0, 0, 720, 480);
    }, 0);
  } else {
  }
  if (world && world.stopAnimation) {
    world.stopAnimation();
  }
  document.getElementById('startbutton').onclick = restartgame;
}

/** Description placeholder */
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
      landscapemode()
    } else {
      portraitmode()
    }
  } else {
    nonmobilemode()
  }
}

function nonmobilemode() {
  document.getElementById('canvas').style.height = 'unset'
  document.querySelector('body').style = ''
  document.querySelector('.box').style.height = 'calc(100vh - 41px)'
  document.querySelector(".box h1").classList.remove('d-none')
  document.getElementById("impressum").classList.remove("d-none");
  document.querySelector('.Instructions').style.display = 'none'
  document.getElementById("introimg").classList.remove("rotatepic");
  document.getElementById("introimg").src =
    "img/9_intro_outro_screens/start/startscreen_2.png";
}

function landscapemode() {
  document.querySelector('.Instructions').style.display = 'flex'
  document.getElementById('content').style = 'height: 97%;width: 85vw;'
  document.querySelector('body').style = ''
  document.querySelector('body').style.height = '96.2vh'
  const canvas = document.querySelector('canvas');
  canvas.style.height = "60vh";
  canvas.style.width = 'height: 59vh;'
  document.querySelector('.boxalign').style.height = '94%'
  document.querySelector(".box").style.height = "100%";
  document.querySelector(".box h1").classList.add("d-none");
  document.getElementById("impressum").classList.add("d-none");
  document.getElementById("introimg").src =
    "img/9_intro_outro_screens/start/startscreen_2.png";
  document.getElementById("introimg").classList.remove("rotatepic");
}

function portraitmode() {
  document.getElementById('content').style = 'height: 97%'
  document.querySelector('.Instructions').style.display = 'none'
  const calculatedHeight = (window.innerHeight / window.screen.height) * 100;
  document.querySelector('body').style = 'height: 100vh;position: fixed;background: black;'
  document.getElementById("impressum").classList.add("d-none");
  document.getElementById("introimg").src = "img/rotate.png";
  document.getElementById("introimg").classList.add("rotatepic");
}

window.addEventListener("resize", checkorientation);

/** Description placeholder */
function gameoverpart1() {
  document.getElementById("outroimg").src =
    "img/9_intro_outro_screens/game_over/game_over.png";
  world.character.snooring_sound.pause();
  document.querySelector('.outro').style.zIndex = '99'
  document.querySelector(".outro").style.position = "absolute";
  document.getElementById("outroimg").classList.remove("d-none");
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

/** Description placeholder */
function spacekeydown() {
  keyboard.SPACE = true;
}

/** Description placeholder */
function downkeydown() {
  keyboard.DOWN = true;
}

/** Description placeholder */
function leftkeydown() {
  keyboard.LEFT = true;
}

/** Description placeholder */
function upkeydown() {
  keyboard.UP = true;
}

/** Description placeholder */
function rightkeydown() {
  keyboard.RIGHT = true;
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

/** Description placeholder */
function dkeyup() {
  keyboard.D = false;
}

/** Description placeholder */
function spacekeyup() {
  keyboard.SPACE = false;
}

/** Description placeholder */
function downkeyup() {
  keyboard.DOWN = false;
}

/** Description placeholder */
function leftkeyup() {
  keyboard.LEFT = false;
}

/** Description placeholder */
function rightkeyup() {
  keyboard.RIGHT = false;
}

/** Description placeholder */
function upkeyup() {
  keyboard.UP = false;
}
