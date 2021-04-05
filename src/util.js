export default class Util {

  randomNumber() {
    return Math.random()>=0.5?2:4;
  }

  randomPosition(gameArray) {
    let availList = [[0,0],[0,1],[0,2],[0,3],[1,0],[1,1],[1,2],[1,3],[2,0],[2,1],[2,2],[2,3],[3,0],[3,1],[3,2],[3,3]];
    let x = 0;
    let y = 0;
    do{
      let randomPos = Math.floor(Math.random()*availList.length);
      x = availList[randomPos][0];
      y = availList[randomPos][1];
      if(gameArray[x][y]){
        availList.splice(randomPos,1);
      }
    }while(gameArray[x][y] && availList.length>0)
    
    return {
      x:x,
      y:y
    }
  }

  isNoBlockRow(row,yEnd,yStart,gameArray) {
    for(let i=yStart+1; i<yEnd; i++){
      if(gameArray[row][i]>0)
        return false;
    }
    return true;
  }

  isNoBlockCol(col,xEnd,xStart,gameArray) {
    for(let i=xStart+1; i<xEnd; i++){
      if(gameArray[i][col]>0)
        return false;
    }
    return true;
  }

}