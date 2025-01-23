class Keyboard extends MovableObject {
  LEFT = false;
  RIGHT = false;
  UP = false;
  DOWN = false;
  SPACE = false;
  D = false;

  /**
    * Creates an instance of the Keyboard class and sets up event listeners for both 
    * mobile touch buttons and physical keys.
    */
  constructor() {
    super();
    this.initializeMobileButtonListeners();
    this.addKeyUpListeners();
    this.addKeyDownListeners();
  }

  /**
   * Attaches event listeners for the right mobile button (touchstart and touchend events) 
   * to track when the button is pressed and released.
   */
  trackRightButtonPress() {
    document.getElementById('rightbuttonmobile').addEventListener('touchstart', (e) => {
      if (e.cancelable) e.preventDefault();
      this.RIGHT = true;
    }, { passive: true });
    document.getElementById('rightbuttonmobile').addEventListener('touchend', (e) => {
      if (e.cancelable) e.preventDefault();
      this.RIGHT = false;
    });
  }

  /**
   * Attaches event listeners for the left mobile button (touchstart and touchend events) 
   * to track when the button is pressed and released.
   */
  trackLeftButtonPress() {
    document.getElementById('leftbuttonmobile').addEventListener('touchstart', (e) => {
      if (e.cancelable) e.preventDefault();
      this.LEFT = true;
    }, { passive: true });
    document.getElementById('leftbuttonmobile').addEventListener('touchend', (e) => {
      if (e.cancelable) e.preventDefault();
      this.LEFT = false;
    });
  }

  /**
   * Attaches event listeners for the jump mobile button (touchstart and touchend events) 
   * to track when the button is pressed and released.
   */
  trackJumpButtonPress() {
    document.getElementById('upbuttonmobile').addEventListener('touchstart', (e) => {
      if (e.cancelable) e.preventDefault();
      this.UP = true;
    }, { passive: true });
    document.getElementById('upbuttonmobile').addEventListener('touchend', (e) => {
      if (e.cancelable) e.preventDefault();
      this.UP = false;
    });
  }

  /**
   * Attaches event listeners for the secondary jump mobile button (touchstart and touchend events)
   * to track when the button is pressed and released.
   */
  trackSecondaryJumpButtonPress() {
    document.getElementById('jump').addEventListener('touchstart', (e) => {
      if (e.cancelable) e.preventDefault();
      this.UP = true;
    }, { passive: true });
    document.getElementById('jump').addEventListener('touchend', (e) => {
      if (e.cancelable) e.preventDefault();
      this.UP = false;
    });
  }

  /**
   * Attaches event listeners for the 'throw salsa' mobile button (touchstart and touchend events)
   * to track when the button is pressed and released.
   */
  trackThrowSalsaButtonPress() {
    document.getElementById('throwsalsa').addEventListener('touchstart', (e) => {
      if (e.cancelable) e.preventDefault();
      this.D = true;
    }, { passive: true });
    document.getElementById('throwsalsa').addEventListener('touchend', (e) => {
      if (e.cancelable) e.preventDefault();
      this.D = false;
    });
  }

  /**
   * Initializes the mobile button checks using a setInterval.
   * This method repeatedly calls the button check functions at a specified interval (0ms).
   */
  initializeMobileButtonListeners() {
    setInterval(() => {
      this.trackRightButtonPress();
      this.trackLeftButtonPress();
      this.trackJumpButtonPress();
      this.trackSecondaryJumpButtonPress();
      this.trackThrowSalsaButtonPress();
    }, 0);
  }

  /**
   * Adds an event listener to handle keydown events and execute corresponding functions 
   * based on the key pressed.
   * 
   * Key mappings:
   * - Left Arrow (keyCode 37): Calls `leftkeydown()`.
   * - Up Arrow (keyCode 38): Calls `upkeydown()`.
   * - Right Arrow (keyCode 39): Calls `rightkeydown()`.
   * - Down Arrow (keyCode 40): Calls `downkeydown()`.
   * - Space (keyCode 32): Calls `spacekeydown()`.
   * - 'D' Key (keyCode 68): Sets `keyboard.D` to true.
   */
  addKeyDownListeners() {
    document.addEventListener("keydown", (e) => {
      let code = e.keyCode;
      this.handleKeyDownEvent(code)
    });
  }

  /**
   * Handles key press actions based on the provided key code.
   * 
   * @param {number} code - The key code of the pressed key.
   */
  handleKeyDownEvent(code) {
    if (code === 37) {
      this.onLeftKeyDown();
    } else if (code === 38) {
      this.onUpKeyDown();
    } else if (code === 39) {
      this.onRightKeyDown();
    } else if (code === 40) {
      this.onDownKeyDown();
    } else if (code === 32) {
      this.onSpaceKeyDown();
    } else if (code === 68) {
      this.D = true;
    }
  }

  /**
   * Handles the space key down event.
   */
  onSpaceKeyDown() {
    keyboard.SPACE = true;
  }

  /**
   * Handles the down arrow key down event.
   */
  onDownKeyDown() {
    keyboard.DOWN = true;
  }

  /**
   * Handles the left arrow key down event.
   */
  onLeftKeyDown() {
    keyboard.LEFT = true;
  }

  /**
   * Handles the up arrow key down event.
   */
  onUpKeyDown() {
    keyboard.UP = true;
  }

  /**
   * Handles the right arrow key down event.
   */
  onRightKeyDown() {
    keyboard.RIGHT = true;
  }

  /**
   * Adds an event listener to handle keyup events and execute corresponding functions 
   * based on the key pressed.
   * 
   * Key mappings:
   * - Left Arrow (keyCode 37): Calls `leftkeyup()`.
   * - Up Arrow (keyCode 38): Calls `upkeyup()`.
   * - Right Arrow (keyCode 39): Calls `rightkeyup()`.
   * - Down Arrow (keyCode 40): Calls `downkeyup()`.
   * - Space (keyCode 32): Calls `spacekeyup()`.
   * - 'D' Key (keyCode 68): Calls `dkeyup()`.
   */
  addKeyUpListeners() {
    document.addEventListener("keyup", (e) => {
      let code = e.keyCode;
      this.handleKeyUpEvent(code)
    });
  }

  handleKeyUpEvent(code) {
    if (code === 37) {
      this.onLeftKeyUp();
    } else if (code === 38) {
      this.onUpKeyUp();
    } else if (code === 39) {
      this.onRightKeyUp();
    } else if (code === 40) {
      this.onDownKeyUp();
    } else if (code === 32) {
      this.onSpaceKeyUp();
    } else if (code === 68) {
      this.onDKeyUp();
    }
  }

  /**
   * Handles the 'D' key up event.
   */
  onDKeyUp() {
    keyboard.D = false;
  }

  /**
   * Handles the space key up event.
   */
  onSpaceKeyUp() {
    keyboard.SPACE = false;
  }

  /**
   * Handles the down arrow key up event.
   */
  onDownKeyUp() {
    keyboard.DOWN = false;
  }

  /**
   * Handles the left arrow key up event.
   */
  onLeftKeyUp() {
    keyboard.LEFT = false;
  }

  /**
   * Handles the right arrow key up event.
   */
  onRightKeyUp() {
    keyboard.RIGHT = false;
  }

  /**
   * Handles the up arrow key up event.
   */
  onUpKeyUp() {
    keyboard.UP = false;
  }
}