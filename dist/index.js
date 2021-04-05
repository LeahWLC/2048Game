/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/animation.js":
/*!**************************!*\
  !*** ./src/animation.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Animation)
/* harmony export */ });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Animation = /*#__PURE__*/function () {
  function Animation() {
    _classCallCheck(this, Animation);
  }

  _createClass(Animation, [{
    key: "moveCellAni",
    value: //移动数字时使用动画
    function moveCellAni(fromx, fromy, tox, toy, refWidth) {
      var moveCell = document.getElementById('grid-number' + '-' + fromx + '-' + fromy);
      moveCell.style.top = refWidth * 0.02 * (tox + 1) + refWidth * 0.225 * tox + 'px';
      moveCell.style.left = refWidth * 0.02 * (toy + 1) + refWidth * 0.225 * toy + 'px';
      moveCell.animate([{
        top: refWidth * 0.02 * (fromx + 1) + refWidth * 0.225 * fromx + 'px',
        left: refWidth * 0.02 * (fromy + 1) + refWidth * 0.225 * fromy + 'px'
      }, {
        top: refWidth * 0.02 * (tox + 1) + refWidth * 0.225 * tox + 'px',
        left: refWidth * 0.02 * (toy + 1) + refWidth * 0.225 * toy + 'px'
      }], {
        'duration': 200,
        'timing-function': 'ease'
      });
    } //创建新数字时使用动画

  }, {
    key: "addCellAni",
    value: function addCellAni(x, y, number, refWidth, gridContainer) {
      var numberCell = document.createElement('div');
      numberCell.innerText = number;
      numberCell.setAttribute('class', 'grid-number number-' + number);
      numberCell.setAttribute('id', 'grid-number-' + x + '-' + y);
      numberCell.style.lineHeight = refWidth * 0.225 + 'px';
      numberCell.style.top = refWidth * 0.02 * (x + 1) + refWidth * 0.225 * x + 'px';
      numberCell.style.left = refWidth * 0.02 * (y + 1) + refWidth * 0.225 * y + 'px';
      numberCell.animate([{
        opacity: 0,
        height: 0,
        width: 0,
        top: refWidth * 0.02 * (x + 1) + refWidth * 0.225 * (x + 0.5) + 'px',
        left: refWidth * 0.02 * (y + 1) + refWidth * 0.225 * (y + 0.5) + 'px'
      }, {
        opacity: 1,
        height: refWidth * 0.225 + 'px',
        width: refWidth * 0.225 + 'px',
        top: refWidth * 0.02 * (x + 1) + refWidth * 0.225 * x + 'px',
        left: refWidth * 0.02 * (y + 1) + refWidth * 0.225 * y + 'px'
      }], {
        'duration': 200,
        'timing-function': 'ease'
      });
      gridContainer.appendChild(numberCell);
    }
  }]);

  return Animation;
}();



/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ GameManager)
/* harmony export */ });
/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util.js */ "./src/util.js");
/* harmony import */ var _animation_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./animation.js */ "./src/animation.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }




