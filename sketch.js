let player, grass, water, coins, groundSensor;
let elementoActual = "";
let juegoIniciado = true;
let powerUP;
let hasPowerUp = false;
let score = 0;
let live = 3
let saltosRealizados = 0;
let enemies = [];
let bg
let BandaSonora;
let efectoSalto;
let efectoCaminar;
let x = 0;



function preload() {
  bg = loadImage('assets/bg.png');
  BandaSonora = loadSound('./assets/NinjaNoseCuanto.mp3');
  efectoSaltar = loadSound('./assets/salto.wav');
  //efectoCaminar = loadSound('./assets/caminar.wav')
}

function setup() {
  createCanvas(600, 300, "pixelated");

  BandaSonora.setVolume(0.5);
  BandaSonora.loop();

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
  grass.img = 'assets/block.png';
  grass.h = 15;
  grass.w = 15;
  grass.layer = 0;
  grass.collider = "static";
  grass.tile = "g";

  water = new Group();
  water.img = 'assets/water.png';
  water.layer = 2;
  water.h = 18;
  water.w = 18;
  water.collider = "none";
  water.tile = "w";
  water.layer = 1;

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
  sands.img = 'assets/arena.png';
  sands.color = 'brown'
  sands.collider = "static";
  sands.w = 15;
  sands.h = 15;
  sands.tile = "p";
  sands.collider = "static";
  sands.broken = false;

  logs = new Group();
  logs.img = 'assets/madera.png';
  logs.color = 'gray'
  logs.collider = "static";
  logs.w = 15;
  logs.h = 15;
  logs.tile = "b";

  player = new Sprite();
  player.w = 12;
  player.h = 28;
  player.img = 'assets/marionormal.png';
  player.rotationLock = true;
  player.friction = 0;
  player.layer = 1;
  player.tile = "v";
  player.overlaps(coins, collectCoin);
  player.layer = 2;


  door = new Group();
  door.w = 2;
  door.h = 100;
  door.visible = true;
  door.collider = 'static'
  door.color = 'black'
  door.tile = "u";

  //etiqueten a mamamelmonstruo

  logs = new Group();
  logs.layer = 2;
  logs.color = "violet";
  logs.h = 10;
  logs.w = 10;
  logs.collider = "static";
  logs.tile = "h";

  level1 = new Tiles(
    [
      "  g                                                                                                                     ",
      "  g                                                                                                                    g                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              ",
      "  g                                                                                                                  g                                                                                                                                                                                                                                               g         g                                                                                                                                                                                                                                                                                                                      ",
      "  g                                                                                                                    g                                                                                                                                                                                                                                             g         g                                                                                                                                                                                                                                                                                                                      ",
      "   g                                                                                                                   g                                                                                                                                                                                                                                             g         g                                                                                                                                                                                                                                                                                                                      ",
      "   g                                                                                                                 g                                                                                                                                                                                                                                               g         g                                                                                                                                                                                                                                                                                                                      ",                                                                                   
      "   g                                                                                                             ggggggg                                                                                                                                                                                                                                             ggggggggggggggg                                                gggggggggggggggggggggggggggg                                                                                                                                                                                                                                      ",
      "   g                                                                                                         gggg                                                                                                                                                                                                                                                     bbccc         ggggggg                                  ggggggg                            gggg                                                                                                                                                                                                                                  ",
      "    g                                                                                                       g  g   c c                                                                                                       g                                                                                                                                        bbccc       c        gggggg                      gggggg          c                            gggg                                                                                                                                                                                                                              ",
      "    g                                                                                                         gg c                                                                                                          g                                                                                g                                                        bbccc                      gggggg          gggggg                                                  ggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggguggggggg                                                                                                        ",
      "    g                                                                                                          g   c  c                                                                                                      g                                                       gggggggggggggggggggggggggug                                                    ggggggggggggggggwwwwwwwwwwwwwwwwwwwggggggggggwwwwwwwwwwwwwwwwwwwgggggpppppppppppppppppgggggg                          hhh                              hhh                                  hhh                            gggggg                                                                                                  ",
      "     ggg                                                                                              gggg      g  c                                                                                              gwwwwwwwwwg                                               ggggggggg                                                                                               gggggggwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwggggggg     ggggggggggggggggg     g                          h                                h                                    h                                   ggggg                                                                                             ",
      "      gg                                                                                              g  g       g  c cc                                                                                  gggg      gwwwwwwwwwg                                         ggggggggg                                                                     ggggggggg                            ggggggwwwwwwwwwwwwwwwwwwwwwwgggggg                                  g                 c                      h                                      h                                h                                                                                                                    ",
      "     g                                                                                                g  g       g  c                                                                                             gwwwwwwwwwggggggggggggggggggggggggggggggggggggggggggggg                                                                                                                        ggggggwwwwwwwwwwgggggg                                        g                                       hhh                                    hhh                              hhh                                                                                                                    ",
      "     g                                                                                              gg    g       gggggg                                     c                                  gggg             gwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww                    ggggggggggggggggggggggggg          gggggggggg                                                      gggggggggg                                              g         gggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggugg                               g                                          g                                  ",
      "     g                                                             gg                   ggggppppppppg     g        bbbbb                                                                                         gwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwggggggggggggggg                                                                                                                                                          g    c      wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww                                   g                                          g                                  ",
      "    g                                                    ggg       gg                   g  gggggggggg     g        bbccc                                   gggggg                     ggggg                      gwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwgggggggggg                                                                                                                                                                    gwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww                                    g                                          g                                  ",
      "    g                                                    g  gggg   gg     gggggggggg    g  g        g     g        bbccc                         ggggg                  ggggggg                                  ggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg                                                                                                                                                                       gwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww                ggggggg             gggggggggggggggggggggggggggggggggggggggggggg                                  ",
      "    g                                           gggggg   g     g   g g    g        g    g  g        g     g      gggggggggggg       ggggg                                                                                                                                                                                                                                                                                                                      gwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww         ggggggg                                                                                                  ",
      "    g          v                                g    g   g    g    g g   g         g    g  g         g    g      g                                                                                                                                                                                                                                                                                                                                             gggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg                                                                                                         ",
      "     ggwwwwwgggggggggggggggggggggggggggggggggggg     g  g     g    g g   ggg               g          g   g       g                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   ",
      "       gwwwg                                         g  g     g    g g      g             g           g   g        g                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  ",
      "        ggg                                         g   g     g    g g      g             g           g   g        g                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  ",
    ],                              
    -180,
    -70,
    16,
    16
  );


  groundSensor = new Sprite(56, 250, 1, 20);
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
  background('gray')
  Game();
}

