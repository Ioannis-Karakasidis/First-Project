let canvas;
let world;
let coins;
let throwableobject = new ThrowableObject();
let keyboard = new Keyboard();
let intervalsIds = [];
let lastWidth = window.innerWidth;
let lastHeight = window.innerHeight;
let i = 1;

function init() {
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);
  setStoppableInterval(checkgamestatus, 40);
}

function throwSalsaBottles() {
  world.throwSalsaBottle();
}

function jump() {
  world.character.jump();
}

function fullscreen() {
  let fullscreenElement = document.getElementById("content");
  if (isFullscreen()) {
    closeFullscreen();
  } else {
    openFullscreen(fullscreenElement);
  }
}

function stopGame() {
  intervalsIds.forEach(clearInterval);
  intervalsIds = [];
}

function stopSpecificGame(targetIndex) {
  if (intervalsIds[targetIndex]) {
    clearInterval(intervalsIds[targetIndex]);
    intervalsIds[targetIndex] = null;
  }
}

function moveLeft() {
  if (world.character.x > 0) {
    world.character.handleMoveLeft();
  }
}

function isFullscreen() {
  return (
    document.fullscreenElement != null ||
    document.webkitFullscreenElement != null ||
    document.msFullscreenElement != null
  );
}

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

function closeFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen();
  }
}

function moveRight() {
  if (world.character.x < world.level.level_end_x) {
    world.character.handleMoveRight();
  }
}

function restartgame() {
  world.ctx.clearRect(0, 0, canvas.width, canvas.height);
  init();
  world.level.enemies.forEach((enemy) => {
    if (enemy instanceof Chicken) {
      enemy.animatechickens();
    }
  });

  world.level.enemies.forEach((enemy) => {
    if (enemy instanceof Chicken) {
      enemy.animatechickens();
    }
  });
  world.level.Cloud.forEach((cloud) => {
    cloud.animate();
  });
  world = new World(canvas, keyboard);
  setInterval(() => {
    if (world.character.energy === 0) {
      world.character.death();
      checkgamestatus();
    }
  }, 40);

  document.querySelector(".gameovercontainer").classList.add("d-none");
  document.querySelector(".intro").classList.add("d-none");
  document.querySelector(".outro").classList.add("d-none");

  document.getElementById("canvas").classList.remove("d-none");
}

function drawgame() {
  document.querySelector(".intro").classList.add("d-none");
  document.getElementById("start").classList.add("d-none");
  this.init();
  document.getElementById("canvas").classList.remove("d-none");
  checkgamestatus();
  document.getElementById("mutebutton").classList.remove("d-none");
}

function stopAudio(audio) {
  audio.pause();
  audio.currentTime = 0;
}

function showcontrolls() {
  document.querySelector(".buttonscontainer").classList.remove("d-none");
  document
    .querySelector(".buttonscontainer")
    .children[0].classList.add("closing");
  document.querySelector(".buttonscontainer").style =
    "flex-direction: column;justify-content: flex-start;gap: 190px;position: absolute;max-width: 720px; width: 100%;background-color: rgba(0, 0, 0, 0.5);height: 100%;top: 0px;z-index: 9999";
}

function showstory() {
  document.querySelector(".storydiv").classList.remove("d-none");
}

function closeinfotext() {
  document.querySelector(".storydiv").classList.add("d-none");
}

function closeoverlay() {
  document.querySelector(".buttonscontainer").style = "";
  document.querySelector(".buttonscontainer").classList.add("d-none");
  document.querySelector(".closing:hover").classList.remove("closing:hover");
}

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

function checkgamestatus() {
  if (world.enemybosshealthbar.percentage == 0) {
    world.enemyboss.death();
    setTimeout(() => {
      document.querySelector(".gameovercontainer").classList.remove("d-none");
      winscreen();
      world.character.snooring_sound.pause();
    }, 1500);
  }
  if (world.character.energy == 0) {
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
}

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

function pausemusic() {
  world.character.jumping_sound.pause();
  world.character.hurt_sound.pause();
  world.character.death_sound.pause();
  world.character.snooring_sound.pause();
  world.background_audio.pause();
}

function returntomenu() {
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
}

function togglerotation() {
  deviceToggled = true;

}
function isEmulatingMobile() {
  const isMobileWidth = window.innerWidth <= 768; 
  const isMobileUserAgent = navigator.userAgent.toLowerCase().includes("mobi"); 

  return isMobileWidth && isMobileUserAgent;
}

window.addEventListener("resize", () => {
  const currentWidth = window.innerWidth;
  const currentHeight = window.innerHeight;
  checkemulator(currentWidth,currentHeight)
  lastWidth = currentWidth;
  lastHeight = currentHeight;
});

function checkemulator(currentWidth,currentHeight) {
  if (isEmulatingMobile()) {
    if (lastWidth !== currentWidth || lastHeight !== currentHeight) {
      if (currentWidth > currentHeight) {
        document.getElementById('introimg').src = 'img/9_intro_outro_screens/start/startscreen_2.png';
        document.getElementById('introimg').classList.remove('rotatepic');
      } else {
        document.getElementById('introimg').src = 'img/rotate.png';
        document.getElementById('introimg').classList.add('rotatepic');
        document.querySelector('.box h1').style.display = 'none'
      }
    }

  } else {
    document.getElementById('introimg').classList.remove('rotatepic');
    document.getElementById('introimg').src = 'img/9_intro_outro_screens/start/startscreen_2.png';

  }
}

function gameoverpart1() {
  document.getElementById("outroimg").src =
    "img/9_intro_outro_screens/game_over/game_over.png";
  world.character.snooring_sound.pause();
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