var GameManager = /*#__PURE__*/function () {
  function GameManager() {
    _classCallCheck(this, GameManager);

    this.score = 0;
    this.containerWidth = 500;
    this.gameArray = [];
    this.gridContainer = document.getElementById('grid-container');
    this.startX = 0;
    this.startY = 0;
    this.endX = 0;
    this.endY = 0;
    this.animation = new _animation_js__WEBPACK_IMPORTED_MODULE_1__.default();
    this.util = new _util_js__WEBPACK_IMPORTED_MODULE_0__.default();
    this.initView();
    this.listen();
  }

  _createClass(GameManager, [{
    key: "initData",
    value: function initData() {
      for (var x = 0; x < 4; x++) {
        this.gameArray[x] = [];

        for (var y = 0; y < 4; y++) {
          this.gameArray[x][y] = 0;
        }
      }

      this.score = 0;
      this.updateScore();
    }
  }, {
    key: "initView",
    value: function initView() {
      if (screen.availWidth > 500) {
        this.containerWidth = 500;
      } else {
        this.containerWidth = screen.availWidth * 0.8;
      }

      this.gridContainer.style.height = this.containerWidth + 'px';
      this.gridContainer.style.width = this.containerWidth + 'px';

      for (var x = 0; x < 4; x++) {
        for (var y = 0; y < 4; y++) {
          var gridCell = document.getElementById('grid-cell-' + x + '-' + y);
          gridCell.style.height = this.containerWidth * 0.225 + 'px';
          gridCell.style.top = this.containerWidth * 0.02 * (x + 1) + this.containerWidth * 0.225 * x + 'px';
          gridCell.style.left = this.containerWidth * 0.02 * (y + 1) + this.containerWidth * 0.225 * y + 'px';
        }
      }

      this.newGame();
    }
  }, {
    key: "newGame",
    value: function newGame() {
      this.initData();
      this.createNumberCell();
      this.createNumberCell();
      setTimeout(this.updateView.bind(this), 205);
    }
  }, {
    key: "createNumberCell",
    value: function createNumberCell() {
      if (this.ifGameOver()) {
        return;
      }

      var randomNum = this.util.randomNumber();
      var randomPos = this.util.randomPosition(this.gameArray);
      this.gameArray[randomPos.x][randomPos.y] = randomNum;
      this.animation.addCellAni(randomPos.x, randomPos.y, randomNum, this.containerWidth, this.gridContainer);
    }
  }, {
    key: "updateView",
    value: function updateView() {
      this.clearView();

      for (var x = 0; x < 4; x++) {
        for (var y = 0; y < 4; y++) {
          if (this.gameArray[x][y]) {
            var numberCell = document.createElement('div');
            numberCell.innerText = this.gameArray[x][y];
            numberCell.setAttribute('class', 'grid-number number-' + this.gameArray[x][y]);
            numberCell.setAttribute('id', 'grid-number-' + x + '-' + y);
            numberCell.style.height = this.containerWidth * 0.225 + 'px';
            numberCell.style.width = this.containerWidth * 0.225 + 'px';
            numberCell.style.lineHeight = this.containerWidth * 0.225 + 'px';
            numberCell.style.top = this.containerWidth * 0.02 * (x + 1) + this.containerWidth * 0.225 * x + 'px';
            numberCell.style.left = this.containerWidth * 0.02 * (y + 1) + this.containerWidth * 0.225 * y + 'px';
            this.gridContainer.appendChild(numberCell);
          }
        }
      }
    }
  }, {
    key: "clearView",
    value: function clearView() {
      var gridNumList = document.querySelectorAll('.grid-number');
      var len = gridNumList.length;

      for (var i = 0; i < len; i++) {
        this.gridContainer.removeChild(gridNumList[i]);
      }
    }
  }, {
    key: "updateScore",
    value: function updateScore() {
      document.getElementById('score').innerText = this.score;
    }
  }, {
    key: "listen",
    value: function listen() {
      var _this = this;

      var self = this;
      document.addEventListener('keydown', function (event) {
        //37left,38up,39right,40down
        switch (event.keyCode) {
          case 37:
            event.preventDefault();

            _this.move(0);

            break;

          case 38:
            event.preventDefault();

            _this.move(2);

            break;

          case 39:
            event.preventDefault();

            _this.move(1);

            break;

          case 40:
            event.preventDefault();

            _this.move(3);

            break;

          default:
            break;
        }
      });
      this.gridContainer.addEventListener('touchstart', function (event) {
        self.startX = event.touches[0].pageX;
        self.startY = event.touches[0].pageY;
      });
      this.gridContainer.addEventListener('touchmove', function (event) {
        event.preventDefault();
      });
      this.gridContainer.addEventListener('touchend', function (event) {
        self.endX = event.changedTouches[0].pageX;
        self.endY = event.changedTouches[0].pageY;
        var absX = self.endX - self.startX;
        var absY = self.endY - self.startY;

        if (Math.abs(absX) < 20 && Math.abs(absY) < 20) {
          return;
        }

        if (Math.abs(absX) >= Math.abs(absY)) {
          if (absX > 0) {
            //Right
            _this.move(1);
          } else {
            //Left
            _this.move(0);
          }
        } else {
          if (absY > 0) {
            //Down
            _this.move(3);
          } else {
            //Up
            _this.move(2);
          }
        }
      });
      var newGame = document.getElementById('newGame');
      newGame.addEventListener('click', function (event) {
        _this.newGame();
      });
    }
  }, {
    key: "move",
    value: function move(tag) {
      //0:left,1:right,2:up,3:down
      switch (tag) {
        case 0:
          if (this.ifCanToLeft()) {
            this.addToLeft();
            this.createNumberCell();
            setTimeout(this.updateView.bind(this), 210);
          } else {
            this.ifGameOver();
          }

          break;

        case 2:
          if (this.ifCanToUp()) {
            this.addToUp();
            this.createNumberCell();
            setTimeout(this.updateView.bind(this), 210);
          } else {
            this.ifGameOver();
          }

          break;

        case 1:
          if (this.ifCanToRight()) {
            this.addToRight();
            this.createNumberCell();
            setTimeout(this.updateView.bind(this), 210);
          } else {
            this.ifGameOver();
          }

          break;

        case 3:
          if (this.ifCanToDown()) {
            this.addToDown();
            this.createNumberCell();
            setTimeout(this.updateView.bind(this), 210);
          } else {
            this.ifGameOver();
          }

          break;

        default:
          break;
      }
    }
  }, {
    key: "ifGameOver",
    value: function ifGameOver() {
      for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
          if (this.gameArray[i][j] == 0) {
            return false;
          }
        }
      }

      if (this.ifCanToLeft() || this.ifCanToRight() || this.ifCanToUp() || this.ifCanToDown()) {
        return false;
      }

      alert('游戏结束');
      return true;
    }
  }, {
    key: "ifCanToLeft",
    value: function ifCanToLeft() {
      for (var x = 0; x < 4; x++) {
        for (var y = 1; y < 4; y++) {
          if (this.gameArray[x][y] && (this.gameArray[x][y - 1] == 0 || this.gameArray[x][y - 1] == this.gameArray[x][y])) {
            return true;
          }
        }
      }

      return false;
    }
  }, {
    key: "addToLeft",
    value: function addToLeft() {
      for (var x = 0; x < 4; x++) {
        var flag = [false, false, false, false];

        for (var y = 1; y < 4; y++) {
          if (this.gameArray[x][y]) {
            for (var m = 0; m < y; m++) {
              if ((this.gameArray[x][m] == 0 || this.gameArray[x][m] == this.gameArray[x][y]) && this.util.isNoBlockRow(x, y, m, this.gameArray)) {
                if (flag[m]) {
                  continue;
                } else if (this.gameArray[x][m] > 0) {
                  flag[m] = true;
                  this.score += this.gameArray[x][m] * 2;
                  this.updateScore();
                }

                this.gameArray[x][m] += this.gameArray[x][y];
                this.gameArray[x][y] = 0;
                this.animation.moveCellAni(x, y, x, m, this.containerWidth);
                break;
              }
            }
          }
        }
      }
    }
  }, {
    key: "ifCanToRight",
    value: function ifCanToRight() {
      for (var x = 0; x < 4; x++) {
        for (var y = 0; y < 3; y++) {
          if (this.gameArray[x][y] && (this.gameArray[x][y + 1] == 0 || this.gameArray[x][y + 1] == this.gameArray[x][y])) {
            return true;
          }
        }
      }

      return false;
    }
  }, {
    key: "addToRight",
    value: function addToRight() {
      for (var x = 0; x < 4; x++) {
        var flag = [false, false, false, false];

        for (var y = 2; y >= 0; y--) {
          if (this.gameArray[x][y]) {
            for (var m = 3; m > y; m--) {
              if ((this.gameArray[x][m] == 0 || this.gameArray[x][m] == this.gameArray[x][y]) && this.util.isNoBlockRow(x, m, y, this.gameArray)) {
                if (flag[m]) {
                  continue;
                } else if (this.gameArray[x][m] > 0) {
                  flag[m] = true;
                  this.score += this.gameArray[x][m] * 2;
                  this.updateScore();
                }

                this.gameArray[x][m] += this.gameArray[x][y];
                this.gameArray[x][y] = 0;
                this.animation.moveCellAni(x, y, x, m, this.containerWidth);
                break;
              }
            }
          }
        }
      }
    }
  }, {
    key: "ifCanToUp",
    value: function ifCanToUp() {
      for (var x = 1; x < 4; x++) {
        for (var y = 0; y < 4; y++) {
          if (this.gameArray[x][y] && (this.gameArray[x - 1][y] == 0 || this.gameArray[x - 1][y] == this.gameArray[x][y])) {
            return true;
          }
        }
      }

      return false;
    }
  }, {
    key: "addToUp",
    value: function addToUp() {
      for (var y = 0; y < 4; y++) {
        var flag = [false, false, false, false];

        for (var x = 1; x < 4; x++) {
          if (this.gameArray[x][y]) {
            for (var m = 0; m < x; m++) {
              if ((this.gameArray[m][y] == 0 || this.gameArray[m][y] == this.gameArray[x][y]) && this.util.isNoBlockCol(y, x, m, this.gameArray)) {
                if (flag[m]) {
                  continue;
                } else if (this.gameArray[m][y] > 0) {
                  flag[m] = true;
                  this.score += this.gameArray[m][y] * 2;
                  this.updateScore();
                }

                this.gameArray[m][y] += this.gameArray[x][y];
                this.gameArray[x][y] = 0;
                this.animation.moveCellAni(x, y, m, y, this.containerWidth);
                break;
              }
            }
          }
        }
      }
    }
  }, {
    key: "ifCanToDown",
    value: function ifCanToDown() {
      for (var x = 0; x < 3; x++) {
        for (var y = 0; y < 4; y++) {
          if (this.gameArray[x][y] && (this.gameArray[x + 1][y] == 0 || this.gameArray[x + 1][y] == this.gameArray[x][y])) {
            return true;
          }
        }
      }

      return false;
    }
  }, {
    key: "addToDown",
    value: function addToDown() {
      for (var y = 0; y < 4; y++) {
        var flag = [false, false, false, false];

        for (var x = 2; x >= 0; x--) {
          if (this.gameArray[x][y]) {
            for (var m = 3; m > x; m--) {
              if ((this.gameArray[m][y] == 0 || this.gameArray[m][y] == this.gameArray[x][y]) && this.util.isNoBlockCol(y, m, x, this.gameArray)) {
                if (flag[m]) {
                  continue;
                } else if (this.gameArray[m][y] > 0) {
                  flag[m] = true;
                  this.score += this.gameArray[m][y] * 2;
                  this.updateScore();
                }

                this.gameArray[m][y] += this.gameArray[x][y];
                this.gameArray[x][y] = 0;
                this.animation.moveCellAni(x, y, m, y, this.containerWidth);
                break;
              }
            }
          }
        }
      }
    }
  }]);

  return GameManager;
}();



