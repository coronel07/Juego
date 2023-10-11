let player, grass, water, coins;
let elementoActual = "";
let juegoIniciado = true;
let score = 0;

function preload() {
}

function setup() {
  createCanvas(200, 160, 'pixelated');

  world.gravity.y = 10;
  allSprites.pixelPerfect = true;

  grass = new Group();
  grass.h = 15
  grass.w = 15
  grass.layer = 0;
  grass.collider = 'static';
  grass.tile = 'g';

  water = new Group();
  water.h = 15
  water.w = 15
  water.layer = 2;
  water.collider = 'static';
  water.h = 8;
  water.tile = 'w';

  coins = new Group();
  coins.h = 5
  coins.w = 5
  coins.collider = 'static';
  coins.tile = 'c';

  new Tiles(
    [
      'cc',
      'gg                                     g',
      ' ',
      '   gg',
      '       c                        c  g',
      '      ggg    c                  g',
      '            ggg             g                 ccc',
      '                                              ccc',
      '     c c c       c c                          ccc',
      'gggggggggggwwwwwggggg  ggggggggggg            ggg'
    ],
    8,
    8,
    16,
    16
  );

  player = new Sprite(48, 100, 12, 12);
  player.layer = 1;
  player.rotationLock = true;
  player.friction = 0;
  player.color = 'white'
  player.overlaps(coins, collectCoin);
  textAlign(CENTER);

}

function collectCoin(player, coin) {
  coin.remove();
  score++;
}

function draw() {
  background('skyblue');
  fill(255);
  text('Score: ' + score, 160, 20);
  camera.x = player.x + 52;
  elementControl()
  movePlayer()
}

function Game() {
  if (juegoIniciado) {
    movePlayer();
    elementControl();
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
  if (kb.presses('up') || kb.presses('space')) {

    player.vel.y = -4.5;
  }

  if (kb.pressing('left')) {
    player.vel.x = -1.5;
    player.mirror.x = true;
  } else if (kb.pressing('right')) {
    player.vel.x = 1.5;
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