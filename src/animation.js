export default class Animation {

  //移动数字时使用动画
  moveCellAni(fromx,fromy,tox,toy,refWidth) {
    let moveCell = document.getElementById('grid-number'+'-'+fromx+'-'+fromy);
    moveCell.style.top=refWidth*0.02*(tox+1) + refWidth*0.225*tox + 'px';
    moveCell.style.left=refWidth*0.02*(toy+1) + refWidth*0.225*toy + 'px';

    moveCell.animate([{
      top:refWidth*0.02*(fromx+1) + refWidth*0.225*fromx + 'px',
      left:refWidth*0.02*(fromy+1) + refWidth*0.225*fromy + 'px'
    },{
      top:refWidth*0.02*(tox+1) + refWidth*0.225*tox + 'px',
      left:refWidth*0.02*(toy+1) + refWidth*0.225*toy + 'px'
    }],{
      'duration':200,
      'timing-function':'ease'
    })
  }

  //创建新数字时使用动画
  addCellAni(x,y,number,refWidth,gridContainer) {
    let numberCell = document.createElement('div');
    numberCell.innerText = number;
    numberCell.setAttribute('class','grid-number number-'+number);
    numberCell.setAttribute('id','grid-number-'+x+'-'+y);
    numberCell.style.lineHeight = refWidth*0.225 +'px';
    numberCell.style.top= refWidth*0.02*(x+1) + refWidth*0.225*x + 'px';
    numberCell.style.left= refWidth*0.02*(y+1) + refWidth*0.225*y + 'px';

    numberCell.animate([
    {
      opacity: 0,
      height: 0,
      width: 0,
      top: refWidth*0.02*(x+1) + refWidth*0.225*(x+0.5) + 'px',
      left: refWidth*0.02*(y+1) + refWidth*0.225*(y+0.5) + 'px'
    },
    {
      opacity: 1,
      height: refWidth*0.225 +'px',
      width: refWidth*0.225 +'px',
      top: refWidth*0.02*(x+1) + refWidth*0.225*x + 'px',
      left: refWidth*0.02*(y+1) + refWidth*0.225*y + 'px'
    }
    ],{
      'duration':200,
      'timing-function':'ease'
    });

    gridContainer.appendChild(numberCell);

  }

}
