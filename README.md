# touch-helper

## install
`npm install --save https://github.com/eyekorea/touch-helper.git`

## use
```js
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
```

## options
notEventClass?: string; - 이벤트 발생이 되지 않는 영역의 셀렉터
touchStart?: undefined | Function; - touchStart  실행
touchMove? : null|Function, - touchMove 일때 실행
touchEnd? : null|Function, - touchEnd 일때 실행
moveEnd? : number -  default 100 / touchEnd 가 발생할때 cancel 인지 end 인지를 구분하기 위한 값.

## method
- disabled : 터치 콜백을 비활성화
- enabled : 터치 콜백을 활성화
- destroy : 클래스 제거
- init : 클래스를 셋팅


