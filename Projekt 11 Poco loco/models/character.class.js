class Character extends MovableObject {
  height = 280;
  y = 150;
  speed = 10;
  characterarrays = new Characterarrays();
  world;
  walking_sound = new Audio("audio/528953_3302313-lq.mp3");
  jumping_sound = new Audio("audio/mixkit-video-game-spin-jump-2648.wav");
  hurt_sound = new Audio("audio/mixkit-man-in-pain-2197.wav");
  death_sound = new Audio("audio/male-death-sound-128357.mp3");
  snooring_sound = new Audio("audio/snoring-sound-effect-55854.mp3");

  constructor() {
    super().loadImage("img/2_character_pepe/2_walk/W-21.png");
    this.loadingimages();
    this.stopintervals();
    this.initializecharacter();
  }

  loadingimages() {
    this.loadImages(this.characterarrays.IMAGES_WALKING);
    this.loadImages(this.characterarrays.IMAGES_JUMPING);
    this.loadImages(this.characterarrays.IMAGES_DEATH);
    this.loadImages(this.characterarrays.IMAGES_HURT);
    this.loadImages(this.characterarrays.IMAGES_IDLE);
    this.loadImages(this.characterarrays.IMAGES_LONG_IDLE);
  }

  stopintervals() {
    setStoppableInterval(() => this.movementandcamera(), 80);
    setStoppableInterval(() => this.walking(), 80);
    setStoppableInterval(() => this.jumping(), 80);
    setStoppableInterval(() => this.sleepinganimation(), 200);
    setStoppableInterval(() => this.snooringanimation(), 400); // Long idle
  }

  initializecharacter() {
    this.x = 120;
    this.currentPosition = 120;
    this.lastMoveTime = Date.now();
    this.applyGravity();
    this.animate();
  }

  handleMoveRight() {
    this.moveRight();
    this.otherDirection = false;
    if (this.walking_sound.paused) {
      this.walking_sound.play();
    }
  }

  handleMoveLeft() {
    this.moveLeft();
    this.otherDirection = true;
    if (this.walking_sound.paused) {
      this.walking_sound.play();
    }
  }

  updateMovementAndCamera() {
    this.walking_sound.pause();
    if (
      this.world &&
      this.world.keyboard.RIGHT &&
      this.x < this.world.level.level_end_x
    ) {
      this.handleMoveRight();
      this.snooring_sound.pause();
    }
    if (this.world && this.world.keyboard.LEFT && this.x > 0) {
      this.handleMoveLeft();
    }
    this.handleJumpAndCamera();
  }

  handleJumpAndCamera() {
    if (
      this.world &&
      (this.world.keyboard.SPACE || this.world.keyboard.UP) &&
      !this.isAboveGround()
    ) {
      this.jumping_sound.play();
      this.jump();
    }
    if (this.world) {
      this.world.camera_x = -this.x + 100;
    }
  }

  movementandcamera() {
    console.log("Character is moving.");
    this.updateMovementAndCamera();
  }

  animate() {
    this.movementandcamera();
    this.characteranimation();
  }

  characteranimation() {
    console.log("Updating character animation.");
    this.updateCharacterAnimation();
  }

  sleepinganimation() {
    console.log(`Current X: ${this.x}, Last Position: ${this.currentPosition}`);
    console.log(`Time Since Last Move: ${Date.now() - this.lastMoveTime}ms`);

    // Check if character hasn't moved and sufficient time has passed
    if (
      this.x === this.currentPosition &&
      Date.now() - this.lastMoveTime >= 500 // Idle for 1.5 seconds
    ) {
      console.log("Character is idle. Triggering idle animation.");
      this.idleanimation(); // Trigger idle animation
    } else {
      // Update position and time only when character moves
      if (this.x !== this.currentPosition) {
        console.log("Character has moved. Updating position and time.");
        this.currentPosition = this.x;
        this.lastMoveTime = Date.now();
      } else {
        console.log("Character is not idle yet.");
      }
    }
  }

  idleanimation() {
    console.log("Idle animation triggered.");
    this.playAnimation(this.characterarrays.IMAGES_IDLE);
  }

  snooringanimation() {
    if (
      this.x === this.currentPosition &&
      Date.now() - this.lastMoveTime >= 2000
    ) {
      console.log("Character is long idle. Playing snooring animation.");
      this.snooring_sound.play();
      this.playAnimation(this.characterarrays.IMAGES_LONG_IDLE);
    }
  }

  updateCharacterAnimation() {
    if (this.isDead()) {
      this.playAnimation(this.characterarrays.IMAGES_DEATH);
      this.death_sound.play();
    } else if (this.isHURT()) {
      this.hurt_sound.play();
      this.playAnimation(this.characterarrays.IMAGES_HURT);
    }
  }

  jumping() {
    if (this.isAboveGround()) {
      this.playAnimation(this.characterarrays.IMAGES_JUMPING);
    }
  }

  walking() {
    if (this.world && (this.world.keyboard.RIGHT || this.world.keyboard.LEFT)) {
      this.playAnimation(this.characterarrays.IMAGES_WALKING);
    }
  }
}
