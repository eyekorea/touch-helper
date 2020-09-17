// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"index.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 *
 * @param {number} xf 현재 지점
 * @param {number} xi 시작 지점
 * @param {number} tf 현재 시간
 * @param {number} ti 시작 시간
 * @returns {number}
 */

function speedCheck(xf, xi, tf, ti) {
  var value = (xf - xi) / (tf - ti);
  return value;
}

;
var _option = {
  notEventClass: '.not-touch-event',
  touchStart: null,
  touchMove: null,
  touchEnd: null,
  moveEnd: 100
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

var TouchHelper =
/** @class */
function () {
  function TouchHelper(element, opt) {
    var instance = this;
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
      x: 0,
      y: 0,
      speedX: 0,
      speedY: 0,
      timer: null,
      stime: 0
    };
  }

  TouchHelper.prototype.touchstart = function (event) {
    var _a = this,
        isEnabled = _a.isEnabled,
        option = _a.option;

    if (!isEnabled) {
      event.preventDefault();
      return false;
    }

    if (event.target instanceof Element) {
      if (event.target.closest(option.notEventClass)) {
        return false;
      }
    }

    this.startY = event.touches[0].clientY;
    this.startX = event.touches[0].clientX;
    this.moveY = 0;
    this.moveX = 0;

    if (this.speedState.timer === null) {
      this.speedState.stime = Date.now();
      this.speedState.x = 0;
      this.speedState.y = 0;
      this.speedState.timer = window.setInterval(this.speedCheck.bind(this), 50);
    }

    if (typeof option.touchStart === 'function') {
      var _b = this,
          startX = _b.startX,
          startY = _b.startY;

      option.touchStart({
        startX: startX,
        startY: startY
      }, event);
    }
  };

  TouchHelper.prototype.touchmove = function (event) {
    var _a = this,
        isEnabled = _a.isEnabled,
        option = _a.option;

    if (!isEnabled) {
      event.preventDefault();
      return false;
    }

    if (event.target instanceof Element) {
      if (event.target.closest(option.notEventClass)) {
        return false;
      }
    }

    this.moveX = this.startX - event.touches[0].clientX;
    this.moveY = this.startY - event.touches[0].clientY;
    this.directionX = this.moveX > 0 ? 'left' : 'right';
    this.directionY = this.moveY > 0 ? 'up' : 'down';

    if (typeof option.touchMove === 'function') {
      var _b = this,
          moveX = _b.moveX,
          moveY = _b.moveY,
          directionX = _b.directionX,
          directionY = _b.directionY,
          speedState = _b.speedState;

      option.touchMove({
        moveX: moveX,
        moveY: moveY,
        directionX: directionX,
        directionY: directionY,
        speedX: speedState.speedX,
        speedY: speedState.speedY
      }, event);
    }
  };

  TouchHelper.prototype.touchend = function (event) {
    var _a = this,
        isEnabled = _a.isEnabled,
        option = _a.option;

    if (!isEnabled) {
      event.preventDefault();
      return false;
    }

    if (event.target instanceof Element) {
      if (event.target.closest(option.notEventClass)) {
        return false;
      }
    }

    this.phaseX = Math.abs(this.moveX) > option.moveEnd ? 'end' : 'cancel';
    this.phaseY = Math.abs(this.moveY) > option.moveEnd ? 'end' : 'cancel';
    this.startX = 0;
    this.startY = 0;

    if (this.speedState.timer !== null) {
      window.clearInterval(this.speedState.timer);
      this.speedState.timer = null;
    }

    if (typeof option.touchEnd === 'function') {
      var _b = this,
          moveX = _b.moveX,
          moveY = _b.moveY,
          directionX = _b.directionX,
          directionY = _b.directionY,
          phaseX = _b.phaseX,
          phaseY = _b.phaseY,
          speedState = _b.speedState;

      option.touchEnd({
        moveX: moveX,
        moveY: moveY,
        directionX: directionX,
        directionY: directionY,
        phaseX: phaseX,
        phaseY: phaseY,
        speedX: speedState.speedX,
        speedY: speedState.speedY
      }, event);
    }
  };

  TouchHelper.prototype.speedCheck = function () {
    var xi = this.speedState.x;
    var xf = Math.abs(this.moveX);
    var yi = this.speedState.y;
    var yf = Math.abs(this.moveY);
    var tf = Date.now(); //msec

    var ti = this.speedState.stime;
    this.speedState.speedX = Math.abs(speedCheck(xf, xi, tf / 50, ti / 50));
    this.speedState.speedY = Math.abs(speedCheck(yf, yi, tf / 50, ti / 50)); // 현재 지점 , 시작 지점 , 현재 시간, 시작 시간

    this.speedState.x = xf;
    this.speedState.y = yf;
    this.speedState.stime = tf;
  };

  TouchHelper.prototype.disabled = function () {
    this.isEnabled = false;
  };

  ;

  TouchHelper.prototype.enabled = function () {
    this.isEnabled = true;
  };

  ;

  TouchHelper.prototype.destroy = function () {
    this.touchElement.removeEventListener('touchstart', this.tsEvent);
    this.touchElement.removeEventListener('touchmove', this.tmEvent);
    this.touchElement.removeEventListener('touchend', this.teEvent);
  };

  TouchHelper.prototype.init = function () {
    var _a = this,
        touchstart = _a.touchstart,
        touchmove = _a.touchmove,
        touchend = _a.touchend;

    this.tsEvent = touchstart.bind(this);
    this.tmEvent = touchmove.bind(this);
    this.teEvent = touchend.bind(this);
    this.touchElement.addEventListener('touchstart', this.tsEvent, {
      passive: false
    });
    this.touchElement.addEventListener('touchmove', this.tmEvent, {
      passive: false
    });
    this.touchElement.addEventListener('touchend', this.teEvent, {
      passive: false
    });
  };

  return TouchHelper;
}();

