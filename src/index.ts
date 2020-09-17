interface options {
  notEventClass?: string;
  touchStart?: undefined | Function;
  touchMove? : null|Function,
  touchEnd? : null|Function,
  moveEnd? : number
}

interface state{
  x:number,
  y:number,
  speedX:number,
  speedY:number,
  timer:any,
  stime:number
}

/**
 * 
 * @param {number} xf 현재 지점
 * @param {number} xi 시작 지점
 * @param {number} tf 현재 시간
 * @param {number} ti 시작 시간
 * @returns {number}
 */
function speedCheck(xf: number, xi: number, tf: number, ti: number){ 
    const value = (xf-xi) / (tf-ti);
    return value;
  };

const _option:options = {
  notEventClass : '.not-touch-event',
  touchStart : null,
  touchMove : null,
  touchEnd : null,
  moveEnd : 100
};

/*
    TITLE: touchStateManarger : Class
    NOTE: touch 이벤트 진행시 touch 상태를 갱신하는 클래스
    @ 정상현
    # touchElement : document element [필수]
    # options : Object
    # options.touchStart : function ( state, event )
        - startX : 터치가 시작된 X 좌표 (clientX)
        - startY : 터치가 시작된 Y 좌표 (clientY)
    # options.touchMove : function ( state, event )
        - moveX : 시작점을 0 으로 움직인 X 좌표
        - moveY : 시작점을 0 으로 움직인 Y 좌표
        - directionX : 시작점을 기준으로 움직인 방향 ( "left" or "right")
        - directionY : 시작점을 기준으로 움직인 방향 ( "up" or "down")
    # options.touchEnd : function( state, event )
        - moveX : 시작점을 0 으로 움직인 X 좌표
        - moveY : 시작점을 0 으로 움직인 Y 좌표
        - directionX : 시작점을 기준으로 움직인 방향 ( "left" or "right")
        - directionY : 시작점을 기준으로 움직인 방향 ( "up" or "down")
        - phaseX : x 축으로 움직인 양에 대해 options.moveEnd 값과 비교하여 cancel or end
        - phaseY : y 축으로 움직인 양에 대해 options.moveEnd 값과 비교하여 cancel or end
    # options.moveEnd : default 100 / touchEnd 가 발생할때 cancel 인지 end 인지를 구분하기 위한 값.

    # Methods
        - disabled():Void
            - 이벤트를 발생시키지 않음.
        - enabled():Void
            - 이벤트를 발생시킴.
        - destroy():Void
            - 해당 클래스의 이벤트를 삭제함.
*/

export default class TouchHelper {
  touchElement:HTMLElement;
  option:options;
  startY:number;
  startX:number;
  moveY:number;
  moveX:number;
  end:number;
  phaseX:null|String;
  phaseY:null|String;
  directionX:null|String;
  directionY:null|String;
  isEnabled:Boolean;
  speedState:state;
  tsEvent:VoidFunction;
  teEvent:VoidFunction;
  tmEvent:VoidFunction;

