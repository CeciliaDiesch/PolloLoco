/**
 * Represents the state of keyboard input.
 *
 * @class Keyboard
 * @property {boolean} LEFT - True if the left key is pressed.
 * @property {boolean} RIGHT - True if the right key is pressed.
 * @property {boolean} UP - True if the up key is pressed.
 * @property {boolean} DOWN - True if the down key is pressed.
 * @property {boolean} SPACE - True if the space key is pressed.
 * @property {boolean} X - True if the X key is pressed.
 * @property {boolean} xWasPressed - True if the X key was pressed previously.
 */
class Keyboard {
  LEFT = false;
  RIGHT = false;
  UP = false;
  DOWN = false;
  SPACE = false;
  X = false;
  xWasPressed = false;
}
