let player, ui;
let elementoActual = "";
let juegoIniciado = true;
let backgroundImage;
//let radioVision = 30;
//let fog;

function preload() {
  backgroundImage = loadImage('map.png');
}

function setup() {
  createCanvas(windowWidth - 4, windowHeight - 4);

  //paredes
  
  // Jugador
  player = new Sprite(100, 90);
  player.diameter = 30;
  player.color = "white";
  player.rotationLock = true;
  player.visible = false;
  player.friction = 0;

  /*ui = new Group();
  for (let i = 0; i < 1; i++) {
    new ui.Sprite(100 + i * 40, 115, 35, 10,'s');
  }
  camera.zoom = 1;*/

  // Laberinto
  bricks = new Group();
  bricks.color = "black";
  bricks.collider = "static";
  bricks.w = 20;
  bricks.h = 20;
  bricks.tile = "=";
  bricks.visible = false;

  powerUP = new Group();
  powerUP.color = "yellow";
  powerUP.tile = "u";
  powerUP.diameter = 20;

  portal1 = new Group()
  portal1.color = 'green'
  portal1.w = 40;
  portal1.h = 20;
  portal1.tile = 'p'


  tilesGroup = new Tiles(
    [
      "============================p.============================",
      "=........................................................=",
      "=........................................................=",
      "=........................................................=",
      "=........................................................=",
      "=........................................................=",
      "=........................................................=",
      "=........................................................=",
      "=........................................................=",
      "=........................................................=",
      "=........................................................=",
      "=........................................................=",
      "=........................................................=",
      "=........................................................=",
      "=........................................................=",
      "=........................................................=",
      "=........................................................=",
      "=........................................................=",
      "=........................................................=",
      "=........................................................=",
      "=........................................................=",
      "=........................................................=",
      "=........................................................=",
      "==========================================================",
    ],
    67,
    67,
    bricks.w + 0,
    bricks.h + 0
  );
}

function draw() {
  background("gray");

  let padding = 50;
  let juegoRectAncho = width - 2 * padding;
  let juegoRectAlto = height - 2 * padding;
  let juegoRectX = padding;
  let juegoRectY = padding;
  fill("lightgray") // Puedes cambiar "lightgray" al color que prefieras
  rect(juegoRectX, juegoRectY, juegoRectAncho, juegoRectAlto);

  
  Game();
}

function Game() {
  if (juegoIniciado) {
    movePlayer();
    elementControl();
    //dibujarElementos();
    bricks.visible = true
    player.visible = true;
  } else {
    clear();
    fill(0);
    textAlign(CENTER, CENTER);
    textSize(32);
    text("Presiona ESPACIO para iniciar", width / 2, height / 2);

    if (keyIsDown(32)) {
      juegoIniciado = true;
    }
  }
}

function movePlayer() {
  /*camera.on();
	player.moveTowards(mouse, 0.01);
	player.draw();
	camera.x = player.x;
	camera.y = player.y;

	camera.off();*/
  player.vel.set(0, 0);

  if (kb.pressing("left")) player.vel.x = -3;
  else if (kb.pressing("right")) player.vel.x = 3;

  if (kb.pressing("up")) player.vel.y = -3;
  else if (kb.pressing("down")) player.vel.y = 3;

}

function elementControl() {
  // Cambiar el elemento del sprite según las teclas presionadas
  if (kb.pressing("o")) {
    elementoActual = "agua";
    player.color = "blue";
  } else if (kb.pressing("l")) {
    elementoActual = "fuego";
    player.color = "red";
  } else if (kb.pressing("p")) {
    elementoActual = "electricidad";
    player.color = "yellow";
  } else if (kb.pressing("ñ")) {
    elementoActual = "viento";
    player.color = "gray";
  }
}

/*function dibujarElementos() {
  // Dibujar el laberinto
  for (let brick of bricks) {
    fill(0);
    rect(brick.x, brick.y, brick.width, brick.height);
  }

  // Dibujar elementos visibles dentro del radio de visión
  fill(255);
  ellipse(player.x, player.y, radioVision * 5);
}*/

