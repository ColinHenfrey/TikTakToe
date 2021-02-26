var board;

function setup(){
  createCanvas(800, 800);
  background(0);
  rectMode(CENTER);
  startGame();
  
}

function startGame(){
  board = new Board();
  //flip a coin on who starts
  //AIMove();
  
}

function draw(){
  background(0);
  drawBoard();
  var moved = waitForPlayerMove();
  board.update();
  if(moved && !board.gameOver){
    AIMove();
    moved = false;
  }
}

function keyPressed(){
  if(board.gameOver){
    startGame();
  }
}

function drawBoard(){
  noStroke();
  fill(255);
  //top
  rect(400, 300, 600, 10);
  //bottom
  rect(400, 500, 600, 10);
  //left
  rect(300, 400, 10, 600);
  //right
  rect(500, 400, 10, 600);
  
}

function waitForPlayerMove(){
  if(mouseIsPressed && mouseX >= 100 && mouseX <= 700 && mouseY >= 100 && mouseY <= 700){
     var row = -1;
     var col = -1;
     //select the chosen square
     col = (mouseX - 100)/200.0;
     row = (mouseY - 100)/200.0;
     //If move is successfully made return true (check that player made a valid move)
     if(board.makeMove(floor(row), floor(col), 'x')){
       return true;
     }
    }
    return false;
  
}

function AIMove(){
  var gamestate = new Gamestate(board, 'o', undefined);
  var bestMove = gamestate.getBestMove();
  print(bestMove[0], bestMove[1])
  board.makeMove(bestMove[0], bestMove[1], 'o');
  
}

