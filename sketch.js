let player, grass, water, coins;
let elementoActual = "";
let juegoIniciado = true;
let score = 0;
let enemies = [];

function preload() {
}

function setup() {
  createCanvas(400, 260, 'pixelated');

  world.gravity.y = 10;
  allSprites.pixelPerfect = true;

  walls = new Group();
  walls.color = 'black'
  walls.h = 15
  walls.w = 15
  walls.layer = 0;
  walls.collider = 'static';
  walls.tile = '=';

  grass = new Group();
  grass.color = 'green'
  grass.h = 15
  grass.w = 15
  grass.layer = 0;
  grass.collider = 'static';
  grass.tile = 'g';

  water = new Group();
  water.color = 'blue'
  water.h = 15
  water.w = 15
  water.layer = 2;
  water.collider = 'static';
  water.h = 8;
  water.tile = 'w';

  coins = new Group();
  coins.color = 'yellow'
  coins.h = 5
  coins.w = 5
  coins.collider = 'static';
  coins.tile = 'c';

  new Tiles(
    [
      '=    cc                                                                                                                                                                     ',
      '=    gg                                     g                                                                                            ',
      '=                                                                                                                                      ',
      ' =       gg                                                                                                                          ',
      ' =          c                        c  g                                                                        ',
      ' =         ggg    c                  g                                           ggggg                                                      ',
      '=                ggg             g                 ccc                           g   g                                                                            ',
      '=                                                  ccc                      gggggg   g                                                ',
      '=         c c c       c c                          ccc              ggg              g                                                   ',
      ' gggggggggggggggwwwwwggggg  ggggggggggg            ggg       ggg                     g                               ',
      ' gggggggggggggggwwwwwggggg  ggggggggggg            ggg       ggg                     g                               ',
      ' gggggggggggggggwwwwwggggg  ggggggggggg            ggg       ggg                     g                               ',
    
    ],
    0,
    60,
    16,
    16
  );

  player = new Sprite(50, 150, 12, 20);
  player.rotationLock = true;
  player.friction = 0;
  player.color = 'white'
  player.overlaps(coins, collectCoin);
  textAlign(CENTER);

  for (let i = 0; i < 5; i++) {
    let enemy = new Enemy(random(width), random(height), 2); // Valores de posición y velocidad a elección
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
  }
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

  for (let enemy of enemies) {
    enemy.update(player); 
  }

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
  if (player.colliding(grass)) {
    if (kb.presses('up') || kb.presses('space')) {
      player.vel.y = -4.5;
    }
  }
  if (player.colliding(water)) {
    if (kb.presses('up') || kb.presses('space')) {
      player.vel.y = -2.5;
    }
  }
  if (elementoActual === "viento") {
    if (kb.presses('up') || kb.presses('space')) {
      player.vel.y = -4.5;
    }
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