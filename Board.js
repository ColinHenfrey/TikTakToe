class Board{
 
 constructor(){
  this.clearBoard();
 }
 
 
 
 //add's the player's character to the given row and columb
 makeMove(row, col, value){
   if(this.isValidMove(row, col)){
    this.boardState[row][col] = value;
    this.checkForWin();
    this.availableMoves--;
    return true;
   }
   return false;
 }
 
 clearBoard(){
  this.gameOver = false;
  this.win = '/';
  this.boardState = [['/', '/', '/'], ['/', '/', '/'], ['/', '/', '/']];
  this.availableMoves = 9;
 }
 
 printBoard(){
  print(" -------");
  print("  " + this.boardState[0][0] + " " + this.boardState[0][1] + " " + this.boardState[0][2]);
  print("  " + this.boardState[1][0] + " " + this.boardState[1][1] + " " + this.boardState[1][2]);
  print("  " + this.boardState[2][0] + " " + this.boardState[2][1] + " " + this.boardState[2][2]);
  print(" -------");
   
 }
 
 //check for win, loss or tie then display the board
 update(){
   if(this.win == 'x'){
     text("Player x wins!!!", 300, 30);
     this.gameOver = true;
   }
   else if(this.win == 'o'){
     text("Player o wins!!!", 300, 30);
     this.gameOver = true;
   }
   else if(this.availableMoves <= 0){
     text("TIE!!!", 360, 30);
     this.gameOver = true;
   }
   if(this.gameOver){
     text("Press Any Key To Restart", 210, 80);
   }
  this.show();
 }
 
 show(){
   for(var col = 0; col < 3; col++){
    for(var row = 0; row < 3; row++){
      if(this.boardState[row][col] == 'x'){
       noStroke();
       fill(255);
       push();
       translate(200 + col*200, 200 + row*200);
       //Rotate right 45 degrees and draw a straight rect
       rotate(PI/4);
       rect(0, 0, 10, 150);
       //Rotate left 90 degrees (to -45 degrees) and draw a straight rect
       rotate(-PI/2);
       rect(0, 0, 10, 150);
       pop();
       
      }
      else if(this.boardState[row][col] == 'o'){
       fill(0);
       strokeWeight(13);
       stroke(255);
       ellipse(200 + col*200, 200 + row*200, 130, 130);
      }
    }
   }
   
   stroke(255);
   textSize(30);
   
 }


 checkForWin(){
   var winner = '/';
   //Check all possible horrizontal and vertical lines
   for(var i = 0; i < 3; i++){
     if(this.boardState[0][i] == this.boardState[1][i] && this.boardState[1][i] == this.boardState[2][i] && this.boardState[0][i] != '/'){
       winner = this.boardState[0][i];
     }
     else if(this.boardState[i][0] == this.boardState[i][1] && this.boardState[i][1] == this.boardState[i][2] && this.boardState[i][0] != '/'){
       winner = this.boardState[i][0]; 
     }
   }
   //Check diagonals
   if(this.boardState[0][0] == this.boardState[1][1] && this.boardState[1][1] == this.boardState[2][2] && this.boardState[0][0] != '/'){
     winner = this.boardState[0][0];
   }
   else if(this.boardState[2][0] == this.boardState[1][1] && this.boardState[1][1] == this.boardState[0][2] && this.boardState[2][0] != '/'){
     winner = this.boardState[2][0];
   }
   this.win = winner;
   if(this.win != '/'){
     return true;
   }else{
     return false;
   }
 }
 
 //Check if board is full
 isFull(){
   if(this.availableMoves <= 0){
     return true;
    }else{
      return false; 
    }
 }
 
 //Checks if the position is already taken
 isValidMove(row, col){
   if(row >= 0 && row <= 2 && col >= 0 && col <= 2 && this.gameOver == false){
    if(this.boardState[row][col] == '/'){
      //print(this.boardState[row][col]);
      return true;
    }
   }
   //print(this.boardState[row][col] + row + col + this.gameOver);
   return false;
 }
 
  copyBoard(){
   var b = new Board();
   b.boardState = [['/', '/', '/'], ['/', '/', '/'], ['/', '/', '/']];
   for(var row = 0; row < 3; row++){
     for(var col = 0; col < 3; col++){
       b.boardState[row][col] = this.boardState[row][col];
     }
   }
   b.availableMoves = this.availableMoves;
   return b;
   
 }
  
}