function Game() {
  if (juegoIniciado) {
    fill(0);
    text("Score: " + score, 530, 20);
    fill(0);
    text("Live: " + live, 530, 40);
    camera.x = player.x - (-100);
    elementControl();
    elementBullets()
    checkPowerUp();
    movePlayer();
    elementMove()
    keyPressed()
    Loque()
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
  if (kb.pressing('left')) player.vel.x = -10;
  else if (kb.pressing('right')) player.vel.x = 10;
  else player.vel.x = 0;
  if (kb.pressing('up')) player.vel.y = -5;
  else if (kb.pressing('down')) player.vel.y = 5;
  else player.vel.y = 0;

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
      efectoSaltar.play()
    }
  }

  if (kb.pressing("left")) {
    player.vel.x = -2;
    player.mirror.x = true;
    //efectoCaminar.play();
  } else if (kb.pressing("right")) {
    player.vel.x = 2;
    player.mirror.x = false;
    //efectoCaminar.play();
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
    player.img = 'assets/marioagua.png';
  } else if (kb.pressing("l")) {
    elementoActual = "fuego";
    player.img = 'assets/mariofuego.png';
  } else if (kb.pressing("p")) {
    elementoActual = "electrico";
    player.img = 'assets/marioelectrico.png';
  } else if (kb.pressing("ñ")) {
    elementoActual = "viento";
    player.img = 'assets/marioviento.png';
  }
}

function elementBullets() {
  if (mouse.presses() && elementoActual === "fuego") {
    let bullet = new Sprite(player.x, player.y);
    bullet.diameter = 8;
    let angle = atan2(mouseY - player.y, mouseX - player.x);
    let speedx = 10;
    let speedy = 5;
    bullet.vel.x = cos(angle) * speedx;
    bullet.vel.y = sin(angle) * speedy;
    bullet.color = "orange";
    bullet.collides(grass, (bullet, grass) => {
      bullet.remove();
    })
    bullet.collides(logs, (bullet, logs) => {
      bullet.remove();
      logs.remove()
    });
  }

  if (mouse.presses() && elementoActual === "electrico") {
    let bullet = new Sprite(player.x, player.y);
    bullet.h = 2;
    bullet.w = 10;
    let angle = atan2(mouseY - player.y, mouseX - player.x);
    let speed = 10;
    bullet.vel.x = cos(angle) * speed;
    bullet.vel.y = sin(angle) * speed;
    bullet.color = "yellow";
    bullet.collides(grass, (bullet, grass) => {
      bullet.remove();
    });
    bullet.collides(door, (bullet, door) => {
      bullet.remove();
      door.rotation = 90
    });
  }
}

function keyPressed() {
  if (key === 'm' || key === 'M') {
    if (BandaSonora.isPlaying()) {
      BandaSonora.pause();
    } else {
      BandaSonora.play();
    }
  }
}

function Loque() {
  if (groundSensor.overlapping(water)) {
    if (elementoActual === "fuego" || elementoActual === "viento" || elementoActual === "electricoº") {
      player.x = 50;
      player.y = 220;
    }
  }
  if (groundSensor.overlapping(grass)) {
    if (elementoActual === "agua") {
      player.x = 50;
      player.y = 220;
    }
  }
}