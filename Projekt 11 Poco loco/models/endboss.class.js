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

  IMAGES_HURT = [
    "img/4_enemie_boss_chicken/4_hurt/G21.png",
    "img/4_enemie_boss_chicken/4_hurt/G22.png",
    "img/4_enemie_boss_chicken/4_hurt/G23.png",
  ];

  IMAGES_ATTACK = [
    "img/4_enemie_boss_chicken/3_attack/G13.png",
    "img/4_enemie_boss_chicken/3_attack/G14.png",
    "img/4_enemie_boss_chicken/3_attack/G15.png",
    "img/4_enemie_boss_chicken/3_attack/G16.png",
    "img/4_enemie_boss_chicken/3_attack/G17.png",
    "img/4_enemie_boss_chicken/3_attack/G18.png",
    "img/4_enemie_boss_chicken/3_attack/G19.png",
    "img/4_enemie_boss_chicken/3_attack/G20.png",
  ];

  Win = ["img/9_intro_outro_screens/win/won_2.png"];
  GAME_OVER = ["img/9_intro_outro_screens/game_over/game over.png"];
  win_audio = new Audio("audio/mixkit-retro-game-notification-212.wav");
  gameover_audio = new Audio("audio/mixkit-retro-arcade-lose-2027.wav");
  animationInterval = null;
  intervalsIdss = [];
  offset = {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  }

  energy = 100;

  /**
   * Creates a new Endboss instance and initializes it.
   * Loads images, sets position, and starts animations.
   */
  constructor() {
    super();
    this.loadImage(this.IMAGES_WALKING[0]);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_ATTACK);
    this.animationInterval = this.setStoppableInterval(() => this.animate(), 250);

    this.x = 2200;
    this.y = 80;
    this.height = 400;
    this.width = 300;
    this.animate();
    setInterval(() => {
    this.moveLeft()
    }, 1000 / 75);
    console.log(this.intervalsIdss);
    
  }

  /**
   * Animates the Endboss by cycling through the walking images.
   */
  animate() {
    setTimeout(() => {
      this.playAnimation(this.IMAGES_ATTACK)
      this.stopGames()
    }, 10000);
  }


  /**
   * Stops the game and clears all intervals related to the Endboss.
   */
  stopGames() {
    this.intervalsIdss.forEach(clearInterval);
    this.intervalsIdss = [];
  }

  /**
   * Sets a stoppable interval and adds it to the intervals list.
   * 
   * @param {Function} fn - The function to execute at each interval.
   * @param {number} time - The time in milliseconds between function executions.
   * @returns {number} The interval ID.
   */
  setStoppableInterval(fn, time) {
    let id = setInterval(fn, time);
    this.intervalsIdss.push(id);
    return id;
  }

  /**
  * Stops a specific interval in the game.
  *
  * @param {number} targetIndex - The index of the interval to stop.
  */
  stopSpecificGame(targetIndex) {
    if (intervalsIds[targetIndex]) {
      clearInterval(intervalsIds[targetIndex]);
      intervalsIds[targetIndex] = null;
    }
  }
}
