class Character extends MovableObject {
  height = 280;
  y = 180;
  speed = 10;
  characterarrays = new Characterarrays();
  world;
  walking_sound = new Audio("audio/528953_3302313-lq.mp3");
  intervals = [];

  constructor() {
    super().loadImage("img/2_character_pepe/2_walk/W-21.png");
    this.loadImages(this.characterarrays.IMAGES_WALKING);
    this.loadImages(this.characterarrays.IMAGES_JUMPING);
    this.loadImages(this.characterarrays.IMAGES_DEATH);
    this.loadImages(this.characterarrays.IMAGES_HURT);
    this.applyGravity();
    this.animate();
    if (this.energy == 0) {
      setInterval(() => {
        this.playAnimation(this.IMAGES_DEATH);
      }, 40);
    }
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
    setInterval(() => {
      this.updateMovementAndCamera();
    }, 50);
    setInterval(() => {
      this.updateCharacterAnimation();
    }, 40);
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
