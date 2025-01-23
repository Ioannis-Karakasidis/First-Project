class Character extends MovableObject {
  height = 280;
  y = 100;
  speed = 8;
  characterarrays = new Characterarrays();
  world;
  walking_sound = new Audio("audio/528953_3302313-lq.mp3");
  jumping_sound = new Audio("audio/mixkit-video-game-spin-jump-2648.wav");
  hurt_sound = new Audio("audio/mixkit-man-in-pain-2197.wav");
  death_sound = new Audio("audio/male-death-sound-128357.mp3");
  snooring_sound = new Audio("audio/snoring-sound-effect-55854.mp3");
  offset = {
    top: 120,
    left: 30,
    right: 40,
    bottom: 30
  };

  /**
   * Initializes the character's properties and loads the necessary images for animations.
   */
  constructor() {
    super().loadImage("img/2_character_pepe/2_walk/W-21.png");
    this.loadingimages();
    this.stopintervals();
    this.initializecharacter();
  }

  /**
   * Loads all images for the character's animations (walking, jumping, etc.).
   */
  loadingimages() {
    this.loadImages(this.characterarrays.IMAGES_WALKING);
    this.loadImages(this.characterarrays.IMAGES_JUMPING);
    this.loadImages(this.characterarrays.IMAGES_DEATH);
    this.loadImages(this.characterarrays.IMAGES_HURT);
    this.loadImages(this.characterarrays.IMAGES_IDLE);
    this.loadImages(this.characterarrays.IMAGES_LONG_IDLE);
  }

  /**
   * Stops any ongoing intervals that control movement, walking, jumping, and snooring.
   */
  stopintervals() {
    setStoppableInterval(() => this.animate(), 1000 / 75);
    setStoppableInterval(() => this.walking(), 50);
    setStoppableInterval(() => this.jumping(), 250);
    let indexOfSleepingAnimation = setStoppableInterval(
      () => this.sleepinganimation(),
      500
    );
  }

  /**
   * Initializes the character's starting position and applies gravity.
   */
  initializecharacter() {
    this.x = 120;
    this.currentPosition = 120;
    this.lastMoveTime = Date.now();
    this.applyGravity();
    this.animate();
  }

  /**
   * Moves the character to the right and plays the walking sound.
   */
  handleMoveRight() {
    this.moveRight();
    this.otherDirection = false;
    if (this.walking_sound.paused && !mute === true) {
      this.walking_sound.play();
    }
  }

  /**
   * Moves the character to the left and plays the walking sound.
   */
  handleMoveLeft() {
    this.moveLeft();
    this.otherDirection = true;
    if (this.walking_sound.paused && !mute === true) {
      this.walking_sound.play();
    }
  }

  /**
   * Updates the character's movement and camera based on user input.
   */
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
    this.leftmovement()
    this.handleJumpAndCamera();
  }

  /**
   * Handles the left movement of the object.
   * Checks if the `LEFT` key is pressed and if the object is within the world boundaries.
   * If both conditions are met, triggers the left movement logic.
   */
  leftmovement() {
    if (this.world && this.world.keyboard.LEFT && this.x > 0) {
      this.handleMoveLeft();
    }
  }

  /**
   * Handles character's jumping and updates camera position.
   */
  handleJumpAndCamera() {
    if (
      this.world &&
      (this.world.keyboard.SPACE || this.world.keyboard.UP) &&
      !this.isAboveGround()
    ) {
      this.handleJumpAndCameramute()
    }
    if (this.world) {
      this.world.camera_x = -this.x + 100;
    }
  }

  /**
   * Handles the jump action and manages the sound behavior based on the mute state.
   * If the mute state is active, the jumping sound is paused; otherwise, it plays the sound.
   * Additionally, triggers the jump action.
   */
  handleJumpAndCameramute() {
    if (mute) {
      this.jumping_sound.pause();
    } else {
      this.jumping_sound.play();
    }
    this.jump();
  }

  /**
   * Controls the movement and camera update process.
   */
  movementandcamera() {
    this.updateMovementAndCamera();
  }

  /**
   * Triggers character animation and updates movement and camera.
   */
  animate() {
    this.movementandcamera();
    this.characteranimation();
  }

  /**
   * Handles the animation of the character based on the state (e.g., idle, hurt, death).
   */
  characteranimation() {
    this.updateCharacterAnimation();
  }

  /**
   * Handles the character's sleeping animation based on time elapsed and movement.
   */
  sleepinganimation() {
    const timeElapsed = Date.now() - this.lastMoveTime;
    if (this.x === this.currentPosition) {
      if (timeElapsed >= 0 && timeElapsed < 15000) {
        this.idleanimation();
      } else if (timeElapsed >= 15000) {
        this.snooringanimation();
      }
    } else {
      this.currentPosition = this.x;
      this.lastMoveTime = Date.now();
      this.snooring_sound.pause();
    }
  }

  /**
   * Plays the idle animation for the character when it's not moving.
   */
  idleanimation() {
    this.playAnimation(this.characterarrays.IMAGES_IDLE);
  }

  /**
   * Plays the snooring animation when the character is idle for a long period.
   */
  snooringanimation() {
    if (mute) {
      this.snooring_sound.pause();
    } else {
      this.snooring_sound.play();
    }
    this.playAnimation(this.characterarrays.IMAGES_LONG_IDLE);
  }

  /**
   * Updates the character's animation based on whether it's dead or hurt.
   */
  updateCharacterAnimation() {
    setInterval(() => {
      if (this.isDead()) {
        this.updateCharacterAnimationifdead()
      } else if (this.isHURT()) {
        this.updateCharacterAnimationelsehurt()
      }
    }, 0);
  }

  /**
   * Updates the character's animation and sound when the character is dead.
   * Plays the death animation and manages the death sound based on the mute state.
   */
  updateCharacterAnimationifdead() {
    this.playAnimation(this.characterarrays.IMAGES_DEATH);
    if (mute) {
      this.death_sound.pause();
    } else {
      this.death_sound.play();
    }
  }

  /**
   * Updates the character's animation and sound when the character is hurt.
   * Plays the hurt animation and manages the hurt sound based on the mute state.
   */
  updateCharacterAnimationelsehurt() {
    if (mute) {
      this.hurt_sound.pause();
    } else {
      this.hurt_sound.play();
    }
    this.playAnimation(this.characterarrays.IMAGES_HURT);
  }

  /**
   * Plays the jumping animation if the character is in the air.
   */
  jumping() {
    if (this.isAboveGround()) {
      this.playAnimation(this.characterarrays.IMAGES_JUMPING);
    }
  }

  /**
   * Plays the walking animation if the character is moving left or right.
   */
  walking() {
    if (this.world && (this.world.keyboard.RIGHT || this.world.keyboard.LEFT)) {
      this.playAnimation(this.characterarrays.IMAGES_WALKING);
    }
  }
}
