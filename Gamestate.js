
//Note: The NPC assumes it is playing a flawless character therefor it does not weight moves that could lead to a mistake any higher than moves that lead to a tie.
//This is something that could be improved in the future
class Gamestate{
  constructor(b, player, nextMove){
    //Make move passed by parent
    this.children = [];
    this.winningMove = [-1, -1];
    this.score = 0
    this.board = b;
    if(nextMove != undefined){
      //print(nextMove)
      this.lastMove = nextMove;
      b.makeMove(nextMove[0], nextMove[1], nextMove[2]);
    }
    //check if there is a winning move for the player
    //I assume that if there is a winning move either player will do it
    var moved = this.checkForWin(b, player);
    /*
    If the player didn't win Check if there is a counter Move
    I assume that if there is no winning move then the player will always do a counter
    move if it exists
    */
    if(!moved){
      moved = this.checkForCounter(b, player);
    }
    //If there is no winning or counter move then create a Gamestate for every available move
    if(!moved){
    if(b != null){
      for (var row = 0; row < 3; row++) {
        for (var col = 0; col < 3; col++) {
            if (b.isValidMove(row, col)) {
                  var move = [row, col, player];
                  moved = true;
                  this.children.push(new Gamestate(b.copyBoard(), this.getOpponent(player), move));
                  //We need to set the score after the subBoaard is created becasue
                  //The score is determined by the childrens scores
                  this.score = this.getScoreFromChildren(player);
              
              
              }
            }
        }
      }
    }
    //if moved is still false then the board is full and no one won therefore the score is 0
    if(!moved){
      this.score = 0;
    }
  }
  
  //Checks if a wining move exists
  checkForWin(b, player){
    for (var row = 0; row < 3; row++) {
        for (var col = 0; col < 3; col++) {
          if(this.isWin(b, row, col, player)){
            if(player == 'o'){
              this.score = 1;
              this.winningMove[0] = row;
              this.winningMove[1] = col;
            }else if(player == 'x'){
              this.score = -1;
            }
            return true;
          }
        }
    }
    return false;
  }
  
  checkForCounter(b, player){
    var opponent = this.getOpponent(player);
    var counterMove = [-1, -1, -1];
    for (var row = 0; row < 3; row++) {
        for (var col = 0; col < 3; col++) {
          if(this.isWin(b, row, col, opponent)){
            counterMove[0] = row;
            counterMove[1] = col;
            counterMove[2] = player;
          }
        }
    }
    if(counterMove[0] != -1){
      //Create another Gamestate with the counterMove.
      this.children.push(new Gamestate(b.copyBoard(), this.getOpponent(player), counterMove));
      //When there is a counter move there will only be one child
      //Therefore score will be equal to the childs score.
      this.score = this.children[0].score;
      return true;
    }else{
    return false;
    }
  }
  
  //checks every child's score are return's the move that created the one with the highest score.
  getBestMove(){
    //using an int set to 0 rather than an Integer because an Integer cannot be cast to a char
    if(this.winningMove[0] != -1){
      print("winning move already calculated");
      return this.winningMove;
    }
    else{
     var bestMove = [0];
     var bestScore = null;
      var len = this.children.length
     while(len--){
        if(this.children[len].lastMove != undefined && (bestScore == null || this.children[len].score > bestScore)){
          bestMove = this.children[len].lastMove;
          bestScore = this.children[len].score;
        }else if(this.children[len].score == bestScore && this.children[len].lastMove != undefined){
          bestMove = this.children[len].lastMove;        
       }
     }
     return bestMove;
   }
  }
  
  //returns the opposing player character
  getOpponent(player){
    if(player == 'o'){
      return 'x';
    }
    else if(player == 'x'){
      return 'o';
    }
    else{
      return '/';
    }
  }
  
  /*
  If it is x's turn it will return the lowest score
  If it is o's turn it will return the highest score
  The result will always be -1, 0 or 1 as each move should lead to a loss, tie or win
  */
  getScoreFromChildren(player){
    var len = this.children.length;
    if(player == 'o'){
      var highest = null;
      while(len--){
        if(highest == null || this.children[len].score > highest){
          highest = this.children[len].score;
        }
      }
      return highest;
    } else if(player == 'x'){
      var lowest = null;
      while(len--){
        if(lowest == null || this.children[len].score < lowest){
          lowest = this.children[len].score;
        }
      }
      return lowest;
    }else{
      print("returning null")
      return null;
    }
  }
  
  //Creates a copy of the board then makes the given move and checks if the player has won.
  isWin(board, row, col, player){
    var b = board.copyBoard();
    b.makeMove(row, col, player);
    return b.checkForWin();
  }
  
}