exports.default = TouchHelper;
},{}],"index-test.js":[function(require,module,exports) {
"use strict";

var _index = _interopRequireDefault(require("./index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ele = document.querySelector('#touchArea');
var touch = new _index.default(ele, {
  touchStart: function touchStart(value) {
    ele.innerHTML = "\n      <h1>touch Start</h1>\n      <p>startX : ".concat(value.startX, "</p>\n      <p>startY : ").concat(value.startY, "</p>\n    ");
  },
  touchMove: function touchMove(value) {
    ele.innerHTML = "\n      <h1>touch Move</h1>\n      <p>moveX : ".concat(value.moveX, "</p>\n      <p>moveY : ").concat(value.moveY, "</p>\n      <p>directionX : ").concat(value.directionX, "</p>\n      <p>directionY : ").concat(value.directionY, "</p>\n      <p>speedX : ").concat(value.speedX, "</p>\n      <p>speedY : ").concat(value.speedY, "</p>\n    ");
  },
  touchEnd: function touchEnd(value) {
    ele.innerHTML = "\n      <h1>touch End</h1>\n      <p>moveX : ".concat(value.moveX, "</p>\n      <p>moveY : ").concat(value.moveY, "</p>\n      <p>directionX : ").concat(value.directionX, "</p>\n      <p>directionY : ").concat(value.directionY, "</p>\n      <p>phaseX : ").concat(value.phaseX, "</p>\n      <p>phaseY : ").concat(value.phaseY, "</p>\n      <p>speedX : ").concat(value.speedX, "</p>\n      <p>speedY : ").concat(value.speedY, "</p>\n    ");
  }
});
touch.init();
},{"./index":"index.ts"}],"../../../../.nvm/versions/node/v12.13.0/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "50487" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../../.nvm/versions/node/v12.13.0/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index-test.js"], null)
//# sourceMappingURL=/index-test.1d9115b2.js.map