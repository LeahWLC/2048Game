import Util from './util.js'
import Animation from './animation.js'

export default class GameManager {

  constructor(){
    this.score = 0;
    this.containerWidth = 500;
    this.gameArray = [];
    this.gridContainer = document.getElementById('grid-container');
    this.startX = 0;
    this.startY = 0;
    this.endX = 0;
    this.endY = 0;
    this.animation = new Animation();
    this.util = new Util();

    this.initView();
    this.listen();
  }

  initData() {
    for (let x = 0; x < 4; x++) {
      this.gameArray[x] = [];
      for (let y = 0; y < 4; y++) {
        this.gameArray[x][y]=0;
      }
    }
    this.score = 0;
    this.updateScore();
  }

  initView() {
    if(screen.availWidth>500){
      this.containerWidth = 500;
    }else{
      this.containerWidth = screen.availWidth*0.8;
    }

    this.gridContainer.style.height = this.containerWidth+'px';
    this.gridContainer.style.width = this.containerWidth+'px';
    for (let x = 0; x < 4; x++) {
      for (let y = 0; y < 4; y++) {
        let gridCell = document.getElementById('grid-cell-'+x+'-'+y);
        gridCell.style.height = this.containerWidth*0.225 +'px';
        gridCell.style.top = this.containerWidth*0.02*(x+1) + this.containerWidth*0.225*x + 'px';
        gridCell.style.left = this.containerWidth*0.02*(y+1) + this.containerWidth*0.225*y + 'px';
       }
    }

    this.newGame();
  }

  newGame() {
    this.initData();
    this.createNumberCell();
    this.createNumberCell();
    setTimeout(this.updateView.bind(this), 205);
  }
  
  createNumberCell() {
    if(this.ifGameOver()){
      return;
    }
    let randomNum = this.util.randomNumber();
    let randomPos = this.util.randomPosition(this.gameArray);
    this.gameArray[randomPos.x][randomPos.y] = randomNum;
    this.animation.addCellAni(randomPos.x,randomPos.y,randomNum,this.containerWidth,this.gridContainer);
  }

  updateView() {
    this.clearView();
    
    for (let x=0; x<4; x++){
      for(let y=0; y<4; y++){
        if(this.gameArray[x][y]){
          let numberCell = document.createElement('div');
          numberCell.innerText = this.gameArray[x][y];
          numberCell.setAttribute('class','grid-number number-'+this.gameArray[x][y]);
          numberCell.setAttribute('id','grid-number-'+x+'-'+y);

          numberCell.style.height = this.containerWidth*0.225 +'px';
          numberCell.style.width = this.containerWidth*0.225 +'px';
          numberCell.style.lineHeight = this.containerWidth*0.225 +'px';
          numberCell.style.top = this.containerWidth*0.02*(x+1) + this.containerWidth*0.225*x + 'px';
          numberCell.style.left = this.containerWidth*0.02*(y+1) + this.containerWidth*0.225*y + 'px';

          this.gridContainer.appendChild(numberCell);
        }
      }
    }
  }

  clearView() {
    let gridNumList = document.querySelectorAll('.grid-number');
    let len = gridNumList.length;
    for (let i = 0; i < len; i++) {
      this.gridContainer.removeChild(gridNumList[i]); 
    }
  }

  updateScore() {
    document.getElementById('score').innerText = this.score;
  }

  listen() {
    let self = this;
    document.addEventListener('keydown',(event)=> {
      //37left,38up,39right,40down
      switch(event.keyCode)
      {
        case 37:
          event.preventDefault();
          this.move(0);
          break;
        case 38:
          event.preventDefault();
          this.move(2);
          break;
        case 39:
          event.preventDefault();
          this.move(1);
          break;
        case 40:
          event.preventDefault();
          this.move(3);
          break;
        default:
          break;
      }
    })

    this.gridContainer.addEventListener('touchstart',(event)=>{
      self.startX = event.touches[0].pageX;
      self.startY = event.touches[0].pageY;
    })

    this.gridContainer.addEventListener('touchmove',(event)=>{
      event.preventDefault();
    })

    this.gridContainer.addEventListener('touchend',(event)=>{
      self.endX = event.changedTouches[0].pageX;
      self.endY = event.changedTouches[0].pageY;

      var absX = self.endX - self.startX;
      var absY = self.endY - self.startY;

      if(Math.abs(absX)<20 && Math.abs(absY)<20){
        return;
      }

      if(Math.abs(absX) >= Math.abs(absY)){
        if(absX>0){//Right
          this.move(1);
        }else{//Left
          this.move(0);
        }
      }else{
        if(absY>0){//Down
          this.move(3);
        }else{//Up
          this.move(2);
        }
      }
    })

    let newGame = document.getElementById('newGame');
    newGame.addEventListener('click',(event)=> {
      this.newGame();
    })
  }

  move(tag) {
    //0:left,1:right,2:up,3:down
    switch(tag)
    {
      case 0:
        if(this.ifCanToLeft()){
          this.addToLeft();
          this.createNumberCell();
          setTimeout(this.updateView.bind(this), 210);
        }else{
          this.ifGameOver();
        }
        break;
      case 2:
        if(this.ifCanToUp()){
          this.addToUp();
          this.createNumberCell();
          setTimeout(this.updateView.bind(this), 210);
        }else{
          this.ifGameOver();
        }
        break;
      case 1:
        if(this.ifCanToRight()){
          this.addToRight();
          this.createNumberCell();
          setTimeout(this.updateView.bind(this), 210);
        }else{
          this.ifGameOver();
        }
        break;
      case 3:
        if(this.ifCanToDown()){
          this.addToDown();
          this.createNumberCell();
          setTimeout(this.updateView.bind(this), 210);
        }else{
          this.ifGameOver();
        }
        break;
      default:
        break;
    }
  }

