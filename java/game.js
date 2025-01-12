let canvas;
let ctx; //abkürzung context
let world;
let keyboard = new Keyboard(); //hiermit erstellen wir eine Instanz von der class

function init() {
  canvas = document.getElementById('canvas');
  world = new World(canvas, keyboard); // wir übergeben die variable canvas und keyboard an unsere Welt

  console.log('My Character is', world.character);
}

window.addEventListener('keydown', (event) => {
  if (event.code == 'Space') {
    keyboard.SPACE = true;
  }
  if (event.code == 'ArrowRight') {
    keyboard.RIGHT = true;
  }
  if (event.code == 'ArrowLeft') {
    keyboard.LEFT = true;
  }
  if (event.code == 'ArrowUp') {
    keyboard.UP = true;
  }
  if (event.code == 'ArrowDown') {
    keyboard.DOWN = true;
  }
  console.log(event);
});

window.addEventListener('keyup', (event) => {
  if (event.code == 'Space') {
    keyboard.SPACE = false;
  }
  if (event.code == 'ArrowRight') {
    keyboard.RIGHT = false;
  }
  if (event.code == 'ArrowLeft') {
    keyboard.LEFT = false;
  }
  if (event.code == 'ArrowUp') {
    keyboard.UP = false;
  }
  if (event.code == 'ArrowDown') {
    keyboard.DOWN = false;
  }
  console.log(event);
});
