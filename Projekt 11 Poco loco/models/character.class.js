class Character extends MovableObject {
  height = 280;
  y = 150;
  speed = 10;
  characterarrays = new Characterarrays();
  world;
  walking_sound = new Audio("audio/528953_3302313-lq.mp3");

  constructor() {
    super().loadImage("img/2_character_pepe/2_walk/W-21.png");
    this.loadingimages();
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

  initializecharacter() {
    this.x = 120;
    this.currentposition = 120;
    this.lastMoveTime = Date.now();
    this.applyGravity();
    this.animate();
  }

  handleMoveRight() {
    this.moveRight();
    this.otherDirection = false;
    this.walking_sound.play();
  }

  handleMoveLeft() {
    this.moveLeft();
    this.otherDirection = true;
    this.walking_sound.play();
  }

  updateMovementAndCamera() {
    this.walking_sound.pause();
    if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
      this.handleMoveRight();
    }
    if (this.world.keyboard.LEFT && this.x > 0) {
      this.handleMoveLeft();
    }
    this.handleJumpAndCamera();
  }

  handleJumpAndCamera() {
    if (
      (this.world.keyboard.SPACE || this.world.keyboard.UP) &&
      !this.isAboveGround()
    ) {
      this.jump();
    }
    this.world.camera_x = -this.x + 100;
  }

  animate() {
    this.checkidleanimation();
    const movement = setInterval(() => {
      0;
      this.updateMovementAndCamera();
    }, 50);
    const animationmovement = setInterval(() => {
      this.updateCharacterAnimation();
    }, 40);
  }

  checkidleanimation() {
    setInterval(() => {
      if (
        this.x === this.currentPosition &&
        Date.now() - this.lastMoveTime >= 50
      ) {
        this.sleepinganimation();
      } else {
        this.currentPosition = this.x;
        this.lastMoveTime = Date.now();
      }
    }, 3000);
  }

  sleepinganimation() {
    setInterval(() => {
      this.playAnimation(this.characterarrays.IMAGES_IDLE);
      console.log("playing");
      if (
        this.x === this.currentPosition &&
        Date.now() - this.lastMoveTime >= 1500
      ) {
        setInterval(() => {
          this.playAnimation(this.characterarrays.IMAGES_LONG_IDLE);
        }, 2500);
      }
    }, 1000);
  }

  updateCharacterAnimation() {
    if (this.isDead()) {
      this.playAnimation(this.characterarrays.IMAGES_DEATH);
      setTimeout(() => {
        this.death();
      }, 0);
    } else if (this.isHURT()) {
      this.playAnimation(this.characterarrays.IMAGES_HURT);
    } else if (this.isAboveGround()) {
      this.playAnimation(this.characterarrays.IMAGES_JUMPING);
    } else {
      if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
        this.playAnimation(this.characterarrays.IMAGES_WALKING);
      }
    }
  }
}
