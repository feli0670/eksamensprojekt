let playerImg, playerExplosionImg
let enemyImg = []
let enemy1Img, enemy2Img, enemy3Img, enemy4Img, enemy5Img;
let redEnemyImg;
let bulletImg;

let font;

let health;

let player, bunkers, enemies, redEnemy;

let myHighScore = JSON.parse(localStorage.getItem('myScore'));
let score = 0;

let gameStarted;

// let xPos;
// let yPos;

window.onbeforeunload = function () {
  localStorage.setItem('myScore', JSON.stringify(myHighScore));
}

function setup() {
  createCanvas(1200, 800); //canvas size defined
  rectMode(CENTER);
  imageMode(CENTER);
  textAlign(CENTER, CENTER)
  textFont(font)
  gameStarted = false
  initializeObjects()
  if (myHighScore === null) {
    myHighScore = 0;
  }

}

function draw() {
    if ((player.alive || !player.alive)) {
      fill('#71f200')
      rect(width/2,height/2,width,height)
      fill('black')
      rect(width/2,height/2,width-20,height-20)
      
      
      player.update(gameStarted) //calls update method for the player
      bunkers.update(player, enemies) //calls update method for the enemies with argument of player and enemies
      enemies.update(player, gameStarted) //calls update method for the enemies with argument of player
      
      scoreboard() //displays scoreboard
  
      
    } 
  
  if (!player.alive) {
    gameStarted = false
    
  } 
  if (!gameStarted) {
    menu()
  }
  
  
}

//runs once when a key is pressed
function keyPressed() {
  if (player.alive) {
    player.controller() //calls method that makes player move and shoot when key pressed

  }
}

function scoreboard() {
  textSize(50);
  fill('#71f200')
  text(player.bulletCounter, width / 2, 50) //displays number of fired bullets
  text(myHighScore, width / 2+100, 50) //displays number of fired bullets
  text(score, width / 2+200, 50) //displays number of fired bullets
  
  textSize(20)
}

function menu() {
  let xOffset = width / 2
  let yOffset = height / 1.9
  let buttonWidth = 300
  let buttonHeight = 50
  let buttonFill;
  let buttonStroke;

  
  let title;
  let buttonText;

  if (player.alive) {
    title = 'Space Invaders'
    buttonText = 'Start'
  } else {
    myHighScore = score; 
    title = 'Game Over'
    buttonText = 'Restart'
  }

  
  fill(87, 89, 96, 127);
  rect(xOffset, height/2, width - 20, height - 20);
  
  fill(87, 89, 96, 230);
  stroke(113, 242, 0)
  rect(xOffset, yOffset-85, 800, height/2.5)

  fill('#71f200')
  textSize(100)
  text(title, width / 2, height / 3);

  
  if (mouseX >= xOffset - buttonWidth / 2 && mouseX <= xOffset + buttonWidth / 2
    && mouseY >= yOffset - buttonHeight / 2 && mouseY <= yOffset + buttonHeight / 2) {
    buttonFill = '#71f200'
    buttonStroke = 'black'
    if (mouseIsPressed) {
      initializeObjects()
      gameStarted = true
    }
  } else {
    buttonFill = 'black'
    buttonStroke = '#71f200'

  } 
    fill(buttonFill)
    stroke(buttonStroke)
    rect(xOffset, yOffset, buttonWidth, buttonHeight)
    fill(buttonStroke)
    textSize(35)
    text(buttonText, xOffset, yOffset);
}
  

function initializeObjects() {
  player = new Player(width / 2, height - 75); //object of Player class is instantiated
  player.setHealth()
 
  enemies = new EnemiesInGame() //object of EnemisInGame class is instantiated
  enemies.setup() //calls setup method for the object that instansiates enemies
  
  bunkers = new BunkersInGame() //object of BunkersInGame class is instantiated
  bunkers.setup() //calls setup method for the object that instansiates bunkers
  
  redEnemy = new RedEnemy(width / 2, height / 2)
}



//preload of images
function preload() {
  playerImg = loadImage('images/player.png')
  for (let i = 5; i >= 1; i--) {
    let img = loadImage(`images/enemy${i}.png`);
    enemyImg.push(img);
  }
  enemyImg.push(loadImage('images/playerExplosion.gif'))
  playerExplosionImg = loadImage('images/playerExplosion.gif')

  bulletImg = loadImage('images/bullet.png')
  redEnemyImg = loadImage('images/redEnemy.png')

  font = loadFont('font/poxel-font.ttf')
}
