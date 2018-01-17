/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__game_js__ = __webpack_require__(1);


window.leftPressed = false;
window.rightPressed = false;

document.addEventListener('DOMContentLoaded', ()=> {
  const gameCanvas = document.getElementById('game');
  gameCanvas.height = 500;
  gameCanvas.width = 500;
  const canvasContext = gameCanvas.getContext('2d');

  const game = new __WEBPACK_IMPORTED_MODULE_0__game_js__["a" /* default */](
    canvasContext,
    gameCanvas,
    gameCanvas.width,
    gameCanvas.height,
  );

  window.addEventListener('keydown', checkKeyPressed, false);
  window.addEventListener('keyup', checkKeyLifted, false);

  function checkKeyPressed(event) {
    switch (event.keyCode) {
      case 37:
        window.leftPressed = true;
        break;
      case 39:
        window.rightPressed = true;
        break;
      case 32:
        game.begin();
        break;
      case 84:
        if (snd.paused) {
          snd.play();
        } else {
          snd.pause();
        }
    }
  }

  function checkKeyLifted(event) {
    switch (event.keyCode) {
      case 37:
        window.leftPressed = false;
        break;
      case 39:
        window.rightPressed = false;
        break;
    }
  }

});


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__line_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__center_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__player_js__ = __webpack_require__(5);




class Game {
  constructor(ctx, gameCanvas, xDim, yDim) {
    this.ctx = ctx;
    this.gameCanvas = gameCanvas;
    this.xDim = xDim;
    this.yDim = yDim;

    this.lines = [];
    this.center = new __WEBPACK_IMPORTED_MODULE_1__center_js__["a" /* default */](ctx, gameCanvas);
    this.player = new __WEBPACK_IMPORTED_MODULE_2__player_js__["a" /* default */](ctx, gameCanvas);

    this.i = 0;
  }

  moveLines() {
    this.lines.forEach(line => {
      line.closeIn();
    });
  };

  begin() {
    const animateCallback = () => {
      this.moveLines();
      this.render(this.ctx);
      requestAnimationFrame(animateCallback);
    };

    animateCallback();
  };

  render(ctx) {
    if (this.i > 75) {
      this.lines = [new __WEBPACK_IMPORTED_MODULE_0__line_js__["a" /* default */](ctx, this.gameCanvas, Math.floor((Math.random() * 8) + 1), 'red')];
      this.i = 0;
    } else {
      this.i += 1;
    }

    this.player.render(ctx);
    this.center.render(ctx);
    this.lines.forEach((line) => {
      line.render(ctx);
    });
  };
}

/* harmony default export */ __webpack_exports__["a"] = (Game);


/***/ }),
/* 2 */,
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Line {
  constructor(ctx, gameCanvas, type, color) {
    this.ctx = ctx;
    this.gameCanvas = gameCanvas;
    this.color = color;
    this.x = 0;
    this.y = 0;
    this.lineWidth = 300;
    this.type = type;
    this.handleType(type);
  }

  handleType(type) {
    if (type === 1) {
      this.x = 0;
      this.y = 0;
    } else if (type === 2) {
      this.x = this.gameCanvas.height;
      this.y = this.gameCanvas.width;
    } else if (type === 3) {
      this.x = this.gameCanvas.width - 20;
      this.y = 0;
    } else if (type === 4) {
      this.x = 0;
      this.y = this.gameCanvas.height - 20;
    } else if (type === 5) {
      this.x = 0;
      this.y = (this.gameCanvas.height / 2) - 10;
    } else if (type === 6) {
      this.x = this.gameCanvas.width;
      this.y = (this.gameCanvas.height / 2) - 10;
    } else if (type === 7) {
      this.x = (this.gameCanvas.width / 2) - 10;
      this.y = 0;
    } else if (type === 8) {
      this.x = (this.gameCanvas.width / 2) - 10;
      this.y = this.gameCanvas.height
    }

  }
  // 
  // randomColor() {
  //   const HEX_DIGITS = '0123456789ABCDEF';
  //   let color = '#';
  //   for (let i = 0; i < 6; i++) {
  //     color += HEX_DIGITS[Math.floor((Math.random() * 16))];
  //   }
  //
  //   return color;
  // }

  closeIn() {
    if (this.type === 1) {
      this.x = this.x + 3;
      this.y = this.y + 3;
    } else if (this.type === 2) {
      this.x = this.x - 3;
      this.y = this.y - 3;
    } else if (this.type === 3) {
      this.x = this.x - 3;
      this.y = this.y + 3;
    } else if (this.type === 4) {
      this.x = this.x + 3;
      this.y = this.y - 3;
    } else if (this.type === 5) {
      this.x = this.x + 3;
      this.y = this.y;
    } else if (this.type === 6) {
      this.x = this.x - 3;
      this.y = this.y;
    } else if (this.type === 7) {
      this.x = this.x;
      this.y = this.y + 3;
    } else if (this.type === 8) {
      this.x = this.x;
      this.y = this.y - 3;
    }
    this.lineWidth = this.lineWidth - 3.2;
  }

  render(ctx) {
    ctx.beginPath();
    ctx.strokeStyle = this.color;
    ctx.lineWidth = this.lineWidth;
    if (this.type === 1 || this.type === 2) {
      ctx.moveTo(this.x, this.y);
      ctx.lineTo(this.x + 10, this.y + 10);
    } else if (this.type === 3 || this.type === 4) {
      ctx.moveTo(this.x + 20, this.y);
      ctx.lineTo(this.x + 10, this.y + 10);
    } else if (this.type === 5 || this.type === 6) {
      ctx.moveTo(this.x, this.y + 10);
      ctx.lineTo(this.x + 10, this.y + 10);
    } else if (this.type === 7 || this.type === 8) {
      ctx.moveTo(this.x + 10, this.y);
      ctx.lineTo(this.x + 10, this.y + 10);
    }

    ctx.closePath();
    ctx.stroke();
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Line);


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Center {
  constructor(ctx, gameCanvas) {
    this.ctx = ctx;
    this.gameCanvas = gameCanvas;
    this.color = 'blue';
  }

  render(ctx) {
    let centerX = this.gameCanvas.width / 2;
    let centerY = this.gameCanvas.height / 2;
    ctx.beginPath();
    ctx.arc(centerX, centerY, 42, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Center);


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Player {
  constructor(ctx, gameCanvas) {
    this.ctx = ctx;
    this.gameCanvas = gameCanvas;
    this.color = 'cornflowerblue';
    this.circle = { centerX: 250, centerY: 250, radius: 75, angle: 0 };
    this.ball = { x: 0, y: 0, speed: 0 };
    this.ball.x = 0;
    this.ball.y = 0;
  }

  render(ctx) {

    if (window.rightPressed) {
      this.ball.speed = .088;
    }

    if (window.leftPressed) {
      this.ball.speed = -.088;
    }

    if (!window.leftPressed && !window.rightPressed) {
      this.ball.speed = 0;
    }

    ctx.clearRect(0, 0, this.gameCanvas.width, this.gameCanvas.height);
    ctx.strokeStyle = this.color;

    this.ball.x = this.circle.centerX + Math.cos(this.circle.angle) * this.circle.radius;
    this.ball.y = this.circle.centerY + Math.sin(this.circle.angle) * this.circle.radius;

    this.circle.angle += this.ball.speed;

    ctx.fillStyle = 'darkblue';
    ctx.beginPath();
    ctx.arc(this.ball.x, this.ball.y, 8, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fill();
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Player);


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map