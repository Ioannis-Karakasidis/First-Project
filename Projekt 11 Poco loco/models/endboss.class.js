class Endboss extends MovableObject {
  IMAGES_WALKING = [
    "img/4_enemie_boss_chicken/2_alert/G5.png",
    "img/4_enemie_boss_chicken/2_alert/G6.png",
    "img/4_enemie_boss_chicken/2_alert/G7.png",
    "img/4_enemie_boss_chicken/2_alert/G8.png",
    "img/4_enemie_boss_chicken/2_alert/G9.png",
    "img/4_enemie_boss_chicken/2_alert/G10.png",
    "img/4_enemie_boss_chicken/2_alert/G11.png",
    "img/4_enemie_boss_chicken/2_alert/G12.png",
  ];

  IMAGES_DEAD = [
    "img/4_enemie_boss_chicken/5_dead/G24.png",
    "img/4_enemie_boss_chicken/5_dead/G25.png",
    "img/4_enemie_boss_chicken/5_dead/G26.png",
  ];

  Win = ["img/9_intro_outro_screens/win/won_2.png"];
  GAME_OVER = ["img/9_intro_outro_screens/game_over/game over.png"];
  win_audio = new Audio("audio/mixkit-retro-game-notification-212.wav");
  gameover_audio = new Audio("audio/mixkit-retro-game-notification-212.wav");

  energy = 100;
  constructor() {
    super().loadImage(this.IMAGES_WALKING[0]);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_DEAD);
    this.x = 2200;
    this.y = 80;
    this.height = 400;
    this.width = 300;
    this.animate();
  }

  animate() {
    setInterval(() => {
      if (this.percentage > 0) {
        this.playAnimation(this.IMAGES_WALKING);
      } else if (this.percentage == 0) {
        this.bosshit();
        this.set;

        setInterval(() => {
          this.playAnimation(this.IMAGES_DEAD);
        }, 40);
      }
    }, 250);
  }
}