  constructor(element: HTMLElement, opt: any){
    const instance = this;
    this.option = Object.assign({}, _option, opt);
    this.touchElement = element;
    this.startY = 0;
    this.startX = 0;
    this.moveY = 0;
    this.moveX = 0;
    this.end = 0;
    this.phaseX = null;
    this.phaseY = null;
    this.directionX = null;
    this.directionY = null;
    this.isEnabled = true;
    this.speedState = {
      x : 0,
      y : 0,
      speedX : 0,
      speedY : 0,
      timer : null,
      stime : 0
    };
  }
  touchstart ( event:TouchEvent ){
    const { isEnabled, option } = this;
    if( !isEnabled ){
      event.preventDefault();
      return false;
    }
    if (event.target instanceof Element) { 
      if( event.target.closest(option.notEventClass) ){
        return false;
      }
    }
    this.startY = event.touches[0].clientY;
    this.startX = event.touches[0].clientX;
    this.moveY = 0;
    this.moveX = 0;
    
    if( this.speedState.timer === null ){
      this.speedState.stime = Date.now();
      this.speedState.x = 0;
      this.speedState.y = 0;
      this.speedState.timer = window.setInterval(this.speedCheck.bind(this) ,50);
    }

    if( typeof option.touchStart === 'function' ){
      const {startX, startY} = this;
      option.touchStart( {
        startX : startX, 
        startY : startY
      }, event);
    }
  }
  touchmove(event:TouchEvent){
    const { isEnabled, option } = this;
    if( !isEnabled ){
      event.preventDefault();
      return false;
    }
    if (event.target instanceof Element) { 
      if( event.target.closest(option.notEventClass) ){
        return false;
      }
    }
    this.moveX = this.startX - event.touches[0].clientX;
    this.moveY = this.startY - event.touches[0].clientY;
    this.directionX = (this.moveX > 0) ? 'left' : 'right';
    this.directionY = (this.moveY > 0) ? 'up' : 'down';
    if( typeof option.touchMove === 'function' ){
      const {moveX, moveY, directionX, directionY, speedState} = this;
      option.touchMove( {
        moveX : moveX,
        moveY : moveY,
        directionX : directionX,
        directionY : directionY,
        speedX : speedState.speedX,
        speedY : speedState.speedY
      }, event );
    }
  }
  touchend(event:TouchEvent){
    const { isEnabled, option } = this;
    if( !isEnabled ){
      event.preventDefault();
      return false;
    }
    if (event.target instanceof Element) { 
      if( event.target.closest(option.notEventClass) ){
        return false;
      }
    }
    this.phaseX = (Math.abs(this.moveX) > option.moveEnd ) ? 'end' : 'cancel';
    this.phaseY = (Math.abs(this.moveY) > option.moveEnd ) ? 'end' : 'cancel';
    this.startX = 0;
    this.startY = 0;
    if( this.speedState.timer !== null ){
      window.clearInterval(this.speedState.timer);
      this.speedState.timer = null;
    }
    if( typeof option.touchEnd === 'function' ){
      const {moveX, moveY, directionX, directionY,phaseX, phaseY, speedState} = this;
      option.touchEnd({
        moveX : moveX,
        moveY : moveY,
        directionX : directionX,
        directionY : directionY,
        phaseX : phaseX,
        phaseY : phaseY,
        speedX : speedState.speedX,
        speedY : speedState.speedY
      }, event);
    }
  }
  speedCheck(){
    const xi = this.speedState.x;
    const xf = Math.abs( this.moveX );
    const yi = this.speedState.y;
    const yf = Math.abs( this.moveY );
    const tf = Date.now();//msec
    const ti = this.speedState.stime;
    this.speedState.speedX = Math.abs( speedCheck(xf, xi, tf/50, ti/50 ) );
    this.speedState.speedY = Math.abs( speedCheck(yf, yi, tf/50, ti/50 ) );// 현재 지점 , 시작 지점 , 현재 시간, 시작 시간
    this.speedState.x = xf;
    this.speedState.y = yf;
    this.speedState.stime = tf;
  }
  disabled (){
    this.isEnabled = false;
  };
  enabled(){
    this.isEnabled = true;
  };
  destroy(){
    this.touchElement.removeEventListener( 'touchstart', this.tsEvent );
    this.touchElement.removeEventListener( 'touchmove', this.tmEvent );
    this.touchElement.removeEventListener( 'touchend', this.teEvent );
  }
  init(){
    const {touchstart, touchmove, touchend} = this;
    this.tsEvent = touchstart.bind(this);
    this.tmEvent = touchmove.bind(this);
    this.teEvent = touchend.bind(this);

    this.touchElement.addEventListener( 'touchstart' , this.tsEvent , {
      passive:false
    });

    this.touchElement.addEventListener( 'touchmove' , this.tmEvent , {
      passive:false,
    } );
    this.touchElement.addEventListener( 'touchend' , this.teEvent , {
      passive:false,
    });
  }
}
