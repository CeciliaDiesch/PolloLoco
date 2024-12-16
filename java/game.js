let canvas;
let ctx; //abkürzung context
let character = new Image();

function init() {
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d"); //mit dieser variable kann man jetzt viele funktionen aufrufen
  character.src = "../assets/img/2_character_pepe/2_walk/W-21.png";

  setTimeout(function () {
    ctx.drawImage(character, 20, 20, 50, 150); // zahlen sind koordinaten (x,y, wie breit, wie hoch)
  }, 2000);
}