/***/ }),

/***/ "./src/util.js":
/*!*********************!*\
  !*** ./src/util.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Util)
/* harmony export */ });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Util = /*#__PURE__*/function () {
  function Util() {
    _classCallCheck(this, Util);
  }

  _createClass(Util, [{
    key: "randomNumber",
    value: function randomNumber() {
      return Math.random() >= 0.5 ? 2 : 4;
    }
  }, {
    key: "randomPosition",
    value: function randomPosition(gameArray) {
      var availList = [[0, 0], [0, 1], [0, 2], [0, 3], [1, 0], [1, 1], [1, 2], [1, 3], [2, 0], [2, 1], [2, 2], [2, 3], [3, 0], [3, 1], [3, 2], [3, 3]];
      var x = 0;
      var y = 0;

      do {
        var randomPos = Math.floor(Math.random() * availList.length);
        x = availList[randomPos][0];
        y = availList[randomPos][1];

        if (gameArray[x][y]) {
          availList.splice(randomPos, 1);
        }
      } while (gameArray[x][y] && availList.length > 0);

      return {
        x: x,
        y: y
      };
    }
  }, {
    key: "isNoBlockRow",
    value: function isNoBlockRow(row, yEnd, yStart, gameArray) {
      for (var i = yStart + 1; i < yEnd; i++) {
        if (gameArray[row][i] > 0) return false;
      }

      return true;
    }
  }, {
    key: "isNoBlockCol",
    value: function isNoBlockCol(col, xEnd, xStart, gameArray) {
      for (var i = xStart + 1; i < xEnd; i++) {
        if (gameArray[i][col] > 0) return false;
      }

      return true;
    }
  }]);

  return Util;
}();



/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _game_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game.js */ "./src/game.js");


