/**
 * Class representing the coins status bar.
 * Extends the DrawableObject class and displays the coin status based on the percentage.
 */
class Coinsstatusbar extends DrawableObject {
  /**
   * @type {string[]}
   */
  IMAGES = [
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png",
  ];

  /**
   * @type {number}
   */
  percentage = 0;

  /**
   * Creates an instance of Coinsstatusbar.
   * Loads the images for the status bar, initializes its position and dimensions,
   * and sets the initial percentage to 0.
   */
  constructor() {
    super();
    this.loadImages(this.IMAGES);
    this.x = 20; 
    this.y = 150; 
    this.width = 200; 
    this.height = 100;
    this.setpercentage(0); 
  }
}