  ifGameOver() {
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if(this.gameArray[i][j]==0){
          return false;
        }
      }
    }
    if(this.ifCanToLeft() || this.ifCanToRight() || this.ifCanToUp() || this.ifCanToDown()){
      return false;
    }

    alert('游戏结束');
    return true;
    
  }

  ifCanToLeft() {
    for (let x=0; x<4; x++) {
      for (let y=1;y<4; y++) {
        if(this.gameArray[x][y] && (this.gameArray[x][y-1]==0 || this.gameArray[x][y-1]==this.gameArray[x][y])){
          return true;
        }
      }
    }
    return false;
  }

  addToLeft() {
    for (let x=0; x<4; x++) {
      let flag = [false,false,false,false];
      for (let y=1;y<4; y++) {
        if(this.gameArray[x][y]){
          for(let m=0; m < y; m++){
            if((this.gameArray[x][m]==0 || this.gameArray[x][m]==this.gameArray[x][y]) && this.util.isNoBlockRow(x,y,m,this.gameArray)){
              if(flag[m]){
                continue;
              }else if(this.gameArray[x][m]>0){
                flag[m]= true;
                this.score += this.gameArray[x][m]*2;
                this.updateScore();
              }
              this.gameArray[x][m] += this.gameArray[x][y];
              this.gameArray[x][y] = 0; 
              this.animation.moveCellAni(x,y,x,m,this.containerWidth);
              break;
            }
          }
        }
      }
    }
  }

  ifCanToRight() {
    for (let x=0; x<4; x++) {
      for (let y=0;y<3; y++) {
        if(this.gameArray[x][y] && (this.gameArray[x][y+1]==0 || this.gameArray[x][y+1]==this.gameArray[x][y])){
          return true;
        }
      }
    }
    return false;
  }

  addToRight() {
    for (let x=0; x<4; x++) {
      let flag = [false,false,false,false];
      for (let y=2;y>=0; y--) {
        if(this.gameArray[x][y]){
          for(let m=3; m > y; m--){
            if((this.gameArray[x][m]==0 || this.gameArray[x][m]==this.gameArray[x][y]) && this.util.isNoBlockRow(x,m,y,this.gameArray)){
              if(flag[m]){
                continue;
              }else if(this.gameArray[x][m]>0){
                flag[m]= true;
                this.score += this.gameArray[x][m]*2;
                this.updateScore();
              }
              this.gameArray[x][m] += this.gameArray[x][y];
              this.gameArray[x][y] = 0; 
              this.animation.moveCellAni(x,y,x,m,this.containerWidth);
              break;
            }
          }
        }
      }
    }
  }

  ifCanToUp() {
    for (let x=1; x<4; x++) {
      for (let y=0;y<4; y++) {
        if(this.gameArray[x][y] && (this.gameArray[x-1][y]==0 || this.gameArray[x-1][y]==this.gameArray[x][y])){
          return true;
        }
      }
    }
    return false;
  }

  addToUp() {
    for (let y=0;y<4; y++) {
      let flag = [false,false,false,false];
      for (let x=1; x<4; x++) {
        if(this.gameArray[x][y]){
          for(let m=0; m < x; m++){
            if((this.gameArray[m][y]==0 || this.gameArray[m][y]==this.gameArray[x][y]) && this.util.isNoBlockCol(y,x,m,this.gameArray)){
              if(flag[m]){
                continue;
              }else if(this.gameArray[m][y]>0){
                flag[m]= true;
                this.score += this.gameArray[m][y]*2;
                this.updateScore();
              }
              this.gameArray[m][y] += this.gameArray[x][y];
              this.gameArray[x][y] = 0;
              this.animation.moveCellAni(x,y,m,y,this.containerWidth);
              break;
            }
          }
        }
      }
    }
  }

  ifCanToDown() {
    for (let x=0; x<3; x++) {
      for (let y=0;y<4; y++) {
        if(this.gameArray[x][y] && (this.gameArray[x+1][y]==0 || this.gameArray[x+1][y]==this.gameArray[x][y])){
          return true;
        }
      }
    }
    return false;
  }

  addToDown() {
    for (let y=0;y<4; y++) {
      let flag = [false,false,false,false];
      for (let x=2; x>=0; x--) {
        if(this.gameArray[x][y]){
          for(let m=3; m >x; m--){
            if((this.gameArray[m][y]==0 || this.gameArray[m][y]==this.gameArray[x][y]) && this.util.isNoBlockCol(y,m,x,this.gameArray)){
              if(flag[m]){
                continue;
              }else if(this.gameArray[m][y]>0){
                flag[m]= true;
                this.score += this.gameArray[m][y]*2;
                this.updateScore();
              }
              this.gameArray[m][y] += this.gameArray[x][y];
              this.gameArray[x][y] = 0;
              this.animation.moveCellAni(x,y,m,y,this.containerWidth);
              break;
            }
          }
        }
      }
    }
  }
  
}


























