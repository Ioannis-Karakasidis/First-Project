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
    this.stopCharacterIntervals();
    this.initializeCharacterState();
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
  stopCharacterIntervals() {
    setStoppableInterval(() => this.animateCharacter(), 1000 / 75);
    setStoppableInterval(() => this.playCharacterWalkingAnimation(), 50);
    setStoppableInterval(() => this.playCharacterJumpingAnimation(), 250);
    let indexOfSleepingAnimation = setStoppableInterval(
      () => this.handleCharacterSleepingAnimation(),
      500
    );
  }

  /**
   * Initializes the character's starting position and applies gravity.
   */
  initializeCharacterState() {
    this.x = 120;
    this.currentPosition = 120;
    this.lastMoveTime = Date.now();
    this.applyGravity();
  }

  /**
   * Moves the character to the right and plays the walking sound.
   */
  moveCharacterRight() {
    this.moveRight();
    this.otherDirection = false;
    if (this.walking_sound.paused && !mute === true) {
      this.walking_sound.play();
    }
  }

  /**
   * Moves the character to the left and plays the walking sound.
   */
  moveCharacterLeft() {
    this.moveLeft();
    this.otherDirection = true;
    if (this.walking_sound.paused && !mute === true) {
      this.walking_sound.play();
    }
  }

  /**
   * Updates the character's movement and camera based on user input.
   */
  updateCharacterMovementAndCamera() {
    this.walking_sound.pause();
    if (
      this.world &&
      this.world.keyboard.RIGHT &&
      this.x < world.enemyboss.x
    ) {
      this.moveCharacterRight();
      this.snooring_sound.pause();
    }
    this.moveCharacterLeftIfPossible()
    this.handleCharacterJumpAndCamera();
  }

  /**
   * Handles the left movement of the object.
   * Checks if the `LEFT` key is pressed and if the object is within the world boundaries.
   * If both conditions are met, triggers the left movement logic.
   */
  moveCharacterLeftIfPossible() {
    if (this.world && this.world.keyboard.LEFT && this.x > 0) {
      this.moveCharacterLeft();
    }
  }

  /**
   * Handles character's jumping and updates camera position.
   */
  handleCharacterJumpAndCamera() {
    if (
      this.world &&
      (this.world.keyboard.SPACE || this.world.keyboard.UP) &&
      !this.isAboveGround()
    ) {
      this.handleCharacterJumpWithMuteControl()
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
  handleCharacterJumpWithMuteControl() {
    if (mute) {
      this.jumping_sound.pause();
    } else {
      this.jumping_sound.play();
    }
    this.playCharacterJumpingAnimation();
    this.jump()
  }

  /**
   * Controls the movement and camera update process.
   */
  updateMovementAndCameraState() {
    this.updateCharacterMovementAndCamera();
  }

  /**
   * Triggers character animation and updates movement and camera.
   */
  animateCharacter() {
    this.updateMovementAndCameraState();
    this.updateCharacterAnimationState();
  }

  /**
   * Handles the animation of the character based on the state (e.g., idle, hurt, death).
   */
  updateCharacterAnimationState() {
    this.updateCharacterAnimationStateBasedOnHealth();
  }

  /**
   * Handles the character's sleeping animation based on time elapsed and movement.
   */
  handleCharacterSleepingAnimation() {
    const timeElapsed = Date.now() - this.lastMoveTime;
    if (this.x === this.currentPosition) {
      if (timeElapsed >= 0 && timeElapsed < 15000) {
        this.playCharacterIdleAnimation();
      } else if (timeElapsed >= 15000) {
        this.playCharacterSnooringAnimation();
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
  playCharacterIdleAnimation() {
    this.playAnimation(this.characterarrays.IMAGES_IDLE);
  }

  /**
   * Plays the snooring animation when the character is idle for a long period.
   */
  playCharacterSnooringAnimation() {
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
  updateCharacterAnimationStateBasedOnHealth() {
    setInterval(() => {
      if (this.isDead()) {
        this.updateCharacterAnimationOnDeath()
      } else if (this.isHURT()) {
        this.updateCharacterAnimationOnHurt()
      }
    }, 0);
  }

  /**
   * Updates the character's animation and sound when the character is dead.
   * Plays the death animation and manages the death sound based on the mute state.
   */
  updateCharacterAnimationOnDeath() {
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
  updateCharacterAnimationOnHurt() {
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
  playCharacterJumpingAnimation() {
    if (this.isAboveGround()) {
      this.playAnimation(this.characterarrays.IMAGES_JUMPING);
    }
  }

  /**
   * Plays the walking animation if the character is moving left or right.
   */
  playCharacterWalkingAnimation() {
    if (this.world && (this.world.keyboard.RIGHT || this.world.keyboard.LEFT)) {
      this.playAnimation(this.characterarrays.IMAGES_WALKING);
    }
  }
}
