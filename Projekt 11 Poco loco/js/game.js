let canvas;
let world;
let coins;
let throwableobject = new ThrowableObject();
let keyboard = new Keyboard();
let intervalsIds = [];
let lastWidth = window.innerWidth;
let lastHeight = window.innerHeight;
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
 * Pauses the background music and character sounds safely.
 */
function pausemusic() {
  setInterval(() => {
    safelyPauseAudio(world.character.jumping_sound);
    safelyPauseAudio(world.character.hurt_sound);
    safelyPauseAudio(world.character.death_sound);
    pausemusicpart2();
  }, 0);
}

/**
 * Additional steps to pause the background music.
 */
function pausemusicpart2() {
  safelyPauseAudio(world.character.snooring_sound);
  safelyPauseAudio(world.background_audio);
  safelyPauseAudio(world.character.walking_sound);

  world.level.enemies.forEach(enemy => {
    if (enemy.deadchicken_audio) {
      safelyPauseAudio(enemy.deadchicken_audio);
    }
  });
}

/**
 * Safely plays and pauses audio using Promises to prevent errors.
 * @param {HTMLMediaElement} audio - The audio element to pause.
 */
function safelyPauseAudio(audio) {
  if (audio && typeof audio.play === 'function' && typeof audio.pause === 'function') {
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playpromise(playPromise,audio)
    } else {
      // If playPromise is undefined, directly pause the audio.
      if (!audio.paused) {
        audio.pause();
      }
    }
  } else {
    console.warn('Invalid audio element:', audio);
  }
}

/**
 * Handles the play promise for an audio element and pauses it if playback starts successfully.
 *
 * @param {Promise} playPromise - The promise returned by the play() method of the audio element.
 * @param {HTMLMediaElement} audio - The audio element to pause.
 */
function playpromise(playPromise,audio) {
  playPromise
    .then(() => {
      // Playback started successfully, now we pause it.
      if (!audio.paused) {
        audio.pause();
      }
    })
    .catch(error => {
      // If play() fails (e.g., auto-play restrictions), handle it gracefully.
      console.warn('Audio play was prevented or interrupted:', error);
    });
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
function mobile() {
  isMobileUserAgent = window.navigator.maxTouchPoints === 1
  return isMobileUserAgent;
}

