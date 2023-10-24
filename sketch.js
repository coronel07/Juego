let player, grass, water, coins, groundSensor;
let elementoActual = "";
let juegoIniciado = false;
let powerUP;
let hasPowerUp = false;
let score = 0;
let live = 3
let saltosRealizados = 0;
let bg
let BandaSonora;
let efectoSalto;
let efectoCaminar;
let x = 0;



function preload() {
  inicio = loadImage('./assets/inicio.png')
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


  grass = new Group();
  grass.color = "green";
  grass.img = 'assets/block.png';
  grass.visible = false
  grass.h = 15;
  grass.w = 15;
  grass.layer = 0;
  grass.collider = "static";
  grass.tile = "g";

  water = new Group();
  water.img = 'assets/water.png';
  water.visible = false
  water.layer = 2;
  water.h = 18;
  water.w = 18;
  water.collider = "none";
  water.tile = "w";
  water.layer = 1;

  coins = new Group();
  coins.color = "yellow";
  coins.visible = false
  coins.h = 5;
  coins.w = 5;
  coins.collider = "static";
  coins.tile = "c";

  powerUP = new Group();
  powerUP.visible = false
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
  sands.visible = false
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
  logs.visible = false
  logs.collider = "static";
  logs.w = 15;
  logs.h = 15;
  logs.tile = "b";

  player = new Sprite();
  player.visible = false
  player.w = 12;
  player.h = 28;
  player.img = 'assets/ninjanormal.png';
  player.rotationLock = true;
  player.friction = 0;
  player.layer = 1;
  player.tile = "v";
  player.overlaps(coins, collectCoin);
  player.layer = 2;


  door = new Group();
  door.w = 2;
  door.visible = false
  door.h = 100;
  door.visible = true;
  door.collider = 'static'
  door.color = 'black'
  door.tile = "u";

  //etiqueten a mamamelmonstruo

  esca = new Group();
  esca.img = 'assets/esca.png'
  esca.visible = false
  esca.layer = 2;
  esca.color = "violet";
  esca.h = 10;
  esca.w = 10;
  esca.collider = "static";
  esca.tile = "h";
  

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
      "    g                                                                                                       g  g   c c                                                                                                       g                                                                                                                                        bbccc       c        gggggg                      gggggg          c               c            gggg                                                                                                                                                                                                                              ",
      "    g                                                                                                         gg c                                                                                                          g                                                                                g                                                        bbccc                      gggggg          gggggg                                                  ggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggguggggggg                                                                                                        ",
      "    g                                                                                                          g   c  c                                                                                               c      g                                                       gggggggggggggggggggggggggug                                                    ggggggggggggggggwwwwwwwwwwwwwwwwwwwggggggggggwwwwwwwwwwwwwwwwwwwgggggpppppppppppppppppgggggg                          hhh                              hhh                                  hhh                           gggggg                                                                                                  ",
      "     ggg                                                                                              gggg      g  c                                                                                             gwwwwwwwwwggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg                                                                 c                            gggggggwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwggggggg     ggggggggggggggggg     g                           h                                h                                    h                                   ggggg                                                                                             ",
      "      gg                                                                                              g  g       g  c cc                                                                                  gggg   gwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww                                                                     ggggggggg                             ggggggwwwwwwwwwwwwwwwwwwwwwwgggggg                                   g                 c                    h           c                          h           c                    h                                                                                                                    ",
      "     g                                                                                                g  g       g  c                                                                            c               gwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww                    c                                                                                           ggggggwwwwwwwwwwgggggg                                          g                                     hhh                                    hhh                              hhh                                                                                                                    ",
      "     g                                                                                              gg    g       gggggg                                     c                                  gggg             gwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww                    ggggggggggggggggggggggggg          gggggggggg                                                    gggggggggg                                                g         gggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggugg                               g                                          g                                  ",
      "     g                                                             gg                   ggggppppppppg     g        bbbbb                                                                                         gwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwggggggggggggggg                                                                                                                                                          g    c      wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww                 c                 g                                          g                                  ",
      "    g                                                    ggg       gg          c        g  gggggggggg     g        bbccc                                   gggggg                     ggggg                      gwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwgggggggggg                                                                                                                                                                    gwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww                                    g                                          g                                  ",
      "    g                                                    g  gggg   gg     gggggggggg    g  g        g     g        bbccc                         ggggg                  ggggggg                                  ggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg                                                                                                                                                                       gwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww                ggggggg             gggggggggggggggggggggggggggggggggggggggggggg                                  ",
      "    g                                           gggggg   g     g   g g    g        g    g  g        g     g      gggggggggggg       ggggg                                                                                                                                                                                                                                                                                                                      gwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww         ggggggg                                                                                                  ",
      "    g          v                                g    g   g    g    g g   g         g    g  g         g    g      g                                                                                                                                                                                                                                                                                                                                             gggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg                                                                                                         ",
      "     ggwwwwwgggggggggggggggggggggggggggggggggggg     g  g     g    g g   ggg               g          g   g       g                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   ",
      "       gwwwg                                         g  g     g    g g      g             g           g   g        g                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  ",
      "        ggg                                         g   g     g    g g      g             g           g   g        g                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  ",
      "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
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
}

