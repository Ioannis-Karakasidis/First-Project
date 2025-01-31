let canvas;
let world;
let coins;
let keyboard = new Keyboard();
let lastWidth = window.innerWidth;
let lastHeight = window.innerHeight;
let mute = false;
let intervalsIds = [];
let win_audio = new Audio("audio/mixkit-retro-game-notification-212.wav");
let gameover_audio = new Audio("audio/mixkit-retro-arcade-lose-2027.wav");
let mobilestart = false;

/**
 * Initializes the game.
 */
function initializeGame() {
  if (world) return;
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
function toggleFullscreenMode() {
  let fullscreenElement = document.getElementById("content");
  if (isFullscreen()) {
    exitFullscreen();
  } else {
    enterFullscreen(fullscreenElement);
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
function stopSpecificGame(targetIntervalId) {
  const index = intervalsIds.indexOf(targetIntervalId); // Find the index of the target ID
  if (index !== -1) { // If the ID exists in the array
    clearInterval(intervalsIds[index]); // Clear the interval
    intervalsIds[index] = null; // Remove the interval from the array
  } else {
    console.warn('Interval ID not found:', targetIntervalId);
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
function enterFullscreen(elem) {
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
  return id;
}

/**
 * Closes the fullscreen mode.
 */
function exitFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen();
  }
}

/**
 * Restarts the game.
 */
function restartgame() {
  let restartButton = document.getElementById("restartButton");
  if (restartButton) restartButton.disabled = true;
  stopGame();
  updatemobilevariable();
  if (world) {
    world.clearAllIntervals();
    world = null;
  }
  restartGameWithCooldown(restartButton);
}

/**
 * Restarts the game and prevents multiple rapid restarts.  
 * Disables the restart button temporarily to avoid spam clicks.
 */
function restartGameWithCooldown(restartButton) {
  initializeGame();
  setTimeout(() => {
    if (restartButton) restartButton.disabled = false;
  }, 1000);
  document.querySelector(".gameovercontainer").classList.add("d-none");
  document.querySelector(".intro").classList.add("d-none");
  document.querySelector(".outro").classList.add("d-none");
  document.getElementById("canvas").classList.remove("d-none");
  document.getElementById("start").style.display = "none";
}

/**
 * Displays the instructions for mobile users when the `mobilestart` flag is true.
 * 
 * This function checks the `mobilestart` variable, and if it is `true`,
 * it updates the `.Instructions` element's display style to make it visible.
 */
function updatemobilevariable() {
  if (mobilestart === true) {
    document.querySelector('.Instructions').style.display = 'flex'
  }
}

/**
 * Draws the game on the canvas.
 */
function drawgame() {
  updatemobilevariable()
  if (isMobileDevice()) {
    document.querySelector(".box").style.height = "70%";
  }
  document.getElementById('reload').classList.remove('d-none');
  document.querySelector(".intro").classList.add("d-none");
  document.getElementById("start").classList.add("d-none");
  document.getElementById("canvas").classList.remove("d-none");
  initializeGame();
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
function displayStoryOverlay() {
  document.querySelector(".storydiv").classList.remove("d-none");
}

/**
 * Closes the story overlay.
 */
function closeStoryOverlay() {
  document.querySelector(".storydiv").classList.add("d-none");
}

/**
 * Closes the control overlay.
 */
function closeControlOverlay() {
  document.querySelector(".buttonscontainer").style = "";
  document.querySelector(".buttonscontainer").classList.add("d-none");
  document.querySelector(".closing:hover").classList.remove("closing:hover");
}

/**
 * Displays the win screen.
 */
function winscreen() {
  win_audio.play();
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
function handleBossDeath() {
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
    handleBossDeath();
  }
  if (world.character.energy == 0) {
    characterdeath();
  }
}

/**
 * Handles the character death event.
 */
function characterdeath() {
  gameover();
  world.character.death_sound.play();
  world.character.death();

}

/**
 * Toggles the audio state and saves the mute state to localStorage.
 */
function closemusic() {
  const audioIcon = document.getElementById("audioicon");
  const audioSrc = audioIcon.getAttribute("src");
  if (audioSrc === "img/icons8-audio-32.png") {
    muteBackgroundAudio(audioIcon)
  } else if (audioSrc === "img/icons8-no-audio-32.png") {
    audioIcon.src = "img/icons8-audio-32.png";
    world.background_audio.play();
    mute = false;
  }
  localStorage.setItem("muteState", mute);
}

/**
 * Mutes the background audio and updates the audio icon to reflect the mute state.
 */
function muteBackgroundAudio(audioIcon) {
  audioIcon.src = "img/icons8-no-audio-32.png";
  if (mute = true) {
    world.background_audio.pause();
  }
  mute = true;
}

/**
 * Initializes the audio state based on the saved mute state in localStorage.
 */
function initializeAudioState() {
  const savedMuteState = localStorage.getItem("muteState");
  const audioIcon = document.getElementById("audioicon");
  if (savedMuteState === "true") {
    audioIcon.src = "img/icons8-no-audio-32.png";
    mute = true;
  } else {
    audioIcon.src = "img/icons8-audio-32.png";
    mute = false;
  }
}

/**
 * Adds an event listener to initialize the audio state when the DOM content is fully loaded.
 */

document.addEventListener("DOMContentLoaded", initializeAudioState);

/**
 * Returns to the main menu.
 */
function returntomenu() {
  document.querySelector('.Instructions').style.display = 'none'
  document.getElementById('start').style.display = 'flex';
  world.clearAllIntervals();
  document.querySelector(".gameovercontainer").classList.add("d-none");
  document.querySelector(".intro").classList.add("d-none");
  document.getElementById("canvas").classList.add("d-none");
  finalizeMainMenuReturn();
}

/**
 * Additional steps to return to the main menu.
 */
function finalizeMainMenuReturn() {
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
 * Detects if the current device is in mobile emulator mode.
 * Accounts for both portrait and landscape orientations.
 * @returns {boolean} True if in mobile emulator mode, false otherwise.
 */
function isMobileDevice() {
  return /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
}



