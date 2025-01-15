/**
 * Represents the keyboard input state for the character's movement and actions.
 * Tracks the states of various keys (LEFT, RIGHT, UP, DOWN, SPACE, D).
 */
class Keyboard extends MovableObject {
  /** @type {boolean} */
  LEFT = false;

  /** @type {boolean} */
  RIGHT = false;

  /** @type {boolean} */
  UP = false;

  /** @type {boolean} */
  DOWN = false;

  /** @type {boolean} */
  SPACE = false;

  /** @type {boolean} */
  D = false;
}