window.onload = function () {
  var game = new _game_js__WEBPACK_IMPORTED_MODULE_0__.default();
};
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9nYW1lMjA0OHdlYnBhY2svLi9zcmMvYW5pbWF0aW9uLmpzIiwid2VicGFjazovL2dhbWUyMDQ4d2VicGFjay8uL3NyYy9nYW1lLmpzIiwid2VicGFjazovL2dhbWUyMDQ4d2VicGFjay8uL3NyYy91dGlsLmpzIiwid2VicGFjazovL2dhbWUyMDQ4d2VicGFjay93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9nYW1lMjA0OHdlYnBhY2svd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2dhbWUyMDQ4d2VicGFjay93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2dhbWUyMDQ4d2VicGFjay93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2dhbWUyMDQ4d2VicGFjay8uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJBbmltYXRpb24iLCJmcm9teCIsImZyb215IiwidG94IiwidG95IiwicmVmV2lkdGgiLCJtb3ZlQ2VsbCIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJzdHlsZSIsInRvcCIsImxlZnQiLCJhbmltYXRlIiwieCIsInkiLCJudW1iZXIiLCJncmlkQ29udGFpbmVyIiwibnVtYmVyQ2VsbCIsImNyZWF0ZUVsZW1lbnQiLCJpbm5lclRleHQiLCJzZXRBdHRyaWJ1dGUiLCJsaW5lSGVpZ2h0Iiwib3BhY2l0eSIsImhlaWdodCIsIndpZHRoIiwiYXBwZW5kQ2hpbGQiLCJHYW1lTWFuYWdlciIsInNjb3JlIiwiY29udGFpbmVyV2lkdGgiLCJnYW1lQXJyYXkiLCJzdGFydFgiLCJzdGFydFkiLCJlbmRYIiwiZW5kWSIsImFuaW1hdGlvbiIsInV0aWwiLCJVdGlsIiwiaW5pdFZpZXciLCJsaXN0ZW4iLCJ1cGRhdGVTY29yZSIsInNjcmVlbiIsImF2YWlsV2lkdGgiLCJncmlkQ2VsbCIsIm5ld0dhbWUiLCJpbml0RGF0YSIsImNyZWF0ZU51bWJlckNlbGwiLCJzZXRUaW1lb3V0IiwidXBkYXRlVmlldyIsImJpbmQiLCJpZkdhbWVPdmVyIiwicmFuZG9tTnVtIiwicmFuZG9tTnVtYmVyIiwicmFuZG9tUG9zIiwicmFuZG9tUG9zaXRpb24iLCJhZGRDZWxsQW5pIiwiY2xlYXJWaWV3IiwiZ3JpZE51bUxpc3QiLCJxdWVyeVNlbGVjdG9yQWxsIiwibGVuIiwibGVuZ3RoIiwiaSIsInJlbW92ZUNoaWxkIiwic2VsZiIsImFkZEV2ZW50TGlzdGVuZXIiLCJldmVudCIsImtleUNvZGUiLCJwcmV2ZW50RGVmYXVsdCIsIm1vdmUiLCJ0b3VjaGVzIiwicGFnZVgiLCJwYWdlWSIsImNoYW5nZWRUb3VjaGVzIiwiYWJzWCIsImFic1kiLCJNYXRoIiwiYWJzIiwidGFnIiwiaWZDYW5Ub0xlZnQiLCJhZGRUb0xlZnQiLCJpZkNhblRvVXAiLCJhZGRUb1VwIiwiaWZDYW5Ub1JpZ2h0IiwiYWRkVG9SaWdodCIsImlmQ2FuVG9Eb3duIiwiYWRkVG9Eb3duIiwiaiIsImFsZXJ0IiwiZmxhZyIsIm0iLCJpc05vQmxvY2tSb3ciLCJtb3ZlQ2VsbEFuaSIsImlzTm9CbG9ja0NvbCIsInJhbmRvbSIsImF2YWlsTGlzdCIsImZsb29yIiwic3BsaWNlIiwicm93IiwieUVuZCIsInlTdGFydCIsImNvbCIsInhFbmQiLCJ4U3RhcnQiLCJ3aW5kb3ciLCJvbmxvYWQiLCJnYW1lIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQUFxQkEsUzs7Ozs7OztXQUVuQjtBQUNBLHlCQUFZQyxLQUFaLEVBQWtCQyxLQUFsQixFQUF3QkMsR0FBeEIsRUFBNEJDLEdBQTVCLEVBQWdDQyxRQUFoQyxFQUEwQztBQUN4QyxVQUFJQyxRQUFRLEdBQUdDLFFBQVEsQ0FBQ0MsY0FBVCxDQUF3QixnQkFBYyxHQUFkLEdBQWtCUCxLQUFsQixHQUF3QixHQUF4QixHQUE0QkMsS0FBcEQsQ0FBZjtBQUNBSSxjQUFRLENBQUNHLEtBQVQs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LENBQXJCLEVBQ0UsT0FBTyxLQUFQO0FBQ0g7O0FBQ0QsYUFBTyxJQUFQO0FBQ0Q7Ozs7Ozs7Ozs7OztVQ3ZDSDtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHdDQUF3Qyx5Q0FBeUM7V0FDakY7V0FDQTtXQUNBLEU7Ozs7O1dDUEEsd0Y7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0Esc0RBQXNELGtCQUFrQjtXQUN4RTtXQUNBLCtDQUErQyxjQUFjO1dBQzdELEU7Ozs7Ozs7Ozs7OztBQ05BOztBQUVBRyxNQUFNLENBQUNDLE1BQVAsR0FBZ0IsWUFBSTtBQUNsQixNQUFJQyxJQUFJLEdBQUcsSUFBSTlFLDZDQUFKLEVBQVg7QUFDRCxDQUZELEMiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBjbGFzcyBBbmltYXRpb24ge1xuXG4gIC8v56e75Yqo5pWw5a2X5pe25L2/55So5Yqo55S7XG4gIG1vdmVDZWxsQW5pKGZyb214LGZyb215LHRveCx0b3kscmVmV2lkdGgpIHtcbiAgICBsZXQgbW92ZUNlbGwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZ3JpZC1udW1iZXInKyctJytmcm9teCsnLScrZnJvbXkpO1xuICAgIG1vdmVDZWxsLnN0eWxlLnRvcD1yZWZXaWR0aCowLjAyKih0b3grMSkgKyByZWZXaWR0aCowLjIyNSp0b3ggKyAncHgnO1xuICAgIG1vdmVDZWxsLnN0eWxlLmxlZnQ9cmVmV2lkdGgqMC4wMioodG95KzEpICsgcmVmV2lkdGgqMC4yMjUqdG95ICsgJ3B4JztcblxuICAgIG1vdmVDZWxsLmFuaW1hdGUoW3tcbiAgICAgIHRvcDpyZWZXaWR0aCowLjAyKihmcm9teCsxKSArIHJlZldpZHRoKjAuMjI1KmZyb214ICsgJ3B4JyxcbiAgICAgIGxlZnQ6cmVmV2lkdGgqMC4wMiooZnJvbXkrMSkgKyByZWZXaWR0aCowLjIyNSpmcm9teSArICdweCdcbiAgICB9LHtcbiAgICAgIHRvcDpyZWZXaWR0aCowLjAyKih0b3grMSkgKyByZWZXaWR0aCowLjIyNSp0b3ggKyAncHgnLFxuICAgICAgbGVmdDpyZWZXaWR0aCowLjAyKih0b3krMSkgKyByZWZXaWR0aCowLjIyNSp0b3kgKyAncHgnXG4gICAgfV0se1xuICAgICAgJ2R1cmF0aW9uJzoyMDAsXG4gICAgICAndGltaW5nLWZ1bmN0aW9uJzonZWFzZSdcbiAgICB9KVxuICB9XG5cbiAgLy/liJvlu7rmlrDmlbDlrZfml7bkvb/nlKjliqjnlLtcbiAgYWRkQ2VsbEFuaSh4LHksbnVtYmVyLHJlZldpZHRoLGdyaWRDb250YWluZXIpIHtcbiAgICBsZXQgbnVtYmVyQ2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIG51bWJlckNlbGwuaW5uZXJUZXh0ID0gbnVtYmVyO1xuICAgIG51bWJlckNlbGwuc2V0QXR0cmlidXRlKCdjbGFzcycsJ2dyaWQtbnVtYmVyIG51bWJlci0nK251bWJlcik7XG4gICAgbnVtYmVyQ2VsbC5zZXRBdHRyaWJ1dGUoJ2lkJywnZ3JpZC1udW1iZXItJyt4KyctJyt5KTtcbiAgICBudW1iZXJDZWxsLnN0eWxlLmxpbmVIZWlnaHQgPSByZWZXaWR0aCowLjIyNSArJ3B4JztcbiAgICBudW1iZXJDZWxsLnN0eWxlLnRvcD0gcmVmV2lkdGgqMC4wMiooeCsxKSArIHJlZldpZHRoKjAuMjI1KnggKyAncHgnO1xuICAgIG51bWJlckNlbGwuc3R5bGUubGVmdD0gcmVmV2lkdGgqMC4wMiooeSsxKSArIHJlZldpZHRoKjAuMjI1KnkgKyAncHgnO1xuXG4gICAgbnVtYmVyQ2VsbC5hbmltYXRlKFtcbiAgICB7XG4gICAgICBvcGFjaXR5OiAwLFxuICAgICAgaGVpZ2h0OiAwLFxuICAgICAgd2lkdGg6IDAsXG4gICAgICB0b3A6IHJlZldpZHRoKjAuMDIqKHgrMSkgKyByZWZXaWR0aCowLjIyNSooeCswLjUpICsgJ3B4JyxcbiAgICAgIGxlZnQ6IHJlZldpZHRoKjAuMDIqKHkrMSkgKyByZWZXaWR0aCowLjIyNSooeSswLjUpICsgJ3B4J1xuICAgIH0sXG4gICAge1xuICAgICAgb3BhY2l0eTogMSxcbiAgICAgIGhlaWdodDogcmVmV2lkdGgqMC4yMjUgKydweCcsXG4gICAgICB3aWR0aDogcmVmV2lkdGgqMC4yMjUgKydweCcsXG4gICAgICB0b3A6IHJlZldpZHRoKjAuMDIqKHgrMSkgKyByZWZXaWR0aCowLjIyNSp4ICsgJ3B4JyxcbiAgICAgIGxlZnQ6IHJlZldpZHRoKjAuMDIqKHkrMSkgKyByZWZXaWR0aCowLjIyNSp5ICsgJ3B4J1xuICAgIH1cbiAgICBdLHtcbiAgICAgICdkdXJhdGlvbic6MjAwLFxuICAgICAgJ3RpbWluZy1mdW5jdGlvbic6J2Vhc2UnXG4gICAgfSk7XG5cbiAgICBncmlkQ29udGFpbmVyLmFwcGVuZENoaWxkKG51bWJlckNlbGwpO1xuXG4gIH1cblxufVxuIiwiaW1wb3J0IFV0aWwgZnJvbSAnLi91dGlsLmpzJ1xuaW1wb3J0IEFuaW1hdGlvbiBmcm9tICcuL2FuaW1hdGlvbi5qcydcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZU1hbmFnZXIge1xuXG4gIGNvbnN0cnVjdG9yKCl7XG4gICAgdGhpcy5zY29yZSA9IDA7XG4gICAgdGhpcy5jb250YWluZXJXaWR0aCA9IDUwMDtcbiAgICB0aGlzLmdhbWVBcnJheSA9IFtdO1xuICAgIHRoaXMuZ3JpZENvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdncmlkLWNvbnRhaW5lcicpO1xuICAgIHRoaXMuc3RhcnRYID0gMDtcbiAgICB0aGlzLnN0YXJ0WSA9IDA7XG4gICAgdGhpcy5lbmRYID0gMDtcbiAgICB0aGlzLmVuZFkgPSAwO1xuICAgIHRoaXMuYW5pbWF0aW9uID0gbmV3IEFuaW1hdGlvbigpO1xuICAgIHRoaXMudXRpbCA9IG5ldyBVdGlsKCk7XG5cbiAgICB0aGlzLmluaXRWaWV3KCk7XG4gICAgdGhpcy5saXN0ZW4oKTtcbiAgfVxuXG4gIGluaXREYXRhKCkge1xuICAgIGZvciAobGV0IHggPSAwOyB4IDwgNDsgeCsrKSB7XG4gICAgICB0aGlzLmdhbWVBcnJheVt4XSA9IFtdO1xuICAgICAgZm9yIChsZXQgeSA9IDA7IHkgPCA0OyB5KyspIHtcbiAgICAgICAgdGhpcy5nYW1lQXJyYXlbeF1beV09MDtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5zY29yZSA9IDA7XG4gICAgdGhpcy51cGRhdGVTY29yZSgpO1xuICB9XG5cbiAgaW5pdFZpZXcoKSB7XG4gICAgaWYoc2NyZWVuLmF2YWlsV2lkdGg+NTAwKXtcbiAgICAgIHRoaXMuY29udGFpbmVyV2lkdGggPSA1MDA7XG4gICAgfWVsc2V7XG4gICAgICB0aGlzLmNvbnRhaW5lcldpZHRoID0gc2NyZWVuLmF2YWlsV2lkdGgqMC44O1xuICAgIH1cblxuICAgIHRoaXMuZ3JpZENvbnRhaW5lci5zdHlsZS5oZWlnaHQgPSB0aGlzLmNvbnRhaW5lcldpZHRoKydweCc7XG4gICAgdGhpcy5ncmlkQ29udGFpbmVyLnN0eWxlLndpZHRoID0gdGhpcy5jb250YWluZXJXaWR0aCsncHgnO1xuICAgIGZvciAobGV0IHggPSAwOyB4IDwgNDsgeCsrKSB7XG4gICAgICBmb3IgKGxldCB5ID0gMDsgeSA8IDQ7IHkrKykge1xuICAgICAgICBsZXQgZ3JpZENlbGwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZ3JpZC1jZWxsLScreCsnLScreSk7XG4gICAgICAgIGdyaWRDZWxsLnN0eWxlLmhlaWdodCA9IHRoaXMuY29udGFpbmVyV2lkdGgqMC4yMjUgKydweCc7XG4gICAgICAgIGdyaWRDZWxsLnN0eWxlLnRvcCA9IHRoaXMuY29udGFpbmVyV2lkdGgqMC4wMiooeCsxKSArIHRoaXMuY29udGFpbmVyV2lkdGgqMC4yMjUqeCArICdweCc7XG4gICAgICAgIGdyaWRDZWxsLnN0eWxlLmxlZnQgPSB0aGlzLmNvbnRhaW5lcldpZHRoKjAuMDIqKHkrMSkgKyB0aGlzLmNvbnRhaW5lcldpZHRoKjAuMjI1KnkgKyAncHgnO1xuICAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLm5ld0dhbWUoKTtcbiAgfVxuXG4gIG5ld0dhbWUoKSB7XG4gICAgdGhpcy5pbml0RGF0YSgpO1xuICAgIHRoaXMuY3JlYXRlTnVtYmVyQ2VsbCgpO1xuICAgIHRoaXMuY3JlYXRlTnVtYmVyQ2VsbCgpO1xuICAgIHNldFRpbWVvdXQodGhpcy51cGRhdGVWaWV3LmJpbmQodGhpcyksIDIwNSk7XG4gIH1cbiAgXG4gIGNyZWF0ZU51bWJlckNlbGwoKSB7XG4gICAgaWYodGhpcy5pZkdhbWVPdmVyKCkpe1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBsZXQgcmFuZG9tTnVtID0gdGhpcy51dGlsLnJhbmRvbU51bWJlcigpO1xuICAgIGxldCByYW5kb21Qb3MgPSB0aGlzLnV0aWwucmFuZG9tUG9zaXRpb24odGhpcy5nYW1lQXJyYXkpO1xuICAgIHRoaXMuZ2FtZUFycmF5W3JhbmRvbVBvcy54XVtyYW5kb21Qb3MueV0gPSByYW5kb21OdW07XG4gICAgdGhpcy5hbmltYXRpb24uYWRkQ2VsbEFuaShyYW5kb21Qb3MueCxyYW5kb21Qb3MueSxyYW5kb21OdW0sdGhpcy5jb250YWluZXJXaWR0aCx0aGlzLmdyaWRDb250YWluZXIpO1xuICB9XG5cbiAgdXBkYXRlVmlldygpIHtcbiAgICB0aGlzLmNsZWFyVmlldygpO1xuICAgIFxuICAgIGZvciAobGV0IHg9MDsgeDw0OyB4Kyspe1xuICAgICAgZm9yKGxldCB5PTA7IHk8NDsgeSsrKXtcbiAgICAgICAgaWYodGhpcy5nYW1lQXJyYXlbeF1beV0pe1xuICAgICAgICAgIGxldCBudW1iZXJDZWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgbnVtYmVyQ2VsbC5pbm5lclRleHQgPSB0aGlzLmdhbWVBcnJheVt4XVt5XTtcbiAgICAgICAgICBudW1iZXJDZWxsLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCdncmlkLW51bWJlciBudW1iZXItJyt0aGlzLmdhbWVBcnJheVt4XVt5XSk7XG4gICAgICAgICAgbnVtYmVyQ2VsbC5zZXRBdHRyaWJ1dGUoJ2lkJywnZ3JpZC1udW1iZXItJyt4KyctJyt5KTtcblxuICAgICAgICAgIG51bWJlckNlbGwuc3R5bGUuaGVpZ2h0ID0gdGhpcy5jb250YWluZXJXaWR0aCowLjIyNSArJ3B4JztcbiAgICAgICAgICBudW1iZXJDZWxsLnN0eWxlLndpZHRoID0gdGhpcy5jb250YWluZXJXaWR0aCowLjIyNSArJ3B4JztcbiAgICAgICAgICBudW1iZXJDZWxsLnN0eWxlLmxpbmVIZWlnaHQgPSB0aGlzLmNvbnRhaW5lcldpZHRoKjAuMjI1ICsncHgnO1xuICAgICAgICAgIG51bWJlckNlbGwuc3R5bGUudG9wID0gdGhpcy5jb250YWluZXJXaWR0aCowLjAyKih4KzEpICsgdGhpcy5jb250YWluZXJXaWR0aCowLjIyNSp4ICsgJ3B4JztcbiAgICAgICAgICBudW1iZXJDZWxsLnN0eWxlLmxlZnQgPSB0aGlzLmNvbnRhaW5lcldpZHRoKjAuMDIqKHkrMSkgKyB0aGlzLmNvbnRhaW5lcldpZHRoKjAuMjI1KnkgKyAncHgnO1xuXG4gICAgICAgICAgdGhpcy5ncmlkQ29udGFpbmVyLmFwcGVuZENoaWxkKG51bWJlckNlbGwpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgY2xlYXJWaWV3KCkge1xuICAgIGxldCBncmlkTnVtTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5ncmlkLW51bWJlcicpO1xuICAgIGxldCBsZW4gPSBncmlkTnVtTGlzdC5sZW5ndGg7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgICAgdGhpcy5ncmlkQ29udGFpbmVyLnJlbW92ZUNoaWxkKGdyaWROdW1MaXN0W2ldKTsgXG4gICAgfVxuICB9XG5cbiAgdXBkYXRlU2NvcmUoKSB7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Njb3JlJykuaW5uZXJUZXh0ID0gdGhpcy5zY29yZTtcbiAgfVxuXG4gIGxpc3RlbigpIHtcbiAgICBsZXQgc2VsZiA9IHRoaXM7XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsKGV2ZW50KT0+IHtcbiAgICAgIC8vMzdsZWZ0LDM4dXAsMzlyaWdodCw0MGRvd25cbiAgICAgIHN3aXRjaChldmVudC5rZXlDb2RlKVxuICAgICAge1xuICAgICAgICBjYXNlIDM3OlxuICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgdGhpcy5tb3ZlKDApO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIDM4OlxuICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgdGhpcy5tb3ZlKDIpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIDM5OlxuICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgdGhpcy5tb3ZlKDEpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIDQwOlxuICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgdGhpcy5tb3ZlKDMpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH0pXG5cbiAgICB0aGlzLmdyaWRDb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsKGV2ZW50KT0+e1xuICAgICAgc2VsZi5zdGFydFggPSBldmVudC50b3VjaGVzWzBdLnBhZ2VYO1xuICAgICAgc2VsZi5zdGFydFkgPSBldmVudC50b3VjaGVzWzBdLnBhZ2VZO1xuICAgIH0pXG5cbiAgICB0aGlzLmdyaWRDb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywoZXZlbnQpPT57XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH0pXG5cbiAgICB0aGlzLmdyaWRDb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLChldmVudCk9PntcbiAgICAgIHNlbGYuZW5kWCA9IGV2ZW50LmNoYW5nZWRUb3VjaGVzWzBdLnBhZ2VYO1xuICAgICAgc2VsZi5lbmRZID0gZXZlbnQuY2hhbmdlZFRvdWNoZXNbMF0ucGFnZVk7XG5cbiAgICAgIHZhciBhYnNYID0gc2VsZi5lbmRYIC0gc2VsZi5zdGFydFg7XG4gICAgICB2YXIgYWJzWSA9IHNlbGYuZW5kWSAtIHNlbGYuc3RhcnRZO1xuXG4gICAgICBpZihNYXRoLmFicyhhYnNYKTwyMCAmJiBNYXRoLmFicyhhYnNZKTwyMCl7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYoTWF0aC5hYnMoYWJzWCkgPj0gTWF0aC5hYnMoYWJzWSkpe1xuICAgICAgICBpZihhYnNYPjApey8vUmlnaHRcbiAgICAgICAgICB0aGlzLm1vdmUoMSk7XG4gICAgICAgIH1lbHNley8vTGVmdFxuICAgICAgICAgIHRoaXMubW92ZSgwKTtcbiAgICAgICAgfVxuICAgICAgfWVsc2V7XG4gICAgICAgIGlmKGFic1k+MCl7Ly9Eb3duXG4gICAgICAgICAgdGhpcy5tb3ZlKDMpO1xuICAgICAgICB9ZWxzZXsvL1VwXG4gICAgICAgICAgdGhpcy5tb3ZlKDIpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSlcblxuICAgIGxldCBuZXdHYW1lID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ25ld0dhbWUnKTtcbiAgICBuZXdHYW1lLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywoZXZlbnQpPT4ge1xuICAgICAgdGhpcy5uZXdHYW1lKCk7XG4gICAgfSlcbiAgfVxuXG4gIG1vdmUodGFnKSB7XG4gICAgLy8wOmxlZnQsMTpyaWdodCwyOnVwLDM6ZG93blxuICAgIHN3aXRjaCh0YWcpXG4gICAge1xuICAgICAgY2FzZSAwOlxuICAgICAgICBpZih0aGlzLmlmQ2FuVG9MZWZ0KCkpe1xuICAgICAgICAgIHRoaXMuYWRkVG9MZWZ0KCk7XG4gICAgICAgICAgdGhpcy5jcmVhdGVOdW1iZXJDZWxsKCk7XG4gICAgICAgICAgc2V0VGltZW91dCh0aGlzLnVwZGF0ZVZpZXcuYmluZCh0aGlzKSwgMjEwKTtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgdGhpcy5pZkdhbWVPdmVyKCk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDI6XG4gICAgICAgIGlmKHRoaXMuaWZDYW5Ub1VwKCkpe1xuICAgICAgICAgIHRoaXMuYWRkVG9VcCgpO1xuICAgICAgICAgIHRoaXMuY3JlYXRlTnVtYmVyQ2VsbCgpO1xuICAgICAgICAgIHNldFRpbWVvdXQodGhpcy51cGRhdGVWaWV3LmJpbmQodGhpcyksIDIxMCk7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgIHRoaXMuaWZHYW1lT3ZlcigpO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAxOlxuICAgICAgICBpZih0aGlzLmlmQ2FuVG9SaWdodCgpKXtcbiAgICAgICAgICB0aGlzLmFkZFRvUmlnaHQoKTtcbiAgICAgICAgICB0aGlzLmNyZWF0ZU51bWJlckNlbGwoKTtcbiAgICAgICAgICBzZXRUaW1lb3V0KHRoaXMudXBkYXRlVmlldy5iaW5kKHRoaXMpLCAyMTApO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICB0aGlzLmlmR2FtZU92ZXIoKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMzpcbiAgICAgICAgaWYodGhpcy5pZkNhblRvRG93bigpKXtcbiAgICAgICAgICB0aGlzLmFkZFRvRG93bigpO1xuICAgICAgICAgIHRoaXMuY3JlYXRlTnVtYmVyQ2VsbCgpO1xuICAgICAgICAgIHNldFRpbWVvdXQodGhpcy51cGRhdGVWaWV3LmJpbmQodGhpcyksIDIxMCk7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgIHRoaXMuaWZHYW1lT3ZlcigpO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgaWZHYW1lT3ZlcigpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDQ7IGkrKykge1xuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCA0OyBqKyspIHtcbiAgICAgICAgaWYodGhpcy5nYW1lQXJyYXlbaV1bal09PTApe1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBpZih0aGlzLmlmQ2FuVG9MZWZ0KCkgfHwgdGhpcy5pZkNhblRvUmlnaHQoKSB8fCB0aGlzLmlmQ2FuVG9VcCgpIHx8IHRoaXMuaWZDYW5Ub0Rvd24oKSl7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgYWxlcnQoJ+a4uOaIj+e7k+adnycpO1xuICAgIHJldHVybiB0cnVlO1xuICAgIFxuICB9XG5cbiAgaWZDYW5Ub0xlZnQoKSB7XG4gICAgZm9yIChsZXQgeD0wOyB4PDQ7IHgrKykge1xuICAgICAgZm9yIChsZXQgeT0xO3k8NDsgeSsrKSB7XG4gICAgICAgIGlmKHRoaXMuZ2FtZUFycmF5W3hdW3ldICYmICh0aGlzLmdhbWVBcnJheVt4XVt5LTFdPT0wIHx8IHRoaXMuZ2FtZUFycmF5W3hdW3ktMV09PXRoaXMuZ2FtZUFycmF5W3hdW3ldKSl7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgYWRkVG9MZWZ0KCkge1xuICAgIGZvciAobGV0IHg9MDsgeDw0OyB4KyspIHtcbiAgICAgIGxldCBmbGFnID0gW2ZhbHNlLGZhbHNlLGZhbHNlLGZhbHNlXTtcbiAgICAgIGZvciAobGV0IHk9MTt5PDQ7IHkrKykge1xuICAgICAgICBpZih0aGlzLmdhbWVBcnJheVt4XVt5XSl7XG4gICAgICAgICAgZm9yKGxldCBtPTA7IG0gPCB5OyBtKyspe1xuICAgICAgICAgICAgaWYoKHRoaXMuZ2FtZUFycmF5W3hdW21dPT0wIHx8IHRoaXMuZ2FtZUFycmF5W3hdW21dPT10aGlzLmdhbWVBcnJheVt4XVt5XSkgJiYgdGhpcy51dGlsLmlzTm9CbG9ja1Jvdyh4LHksbSx0aGlzLmdhbWVBcnJheSkpe1xuICAgICAgICAgICAgICBpZihmbGFnW21dKXtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgfWVsc2UgaWYodGhpcy5nYW1lQXJyYXlbeF1bbV0+MCl7XG4gICAgICAgICAgICAgICAgZmxhZ1ttXT0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLnNjb3JlICs9IHRoaXMuZ2FtZUFycmF5W3hdW21dKjI7XG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVTY29yZSgpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHRoaXMuZ2FtZUFycmF5W3hdW21dICs9IHRoaXMuZ2FtZUFycmF5W3hdW3ldO1xuICAgICAgICAgICAgICB0aGlzLmdhbWVBcnJheVt4XVt5XSA9IDA7IFxuICAgICAgICAgICAgICB0aGlzLmFuaW1hdGlvbi5tb3ZlQ2VsbEFuaSh4LHkseCxtLHRoaXMuY29udGFpbmVyV2lkdGgpO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBpZkNhblRvUmlnaHQoKSB7XG4gICAgZm9yIChsZXQgeD0wOyB4PDQ7IHgrKykge1xuICAgICAgZm9yIChsZXQgeT0wO3k8MzsgeSsrKSB7XG4gICAgICAgIGlmKHRoaXMuZ2FtZUFycmF5W3hdW3ldICYmICh0aGlzLmdhbWVBcnJheVt4XVt5KzFdPT0wIHx8IHRoaXMuZ2FtZUFycmF5W3hdW3krMV09PXRoaXMuZ2FtZUFycmF5W3hdW3ldKSl7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgYWRkVG9SaWdodCgpIHtcbiAgICBmb3IgKGxldCB4PTA7IHg8NDsgeCsrKSB7XG4gICAgICBsZXQgZmxhZyA9IFtmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZV07XG4gICAgICBmb3IgKGxldCB5PTI7eT49MDsgeS0tKSB7XG4gICAgICAgIGlmKHRoaXMuZ2FtZUFycmF5W3hdW3ldKXtcbiAgICAgICAgICBmb3IobGV0IG09MzsgbSA+IHk7IG0tLSl7XG4gICAgICAgICAgICBpZigodGhpcy5nYW1lQXJyYXlbeF1bbV09PTAgfHwgdGhpcy5nYW1lQXJyYXlbeF1bbV09PXRoaXMuZ2FtZUFycmF5W3hdW3ldKSAmJiB0aGlzLnV0aWwuaXNOb0Jsb2NrUm93KHgsbSx5LHRoaXMuZ2FtZUFycmF5KSl7XG4gICAgICAgICAgICAgIGlmKGZsYWdbbV0pe1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICB9ZWxzZSBpZih0aGlzLmdhbWVBcnJheVt4XVttXT4wKXtcbiAgICAgICAgICAgICAgICBmbGFnW21dPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMuc2NvcmUgKz0gdGhpcy5nYW1lQXJyYXlbeF1bbV0qMjtcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVNjb3JlKCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgdGhpcy5nYW1lQXJyYXlbeF1bbV0gKz0gdGhpcy5nYW1lQXJyYXlbeF1beV07XG4gICAgICAgICAgICAgIHRoaXMuZ2FtZUFycmF5W3hdW3ldID0gMDsgXG4gICAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uLm1vdmVDZWxsQW5pKHgseSx4LG0sdGhpcy5jb250YWluZXJXaWR0aCk7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGlmQ2FuVG9VcCgpIHtcbiAgICBmb3IgKGxldCB4PTE7IHg8NDsgeCsrKSB7XG4gICAgICBmb3IgKGxldCB5PTA7eTw0OyB5KyspIHtcbiAgICAgICAgaWYodGhpcy5nYW1lQXJyYXlbeF1beV0gJiYgKHRoaXMuZ2FtZUFycmF5W3gtMV1beV09PTAgfHwgdGhpcy5nYW1lQXJyYXlbeC0xXVt5XT09dGhpcy5nYW1lQXJyYXlbeF1beV0pKXtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBhZGRUb1VwKCkge1xuICAgIGZvciAobGV0IHk9MDt5PDQ7IHkrKykge1xuICAgICAgbGV0IGZsYWcgPSBbZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2VdO1xuICAgICAgZm9yIChsZXQgeD0xOyB4PDQ7IHgrKykge1xuICAgICAgICBpZih0aGlzLmdhbWVBcnJheVt4XVt5XSl7XG4gICAgICAgICAgZm9yKGxldCBtPTA7IG0gPCB4OyBtKyspe1xuICAgICAgICAgICAgaWYoKHRoaXMuZ2FtZUFycmF5W21dW3ldPT0wIHx8IHRoaXMuZ2FtZUFycmF5W21dW3ldPT10aGlzLmdhbWVBcnJheVt4XVt5XSkgJiYgdGhpcy51dGlsLmlzTm9CbG9ja0NvbCh5LHgsbSx0aGlzLmdhbWVBcnJheSkpe1xuICAgICAgICAgICAgICBpZihmbGFnW21dKXtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgfWVsc2UgaWYodGhpcy5nYW1lQXJyYXlbbV1beV0+MCl7XG4gICAgICAgICAgICAgICAgZmxhZ1ttXT0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLnNjb3JlICs9IHRoaXMuZ2FtZUFycmF5W21dW3ldKjI7XG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVTY29yZSgpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHRoaXMuZ2FtZUFycmF5W21dW3ldICs9IHRoaXMuZ2FtZUFycmF5W3hdW3ldO1xuICAgICAgICAgICAgICB0aGlzLmdhbWVBcnJheVt4XVt5XSA9IDA7XG4gICAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uLm1vdmVDZWxsQW5pKHgseSxtLHksdGhpcy5jb250YWluZXJXaWR0aCk7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGlmQ2FuVG9Eb3duKCkge1xuICAgIGZvciAobGV0IHg9MDsgeDwzOyB4KyspIHtcbiAgICAgIGZvciAobGV0IHk9MDt5PDQ7IHkrKykge1xuICAgICAgICBpZih0aGlzLmdhbWVBcnJheVt4XVt5XSAmJiAodGhpcy5nYW1lQXJyYXlbeCsxXVt5XT09MCB8fCB0aGlzLmdhbWVBcnJheVt4KzFdW3ldPT10aGlzLmdhbWVBcnJheVt4XVt5XSkpe1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGFkZFRvRG93bigpIHtcbiAgICBmb3IgKGxldCB5PTA7eTw0OyB5KyspIHtcbiAgICAgIGxldCBmbGFnID0gW2ZhbHNlLGZhbHNlLGZhbHNlLGZhbHNlXTtcbiAgICAgIGZvciAobGV0IHg9MjsgeD49MDsgeC0tKSB7XG4gICAgICAgIGlmKHRoaXMuZ2FtZUFycmF5W3hdW3ldKXtcbiAgICAgICAgICBmb3IobGV0IG09MzsgbSA+eDsgbS0tKXtcbiAgICAgICAgICAgIGlmKCh0aGlzLmdhbWVBcnJheVttXVt5XT09MCB8fCB0aGlzLmdhbWVBcnJheVttXVt5XT09dGhpcy5nYW1lQXJyYXlbeF1beV0pICYmIHRoaXMudXRpbC5pc05vQmxvY2tDb2woeSxtLHgsdGhpcy5nYW1lQXJyYXkpKXtcbiAgICAgICAgICAgICAgaWYoZmxhZ1ttXSl7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgIH1lbHNlIGlmKHRoaXMuZ2FtZUFycmF5W21dW3ldPjApe1xuICAgICAgICAgICAgICAgIGZsYWdbbV09IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5zY29yZSArPSB0aGlzLmdhbWVBcnJheVttXVt5XSoyO1xuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlU2NvcmUoKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB0aGlzLmdhbWVBcnJheVttXVt5XSArPSB0aGlzLmdhbWVBcnJheVt4XVt5XTtcbiAgICAgICAgICAgICAgdGhpcy5nYW1lQXJyYXlbeF1beV0gPSAwO1xuICAgICAgICAgICAgICB0aGlzLmFuaW1hdGlvbi5tb3ZlQ2VsbEFuaSh4LHksbSx5LHRoaXMuY29udGFpbmVyV2lkdGgpO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgXG59XG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgVXRpbCB7XG5cbiAgcmFuZG9tTnVtYmVyKCkge1xuICAgIHJldHVybiBNYXRoLnJhbmRvbSgpPj0wLjU/Mjo0O1xuICB9XG5cbiAgcmFuZG9tUG9zaXRpb24oZ2FtZUFycmF5KSB7XG4gICAgbGV0IGF2YWlsTGlzdCA9IFtbMCwwXSxbMCwxXSxbMCwyXSxbMCwzXSxbMSwwXSxbMSwxXSxbMSwyXSxbMSwzXSxbMiwwXSxbMiwxXSxbMiwyXSxbMiwzXSxbMywwXSxbMywxXSxbMywyXSxbMywzXV07XG4gICAgbGV0IHggPSAwO1xuICAgIGxldCB5ID0gMDtcbiAgICBkb3tcbiAgICAgIGxldCByYW5kb21Qb3MgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkqYXZhaWxMaXN0Lmxlbmd0aCk7XG4gICAgICB4ID0gYXZhaWxMaXN0W3JhbmRvbVBvc11bMF07XG4gICAgICB5ID0gYXZhaWxMaXN0W3JhbmRvbVBvc11bMV07XG4gICAgICBpZihnYW1lQXJyYXlbeF1beV0pe1xuICAgICAgICBhdmFpbExpc3Quc3BsaWNlKHJhbmRvbVBvcywxKTtcbiAgICAgIH1cbiAgICB9d2hpbGUoZ2FtZUFycmF5W3hdW3ldICYmIGF2YWlsTGlzdC5sZW5ndGg+MClcbiAgICBcbiAgICByZXR1cm4ge1xuICAgICAgeDp4LFxuICAgICAgeTp5XG4gICAgfVxuICB9XG5cbiAgaXNOb0Jsb2NrUm93KHJvdyx5RW5kLHlTdGFydCxnYW1lQXJyYXkpIHtcbiAgICBmb3IobGV0IGk9eVN0YXJ0KzE7IGk8eUVuZDsgaSsrKXtcbiAgICAgIGlmKGdhbWVBcnJheVtyb3ddW2ldPjApXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBpc05vQmxvY2tDb2woY29sLHhFbmQseFN0YXJ0LGdhbWVBcnJheSkge1xuICAgIGZvcihsZXQgaT14U3RhcnQrMTsgaTx4RW5kOyBpKyspe1xuICAgICAgaWYoZ2FtZUFycmF5W2ldW2NvbF0+MClcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG59IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgR2FtZU1hbmFnZXIgZnJvbSAnLi9nYW1lLmpzJ1xuXG53aW5kb3cub25sb2FkID0gKCk9PntcbiAgbGV0IGdhbWUgPSBuZXcgR2FtZU1hbmFnZXIoKTtcbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=