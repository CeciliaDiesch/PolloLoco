let canvas;
let ctx; //abkürzung context
let world = new World();

function init() {
  canvas = document.getElementById('canvas');
  ctx = canvas.getContext('2d'); //mit dieser variable kann man jetzt viele funktionen aufrufen

  console.log('My Character is', world.Character);
  /*character.src = "../assets/img/2_character_pepe/2_walk/W-21.png";*/
}