function collectCoin(player, coin) {
  coin.remove();
  score++;
}

function draw() {
  
  Game();
}

function Game() {
  if (juegoIniciado) {
    background('#524646')
    fill(255);
    textSize(15)
    text("Score: " + score, 530, 20);
    fill(255);
    textSize(15)
    text("Live: " + live, 530, 40);
    camera.x = player.x - (-100);
    elementControl();
    elementBullets()
    checkPowerUp();
    movePlayer();
    elementMove()
    keyPressed()
    Loque()
    player.visible = true
    door.visible = true
    esca.visible = true
    sands.visible = true
    logs.visible = true
    coins.visible = true
    water.visible = true
    grass.visible = true
    water.visible = true
  } else {
    background(inicio)

    if (keyIsDown(32)) {
      juegoIniciado = true;
    }
  }
  if (live === 0) {
    juegoIniciado = false
    background('black')
    fill(255);
    text("Game Over", width / 2, height / 2);
    textSize(15)
    text("Preisone R para reiniciar", width / 2, height / 2 + 25);
    player.visible = false
    door.visible = false
    esca.visible = false
    sands.visible = false
    logs.visible = false
    coins.visible = false
    water.visible = false
    grass.visible = false
    water.visible = false
  }
}

function movePlayer1() {
  if (kb.pressing('left')) player.vel.x = -10;
  else if (kb.pressing('right')) player.vel.x = 10;
  else player.vel.x = 0;
  if (kb.pressing('up')) player.vel.y = -5;
  else if (kb.pressing('down')) player.vel.y = 5;
  else player.vel.y = 0;

}

function movePlayer() {
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
      player.vel.y = -4;
      efectoSaltar.play()
    }
  }

  if (kb.pressing("left")) {
    player.vel.x = -3;
    player.mirror.x = true;
    //efectoCaminar.play();
  } else if (kb.pressing("right")) {
    player.vel.x = 3;
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

function elementBullets() {
  if (mouse.presses() && elementoActual === "fuego") {
    let bullet = new Sprite(player.x, player.y);
    bullet.diameter = 10;
    let angle = atan2(mouseY - player.y, mouseX - player.x);
    let speedx = 10;
    let speedy = 10;
    bullet.vel.x = cos(angle) * speedx;
    bullet.vel.y = sin(angle) * speedy;
    bullet.img = "assets/fuego.png";
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
    bullet.img = "assets/rayo.png";
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
      live --
    }
  }
  if (groundSensor.overlapping(grass)) {
    if (elementoActual === "agua") {
      player.x = 50;
      player.y = 220;
    }
  }

  if (player.overlapping(deathBox)) {
    player.x = 50;
    player.y = 220;
    live --
  }
}


  
