let player;
let elementoActual = "";
let bricks, tilesGroup;
let juegoIniciado = true;
let lastShotTime1 = 0;
let lastShotTime2 = 0;
let shotDelay1 = 700;
let shotDelay2 = 3000;
let powerUP;
let hasPowerUp = "no";

function setup() {
  createCanvas(windowWidth - 4, windowHeight - 4);

  // Jugador
  player = new Sprite(100, 90);
  player.diameter = 30;
  player.color = "white";
  player.rotationLock = true;
  player.visible = false;
  player.friction = 0;

  // Laberinto
  bricks = new Group();
  bricks.color = "black";
  bricks.collider = "static";
  bricks.w = 40;
  bricks.h = 40;
  bricks.tile = "=";
  bricks.visible = false;

  powerUP = new Group();
  powerUP.color = "yellow";
  powerUP.tile = "u";
  powerUP.diameter = 20;

  tilesGroup = new Tiles(
    [
      "===============================",
      "=..................============",
      "=..==.===.===u===..============",
      "=.=..=...=..=...=..============",
      "=.===.=.===.===.===.===========",
      "=...=.=.=.....=...=.===========",
      "===.=.=.=====.===.=.===========",
      "=.....=.......=...=.===========",
      "=.===.===.===.=.===.===========",
      "=.=..=...=..=.u=..=.===========",
      "=.===.=.===.===.=.=.===u=======",
      "=..................============",
      "===============================",
      "===============================",
      "===============================",
    ],
    70,
    70,
    bricks.w + 1,
    bricks.h + 1
  );
}

function draw() {
  background("gray");
  Game();
}

function Game() {
  if (juegoIniciado) {
    movePlayer();
    elementControl();
    elementBullets();
    checkPowerUp();
    texto();
    player.visible = true;
    bricks.visible = true;
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

function elementBullets() {
  if (mouse.presses() && elementoActual === "fuego") {
    let currentTime1 = millis();
    if (currentTime1 - lastShotTime1 > shotDelay1) {
      // Verifica si ha pasado el retardo desde el último disparo
      let bullet = new Sprite(player.x, player.y);
      bullet.diameter = 10;
      let angle = atan2(mouseY - player.y, mouseX - player.x);
      let speed = 5;
      bullet.vel.x = cos(angle) * speed;
      bullet.vel.y = sin(angle) * speed;
      bullet.color = "orange";
      bullet.collides(bricks, (bullet, brick) => {
        bullet.remove();
      });
      lastShotTime1 = currentTime1;
    }
  }
  if (mouseButton === RIGHT && elementoActual === "fuego" && hasPowerUp === "yes") {
    let currentTime2 = millis();
    if (currentTime2 - lastShotTime2 > shotDelay2) {
      // Verifica si ha pasado el retardo desde el último disparo
      let Canyon = new Sprite(player.x, player.y);
      Canyon.diameter = 25;
      let angle = atan2(mouseY - player.y, mouseX - player.x);
      let speed = 5;
      Canyon.vel.x = cos(angle) * speed;
      Canyon.vel.y = sin(angle) * speed;
      Canyon.color = "blue";
      Canyon.collides(bricks, (Canyon, brick) => {
        Canyon.remove();
      });
      lastShotTime2 = currentTime2;
	  hasPowerUp = 'no';

    }
  }
}

function checkPowerUp() {
  player.collides(powerUP, (player, powerUP) => {
    powerUP.remove();
    powerUP.tile = ".";
    hasPowerUp = "yes";
  });
}

function texto() {
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(20);
  text("habilidad = " + hasPowerUp, width / 1.5, height / 19);
}
