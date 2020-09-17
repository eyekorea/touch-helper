import TouchHelper from './index';
const ele = document.querySelector('#touchArea');
const touch = new TouchHelper(ele, {
  touchStart : (value)=>{
    ele.innerHTML = `
      <h1>touch Start</h1>
      <p>startX : ${value.startX}</p>
      <p>startY : ${value.startY}</p>
    `
  },
  touchMove : (value)=>{
    ele.innerHTML = `
      <h1>touch Move</h1>
      <p>moveX : ${value.moveX}</p>
      <p>moveY : ${value.moveY}</p>
      <p>directionX : ${value.directionX}</p>
      <p>directionY : ${value.directionY}</p>
      <p>speedX : ${value.speedX}</p>
      <p>speedY : ${value.speedY}</p>
    `
  },
  touchEnd : (value)=>{
    ele.innerHTML = `
      <h1>touch End</h1>
      <p>moveX : ${value.moveX}</p>
      <p>moveY : ${value.moveY}</p>
      <p>directionX : ${value.directionX}</p>
      <p>directionY : ${value.directionY}</p>
      <p>phaseX : ${value.phaseX}</p>
      <p>phaseY : ${value.phaseY}</p>
      <p>speedX : ${value.speedX}</p>
      <p>speedY : ${value.speedY}</p>
    `
  },
})

touch.init();