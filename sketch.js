let player, grass, water, coins, groundSensor;
let elementoActual = "";
let juegoIniciado = true;
let powerUP;
let hasPowerUp = false;
let score = 0;
let saltosRealizados = 0;
let enemies = [];


function preload() {

}

function setup() {
  createCanvas(600, 300, "pixelated");

  world.gravity.y = 10;
  allSprites.pixelPerfect = true;

  walls = new Group();
  walls.color = "black";
  walls.h = 15;
  walls.w = 15;
  walls.layer = 0;
  walls.collider = "static";
  walls.tile = "=";

  grass = new Group();
  grass.color = "green";
  grass.h = 15;
  grass.w = 15;
  grass.layer = 0;
  grass.collider = "static";
  grass.tile = "g";

  water = new Group();
  water.layer = 2;
  water.color = "blue";
  water.h = 15;
  water.w = 15;
  water.collider = "static";
  water.tile = "w";

  coins = new Group();
  coins.color = "yellow";
  coins.h = 5;
  coins.w = 5;
  coins.collider = "static";
  coins.tile = "c";

  powerUP = new Group();
  powerUP.color = "red";
  powerUP.tile = "o";
  powerUP.h = 5;
  powerUP.w = 5;
  powerUP.collider = "static";

  deathBox = new Group();
  deathBox.visible = false;
  deathBox.tile = "x";
  deathBox.h = 15;
  deathBox.w = 15;
  deathBox.collider = "static";

  sands = new Group();
  sands.color = 'brown'
  sands.collider = "static";
  sands.w = 15;
  sands.h = 15;
  sands.tile = "p";
  sands.collider = "static";
  sands.broken = false;

  logs = new Group();
  logs.color = 'gray'
  logs.collider = "static";
  logs.w = 15;
  logs.h = 15;
  logs.tile = "b";

  player = new Sprite();
  player.w = 12;
  player.h = 28;
  player.img = 'assets/ninjanormal.png';
  player.rotationLock = true;
  player.friction = 0;
  player.layer = 1;
  player.tile = "v";
  player.overlaps(coins, collectCoin);

  
  portal = new Sprite();
  portal.w = 2;
  portal.h = 28;
  portal.visible = true;
  portal.collider = 'static'
  portal.tile = "u";

  level1 = new Tiles(
    [
      "..g.................................................................................................g.......gggggggggggg",
      "..g.................................................................................................g.....gg............",
      "..g.................................................................................................g.gggg..............",
      "..g.................................................................................................gg..................",
      "...g................................................................................................gg..................",
      "...g....................................................................................................................",
      "...g.............................................................................................................ggggggg",
      "...g..........................................................................................................ggg.......",
      "....g.........................................................................................................g.........",
      "....g.........................................................................................................gg........",
      "....g...........................................................................................................g.......",
      ".....ggg..............................................................................................gggg......g.......",
      "......gg..............................................................................................g..g.......g......",
      ".....g................................................................................................g..g.......g......",
      ".....g..............................................................................................gg....g.......gggggg",
      ".....g.............................................................gg...................ggggppppppppg.....g........bbbbb",
      "....g....................................................ggg.......gg...................g..g........g.....g........bb...",
      "....g....................................................g..gggg...gg.....gggggggggg....g..g........g.....g........bb...",
      "....g...........................................gggggg...g.....g...g.g....g........g....g..g........g.....g......ggggggg",
      "....g..........v................................g....g...g....g....g.g...g.........gxxxxg..g.........g....g......g......",
      ".....ggwwwwwgggggggggggggggggggggggggggggggggggg.....g..g.....g....g.g...ggg...............g..........g...g.......g.....",
      ".......gwwwg.........................................g..g.....g....g.g......g.............g...........g...g........g....",
      "........ggg.........................................gxxxg.....gxxxxg.gxxx...g.............gxxxxxxxxxxxg...gxxxxxxxxg....",
    ],
    -180,
    -70,
    16,
    16
  );

  groundSensor = new Sprite(60, 250, 6, 20);
  groundSensor.visible = false;
  groundSensor.mass = 0.01;
  groundSensor.overlaps(allSprites);

  new GlueJoint(player, groundSensor);


  //Enemigos
  /*
  for (let i = 0; i < 1; i++) {
    let enemy = new Enemy(1,150, 2); 
    enemies.push(enemy);
  }

}
class Enemy {
  constructor(x, y, speed) {
    this.sprite = createSprite(x, y, 20, 20); 
    this.speed = speed; 
  }

  update(player) {

    let direction = createVector(player.position.x - this.sprite.position.x, player.position.y - this.sprite.position.y);
    direction.normalize();
    direction.mult(this.speed);
    this.sprite.velocity.x = direction.x;
    this.sprite.velocity.y = direction.y;
  }*/

}

function collectCoin(player, coin) {
  coin.remove();
  score++;
}

function draw() {
  background("grey");
  Game();
}

function Game() {
  if (juegoIniciado) {
    fill(0);
    text("Score: " + score, 530, 20);
    fill(0);
    text("Live: " + score, 530, 40);
    camera.x = player.x - (-100);
    elementControl();
    elementBullets();
    checkPowerUp();
    movePlayer();
    elementMove() 
    
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
  if (kb.pressing("left")) player.vel.x = -9;
  else if (kb.pressing("right")) player.vel.x = 9;
  if (kb.pressing("up")) player.vel.y = -4;
  else if (kb.pressing("down")) player.vel.y = 4;
}

function movePlayer1() {
  if (groundSensor.overlapping(water)) {
    player.drag = 20;
    player.friction = 10;
  } else {
    player.drag = 0;
    player.friction = 0;
  }

  if (groundSensor.overlapping(grass) ||
    groundSensor.overlapping(water)) {
    if (kb.presses('up') || kb.presses('space')) {
      player.vel.y = -4.5;
    }
  }

  if (kb.pressing("left")) {
    player.vel.x = -2;
    player.mirror.x = true;
  } else if (kb.pressing("right")) {
    player.vel.x = 2;
    player.mirror.x = false;
  } else {
    player.vel.x = 0;
  }

  if (player.y > 400) {
    player.speed = 0;
    player.x = 48;
    player.y = 100;
  }
}

function elementMove() {
  if (elementoActual === "viento") {
    if (groundSensor.overlapping(grass) ||
      groundSensor.overlapping(water)) {
      saltosRealizados = 0;
    }
    if ((kb.presses("up") || kb.presses("space")) && saltosRealizados < 1) {
      // Aplicar un salto
      player.vel.y = -4.5;
      saltosRealizados++;
    }
  }

  for (let enemy of enemies) {
    enemy.update(player); 
  }
}

function elementBullets() {



}

function checkPowerUp() {
  player.collides(powerUP, (player, powerUP) => {
    powerUP.remove();
    powerUP.tile = ".";
    hasPowerUp = true;
  });
}

function elementControl() {
  // Cambiar el elemento del sprite según las teclas presionadas
  if (kb.pressing("o")) {
    elementoActual = "agua";
    player.img = 'assets/ninjaagua.png';
  } else if (kb.pressing("l")) {
    elementoActual = "fuego";
    player.img = 'assets/ninjafuego.png';
  } else if (kb.pressing("p")) {
    elementoActual = "electrico";
    player.img = 'assets/ninjaelectrico.png';
  } else if (kb.pressing("ñ")) {
    elementoActual = "viento";
    player.img = 'assets/ninjaviento.png';
  }
}
