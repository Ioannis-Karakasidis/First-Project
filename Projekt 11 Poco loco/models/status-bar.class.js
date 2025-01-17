class Statusbar extends DrawableObject {
  IMAGES = [
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png",
  ];

  percentage = 100;

  /**
   * Creates a new Statusbar object.
   * Initializes the position, size, and the initial health percentage.
   */
  constructor() {
    super();
    this.loadImages(this.IMAGES);  
    this.x = 20;  
    this.y = 70;  
    this.width = 200;  
    this.height = 100; 
    this.setpercentage(100); 
  }
}
