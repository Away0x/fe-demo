/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "http://localhost:8097/dist";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _config = __webpack_require__(1);

	var _Level = __webpack_require__(6);

	var _Level2 = _interopRequireDefault(_Level);

	var _utils = __webpack_require__(7);

	var _DOM = __webpack_require__(8);

	var _DOM2 = _interopRequireDefault(_DOM);

	var _Canvas = __webpack_require__(9);

	var _Canvas2 = _interopRequireDefault(_Canvas);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * runLevel - 游戏运行函数
	 *
	 * @param  {Level}    level    Level对象
	 * @param  {Display}  Display  绘制方法
	 * @param  {Function} callback 回调
	 */
	function runLevel(level, Display, callback) {
	  var display = new Display(document.body, level);
	  var running = 'yes';
	  // esc暂停游戏和继续游戏
	  function handleKey(event) {
	    // 事件处理函数
	    if (event.keyCode === 27) {
	      if (running === 'no') {
	        running = 'yes';
	        console.log('游戏继续');
	        (0, _utils.runAnimation)(animation);
	      } else if (running === 'pausing') {
	        console.log('游戏继续');
	        running = 'yes';
	      } else if (running === 'yes') {
	        console.log('游戏暂停');
	        running = 'pausing';
	      }
	    }
	  }

	  addEventListener('keydown', handleKey);
	  var arrows = (0, _utils.trackKeys)(_config.arrowCodes);

	  function animation(step) {
	    if (running === 'pausing') {
	      running = 'no';
	      return false;
	    }
	    level.animate(step, arrows);
	    display.drawFrame(step);
	    // 游戏结束
	    if (level.isFinished()) {
	      display.clear();
	      // 注销事件
	      removeEventListener('keydown', handleKey);
	      arrows.unregister();
	      callback && callback(level.status);
	      return false;
	    }
	  }
	  (0, _utils.runAnimation)(animation);
	}

	/**
	 * runGame - 游戏启动函数
	 *
	 * 一个游戏是一个关卡序列。
	 * 当玩家死亡就重新开始当前关卡
	 * 当完成关卡后，就切换到下一关
	 *
	 * @param  {Array}   plans   游戏地图(关卡数组)
	 * @param  {Display} Display 绘制方法
	 */
	/* 项目入口文件 */

	function runGame(plans, Display) {
	  function startLevel(n, lives) {
	    var level = new _Level2.default(plans[n], _config.actorChars);
	    runLevel(level, Display, function (status) {
	      if (status === 'lost') {
	        if (lives > 0) {
	          alert('Your life have ' + lives);
	          startLevel(n, lives - 1);
	        } else {
	          alert('Game over');
	          startLevel(0, _config.GAME_LIVES); // 从第一关开始,且恢复生命
	        }
	      } else if (n < plans.length - 1) startLevel(n + 1, lives); // 进入下一关
	      else console.log('You win!'); // 打通游戏
	    });
	  }
	  startLevel(0, _config.GAME_LIVES - 1);
	}

	/* ######################### 整个游戏在这里启动 ######################### */
	// 1.用 DOM 来绘制游戏
	// runGame(GAME_LEVELS, DOMDisplay)
	// 2.用canvas来绘制游戏
	runGame(_config.GAME_LEVELS, _Canvas2.default);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.GAME_LEVELS = exports.arrowCodes = exports.actorChars = exports.scale = exports.GAME_LIVES = undefined;

	var _Player = __webpack_require__(2);

	var _Player2 = _interopRequireDefault(_Player);

	var _Coin = __webpack_require__(4);

	var _Coin2 = _interopRequireDefault(_Coin);

	var _Lava = __webpack_require__(5);

	var _Lava2 = _interopRequireDefault(_Lava);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// 命
	var GAME_LIVES = exports.GAME_LIVES = 3;

	// 比例尺 20像素
	var scale = exports.scale = 20;

	// 地图字符类型
	var actorChars = exports.actorChars = {
	  "@": _Player2.default,
	  "o": _Coin2.default,
	  "=": _Lava2.default, "|": _Lava2.default, "v": _Lava2.default
	};
	// = -> 水平往返运动的 lava; | -> 垂直往返运动的 lava; v -> 垂直下落的 lava;

	// 按键键值
	var arrowCodes = exports.arrowCodes = { 37: "left", 38: "up", 39: "right" };

	// 关卡地图
	var GAME_LEVELS = exports.GAME_LEVELS = [["                                                                                ", "                                                                                ", "                                                                                ", "                                                                                ", "                                                                                ", "                                                                                ", "                                                                  xxx           ", "                                                   xx      xx    xx!xx          ", "                                    o o      xx                  x!!!x          ", "                                                                 xx!xx          ", "                                   xxxxx                          xvx           ", "                                                                            xx  ", "  xx                                      o o                                x  ", "  x                     o                                                    x  ", "  x                                      xxxxx                             o x  ", "  x          xxxx       o                                                    x  ", "  x  @       x  x                                                xxxxx       x  ", "  xxxxxxxxxxxx  xxxxxxxxxxxxxxx   xxxxxxxxxxxxxxxxxxxx     xxxxxxx   xxxxxxxxx  ", "                              x   x                  x     x                    ", "                              x!!!x                  x!!!!!x                    ", "                              x!!!x                  x!!!!!x                    ", "                              xxxxx                  xxxxxxx                    ", "                                                                                ", "                                                                                "], ["                                      x!!x                        xxxxxxx                                    x!x  ", "                                      x!!x                     xxxx     xxxx                                 x!x  ", "                                      x!!xxxxxxxxxx           xx           xx                                x!x  ", "                                      xx!!!!!!!!!!xx         xx             xx                               x!x  ", "                                       xxxxxxxxxx!!x         x                                    o   o   o  x!x  ", "                                                xx!x         x     o   o                                    xx!x  ", "                                                 x!x         x                                xxxxxxxxxxxxxxx!!x  ", "                                                 xvx         x     x   x                        !!!!!!!!!!!!!!xx  ", "                                                             xx  |   |   |  xx            xxxxxxxxxxxxxxxxxxxxx   ", "                                                              xx!!!!!!!!!!!xx            v                        ", "                                                               xxxx!!!!!xxxx                                      ", "                                               x     x            xxxxxxx        xxx         xxx                  ", "                                               x     x                           x x         x x                  ", "                                               x     x                             x         x                    ", "                                               x     x                             xx        x                    ", "                                               xx    x                             x         x                    ", "                                               x     x      o  o     x   x         x         x                    ", "               xxxxxxx        xxx   xxx        x     x               x   x         x         x                    ", "              xx     xx         x   x          x     x     xxxxxx    x   x   xxxxxxxxx       x                    ", "             xx       xx        x o x          x    xx               x   x   x               x                    ", "     @       x         x        x   x          x     x               x   x   x               x                    ", "    xxx      x         x        x   x          x     x               x   xxxxx   xxxxxx      x                    ", "    x x      x         x       xx o xx         x     x               x     o     x x         x                    ", "!!!!x x!!!!!!x         x!!!!!!xx     xx!!!!!!!!xx    x!!!!!!!!!!     x     =     x x         x                    ", "!!!!x x!!!!!!x         x!!!!!xx       xxxxxxxxxx     x!!!!!!!xx!     xxxxxxxxxxxxx xx  o o  xx                    ", "!!!!x x!!!!!!x         x!!!!!x    o                 xx!!!!!!xx !                    xx     xx                     ", "!!!!x x!!!!!!x         x!!!!!x                     xx!!!!!!xx  !                     xxxxxxx                      ", "!!!!x x!!!!!!x         x!!!!!xx       xxxxxxxxxxxxxx!!!!!!xx   !                                                  ", "!!!!x x!!!!!!x         x!!!!!!xxxxxxxxx!!!!!!!!!!!!!!!!!!xx    !                                                  ", "!!!!x x!!!!!!x         x!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!xx     !                                                  "], ["                                                                                                              ", "                                                                                                              ", "                                                                                                              ", "                                                                                                              ", "                                                                                                              ", "                                        o                                                                     ", "                                                                                                              ", "                                        x                                                                     ", "                                        x                                                                     ", "                                        x                                                                     ", "                                        x                                                                     ", "                                       xxx                                                                    ", "                                       x x                 !!!        !!!  xxx                                ", "                                       x x                 !x!        !x!                                     ", "                                     xxx xxx                x          x                                      ", "                                      x   x                 x   oooo   x       xxx                            ", "                                      x   x                 x          x      x!!!x                           ", "                                      x   x                 xxxxxxxxxxxx       xxx                            ", "                                     xx   xx      x   x      x                                                ", "                                      x   xxxxxxxxx   xxxxxxxx              x x                               ", "                                      x   x           x                    x!!!x                              ", "                                      x   x           x                     xxx                               ", "                                     xx   xx          x                                                       ", "                                      x   x= = = =    x            xxx                                        ", "                                      x   x           x           x!!!x                                       ", "                                      x   x    = = = =x     o      xxx       xxx                              ", "                                     xx   xx          x                     x!!!x                             ", "                              o   o   x   x           x     x                xxv        xxx                   ", "                                      x   x           x              x                 x!!!x                  ", "                             xxx xxx xxx xxx     o o  x!!!!!!!!!!!!!!x                   vx                   ", "                             x xxx x x xxx x          x!!!!!!!!!!!!!!x                                        ", "                             x             x   xxxxxxxxxxxxxxxxxxxxxxx                                        ", "                             xx           xx                                         xxx                      ", "  xxx                         x     x     x                                         x!!!x                xxx  ", "  x x                         x    xxx    x                                          xxx                 x x  ", "  x                           x    xxx    xxxxxxx                        xxxxx                             x  ", "  x                           x           x                              x   x                             x  ", "  x                           xx          x                              x x x                             x  ", "  x                                       x       |xxxx|    |xxxx|     xxx xxx                             x  ", "  x                xxx             o o    x                              x         xxx                     x  ", "  x               xxxxx       xx          x                             xxx       x!!!x          x         x  ", "  x               oxxxo       x    xxx    x                             x x        xxx          xxx        x  ", "  x                xxx        xxxxxxxxxxxxx  x oo x    x oo x    x oo  xx xx                    xxx        x  ", "  x      @          x         x           x!!x    x!!!!x    x!!!!x    xx   xx                    x         x  ", "  xxxxxxxxxxxxxxxxxxxxxxxxxxxxx           xxxxxxxxxxxxxxxxxxxxxxxxxxxxx     xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx  ", "                                                                                                              ", "                                                                                                              "], ["                                                                                                  xxx x       ", "                                                                                                      x       ", "                                                                                                  xxxxx       ", "                                                                                                  x           ", "                                                                                                  x xxx       ", "                          o                                                                       x x x       ", "                                                                                             o o oxxx x       ", "                   xxx                                                                                x       ", "       !  o  !                                                xxxxx xxxxx xxxxx xxxxx xxxxx xxxxx xxxxx       ", "       x     x                                                x   x x   x x   x x   x x   x x   x x           ", "       x= o  x            x                                   xxx x xxx x xxx x xxx x xxx x xxx x xxxxx       ", "       x     x                                                  x x   x x   x x   x x   x x   x x     x       ", "       !  o  !            o                                  xxxx xxxxx xxxxx xxxxx xxxxx xxxxx xxxxxxx       ", "                                                                                                              ", "          o              xxx                              xx                                                  ", "                                                                                                              ", "                                                                                                              ", "                                                      xx                                                      ", "                   xxx         xxx                                                                            ", "                                                                                                              ", "                          o                                                     x      x                      ", "                                                          xx     xx                                           ", "             xxx         xxx         xxx                                 x                  x                 ", "                                                                                                              ", "                                                                 ||                                           ", "  xxxxxxxxxxx                                                                                                 ", "  x         x o xxxxxxxxx o xxxxxxxxx o xx                                                x                   ", "  x         x   x       x   x       x   x                 ||                  x     x                         ", "  x  @      xxxxx   o   xxxxx   o   xxxxx                                                                     ", "  xxxxxxx                                     xxxxx       xx     xx     xxx                                   ", "        x=                  =                =x   x                     xxx                                   ", "        xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx   x!!!!!!!!!!!!!!!!!!!!!xxx!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!", "                                                  xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx", "                                                                                                              "]];

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Vector = __webpack_require__(3);

	var _Vector2 = _interopRequireDefault(_Vector);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * class Player   玩家 (玩家碰到不同的物体，会有不同的响应)
	 */
	var Player = function () {
	  // pos -> 位置坐标 Vector
	  function Player(pos) {
	    _classCallCheck(this, Player);

	    this.pos = pos.plus(new _Vector2.default(0, -0.5)); // 玩家高度是半个格子
	    this.size = new _Vector2.default(0.8, 1.5);
	    this.speed = new _Vector2.default(0, 0); // 当前速度
	    this.type = 'player';
	  }

	  /**
	   * moveX - 玩家水平运动
	   *
	   * @param  {Number} step  速度向量
	   * @param  {Level}  level 游戏地图对象
	   * @param  {Object} keys  按键键值对象
	   */


	  _createClass(Player, [{
	    key: 'moveX',
	    value: function moveX(step, level, keys) {
	      var playerXSpeed = 7; // 玩家 x 方向移动速度
	      var motion = void 0,
	          newPos = void 0,
	          obstacle = void 0;
	      this.speed.x = 0;

	      /* 1.玩家的运动方向 */
	      if (keys.left) // 按左键时
	        this.speed.x -= playerXSpeed;
	      if (keys.right) this.speed.x += playerXSpeed;

	      /* 2.移动 */
	      motion = new _Vector2.default(this.speed.x * step, 0); // 移动距离
	      newPos = this.pos.plus(motion); // 移动后的新位置

	      /* 3.对于玩家碰到物体时的判断 */
	      obstacle = level.obstacleAt(newPos, this.size); // 移动位置上是否有障碍物
	      if (obstacle) level.playerTouched(obstacle); // 如碰到的是熔岩，游戏结束
	      else // 没碰到物体，更新位置
	        this.pos = newPos;
	    }

	    /**
	     * moveY - 玩家垂直运动 （相对于水平运动，需处理重力和跳跃运动）
	     *
	     * @param  {Number} step  速度向量
	     * @param  {Level}  level 游戏地图对象
	     * @param  {Object} keys  按键键值对象
	     */

	  }, {
	    key: 'moveY',
	    value: function moveY(step, level, keys) {
	      var gravity = 30; // 重力参数
	      var jumpSpeed = 17; // 跳跃速度
	      var motion = void 0,
	          newPos = void 0,
	          obstacle = void 0;
	      this.speed.y += step * gravity;

	      /* 1. 移动 */
	      motion = new _Vector2.default(0, this.speed.y * step); // 移动距离
	      newPos = this.pos.plus(motion); // 移动后的新位置

	      /* 2.对于玩家碰到物体时的判断 */
	      obstacle = level.obstacleAt(newPos, this.size); // 移动位置上是否有障碍物
	      if (obstacle) {
	        // 如碰到的是熔岩，游戏结束
	        level.playerTouched(obstacle);
	        if (keys.up && this.speed.y > 0) // 跳跃及高度大于0时，会下落
	          this.speed.y = -jumpSpeed;else // 碰到物体时，按下键和 y 坐标 <= 0 ,y坐标始终为0（不会继续下落）
	          this.speed.y = 0;
	      } else {
	        // 没碰到物体，更新位置
	        this.pos = newPos;
	      }
	    }

	    /**
	     * act - 运动函数 (玩家会水平和垂直移动)
	     *
	     * @param  {Number} step  速度向量
	     * @param  {Level}  level 游戏地图对象
	     * @param  {Object} keys  按键键值对象
	     */

	  }, {
	    key: 'act',
	    value: function act(step, level, keys) {
	      /* 1.整合水平垂直运动逻辑 */
	      this.moveX(step, level, keys);
	      this.moveY(step, level, keys);

	      /* 2.碰到活动元素的逻辑 */
	      // 碰到硬币的逻辑(搜集或通关)
	      // 碰到熔岩(死亡)
	      var otherActor = level.actorAt(this);
	      if (otherActor) level.playerTouched(otherActor.type, otherActor);

	      /* 3.游戏失败 */
	      // 游戏失败时会有玩家渐渐消融的效果
	      if (level.status === 'lost') {
	        this.pos.y += step;
	        this.size.y -= step;
	      }
	    }
	  }]);

	  return Player;
	}();

	exports.default = Player;

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 *  class Vector   矢量类： 存储活动元素的位置和坐标
	 */
	var Vector = function () {
	  // x -> 坐标 x; y -> 坐标 y
	  function Vector(x, y) {
	    _classCallCheck(this, Vector);

	    this.x = x;
	    this.y = y;
	  }

	  /**
	   * plus - 坐标相加，实现坐标移动
	   *
	   * @param  {Object} other 矢量对象
	   * @return {Vector}       返回一个新的坐标矢量
	   */


	  _createClass(Vector, [{
	    key: "plus",
	    value: function plus(other) {
	      return new Vector(this.x + other.x, this.y + other.y);
	    }

	    /**
	     * time - 坐标乘积
	     * 可根据指定数字来缩放向量
	     * 当需计算特定时间内元素移动的距离时，可用该方法计算一个速度向量与时间间隔的乘积
	     *
	     * @param  {Number} factor 乘数
	     * @return {Vector}        返回一个新的坐标矢量
	     */

	  }, {
	    key: "times",
	    value: function times(factor) {
	      return new Vector(this.x * factor, this.y * factor);
	    }
	  }]);

	  return Vector;
	}();

	exports.default = Vector;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Vector = __webpack_require__(3);

	var _Vector2 = _interopRequireDefault(_Vector);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * class Coin   硬币
	 */
	var Coin = function () {
	  // pos -> 位置坐标 Vector
	  function Coin(pos) {
	    _classCallCheck(this, Coin);

	    this.pos = pos.plus(new _Vector2.default(0.2, 0.1)); // 当前位置
	    this.basePos = pos.plus(new _Vector2.default(0.2, 0.1)); // 初始位置
	    this.size = new _Vector2.default(0.6, 0.6);
	    this.wobble = Math.random() * Math.PI * 2;
	    this.type = 'coin';
	  }

	  /**
	   * act - 运动函数 (硬币会在其位置上轻微上下晃动)
	   *
	   * @param  {type} step description
	   */


	  _createClass(Coin, [{
	    key: 'act',
	    value: function act(step) {
	      var wobbleSpeed = 8; // 摇晃速度
	      var wobbleDist = 0.07; // 摇晃幅度

	      this.wobble += step * wobbleSpeed;
	      var wobblePos = Math.sin(this.wobble) * wobbleDist;
	      // 上下轻微摇晃
	      this.pos = this.basePos.plus(new _Vector2.default(0, wobblePos));
	    }
	  }]);

	  return Coin;
	}();

	exports.default = Coin;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Vector = __webpack_require__(3);

	var _Vector2 = _interopRequireDefault(_Vector);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * class Lava   熔岩
	 */
	var Lava = function () {
	  // pos -> 位置坐标 Vector; ch -> 类型字符
	  function Lava(pos, ch) {
	    _classCallCheck(this, Lava);

	    this.pos = pos;
	    this.size = new _Vector2.default(1, 1);
	    this.type = 'lava';

	    if (ch === '=') // 水平方向往返运动的熔岩
	      this.speed = new _Vector2.default(2, 0);else if (ch === '|') // 垂直方向往返运动的熔岩
	      this.speed = new _Vector2.default(0, 2);else if (ch === 'v') {
	      // 垂直下落的熔岩
	      this.speed = new _Vector2.default(0, 3);
	      this.repeatPos = pos; // 如无则会往返
	    }
	  }

	  /**
	   * act - 运动函数 (熔岩有下落和往返运动两种运动模式)
	   *
	   * @param  {Number} step  速度向量
	   * @param  {Level}  level 游戏地图对象
	   */


	  _createClass(Lava, [{
	    key: 'act',
	    value: function act(step, level) {
	      var newPos = this.pos.plus(this.speed.times(step));
	      // 新位置无障碍物，就移动到新位置上
	      if (!level.obstacleAt(newPos, this.size)) this.pos = newPos;else if (this.repeatPos) // 下落熔岩碰到障碍物，闪回初始位置
	        this.pos = this.repeatPos;else // 速度逆转，确保其开始向另一个方向移动(往返运动)
	        this.speed = this.speed.times(-1);
	    }
	  }]);

	  return Lava;
	}();

	exports.default = Lava;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Vector = __webpack_require__(3);

	var _Vector2 = _interopRequireDefault(_Vector);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * class Level   地图
	 */
	var Level = function () {
	  // plan -> 定义关卡的数组; actorChars -> 存储字符与活动元素类型对象映射的对象
	  function Level(plan, actorChars) {
	    _classCallCheck(this, Level);

	    this.actorChars = actorChars;
	    this.width = plan[0].length; // 地图宽度
	    this.height = plan.length; // 地图高度
	    this.grid = []; // 地图网格（内部有整个地图每一行的格子类型）
	    // 活动元素 // 保存对象，并跟踪关卡中动态元素的位置和状态
	    // 每个活动元素都包含以下属性:
	    // pos: 给定元素的当前位置（左上角坐标）
	    // size: 给定元素的尺寸
	    // type: 保存表示元素类型的字符串，如 lava, coin, player
	    this.actors = [];

	    /* 1.生成类型地图 */
	    for (var y = 0; y < this.height; y++) {
	      var line = plan[y],
	          // 地图的每一行
	      gridLine = [];

	      for (var x = 0; x < this.width; x++) {
	        var ch = line[x],
	            // ch 为地铁每一行的每一个格子的字符 @ x ...
	        fieldType = null,
	            // 格子的类型
	        Actor = this.actorChars[ch]; // 取到映射的对象 // Lava Coin Player

	        if (Actor) // 说明该格子中是玩家，熔岩或硬币
	          this.actors.push(new Actor(new _Vector2.default(x, y), ch)); //构造对象并存储
	        else if (ch === 'x') // 墙
	            fieldType = 'wall';else if (ch === '!') // 静止状态的熔岩
	            fieldType = 'lava';

	        gridLine.push(fieldType); // gridLine为存储一行各个格子的类型数组
	      }
	      this.grid.push(gridLine);
	      // console.log(this.grid)
	    }

	    /* 2.找到玩家 */
	    this.player = this.actors.filter(function (actor) {
	      return actor.type === 'player';
	    })[0];

	    /* 3.记录胜负相关信息 */
	    this.status = null; // 记录选手的胜负信息
	    this.finishDelay = null; // 让游戏结束或进入下一关时有一段延迟来显示简单动画
	  }

	  /**
	   * obstacleAt - 玩家是否于其他活动元素碰撞
	   * 判断某个矩形（通过位置与尺寸限定）是否会覆盖在背景网格的非空白区域中
	   *
	   * @param  {type} pos  元素的坐标
	   * @param  {type} size 元素的大小
	   * @return {type}      碰撞元素的类型
	   */


	  _createClass(Level, [{
	    key: 'obstacleAt',
	    value: function obstacleAt(pos, size) {
	      /* 1.处理元素坐标 */
	      var xStart = Math.floor(pos.x),
	          xEnd = Math.ceil(pos.x + size.x),
	          yStart = Math.floor(pos.y),
	          yEnd = Math.ceil(pos.y + size.y);

	      /* 2.位置是否在不可触碰区 */
	      // 元素处于关卡地图之外且触碰到左右边界或上边界
	      if (xStart < 0 || xEnd > this.width || yStart < 0) return 'wall';
	      if (yEnd > this.height) // 地表以下都是熔岩
	        return 'lava';

	      /* 3.元素在网格中时，循环扫描其覆盖的网格，返回第一个找到的非空白方格 */
	      for (var y = yStart; y < yEnd; y++) {
	        for (var x = xStart; x < xEnd; x++) {
	          var fieldType = this.grid[y][x];
	          if (fieldType) return fieldType;
	        }
	      }
	    }

	    /**
	     * actorAt - 扫描活动元素数组并找出与参数中的活动元素重叠的活动元素
	     *
	     * @param  {Lava || Player || Coin} actor 活动元素对象
	     * @return {Lava || Player || Coin}       活动元素对象
	     */

	  }, {
	    key: 'actorAt',
	    value: function actorAt(actor) {
	      for (var i = 0; i < this.actors.length; i++) {
	        var other = this.actors[i];
	        if (other != actor && actor.pos.x + actor.size.x > other.pos.x && actor.pos.x < other.pos.x + other.size.x && actor.pos.y + actor.size.y > other.pos.y && actor.pos.y < other.pos.y + other.size.y) return other;
	      }
	    }

	    /**
	     * animate - 让关卡中的每个活动元素都有一次移动的机会
	     *
	     * @param  {type} step 速度向量
	     * @param  {type} keys 键值对象
	     */

	  }, {
	    key: 'animate',
	    value: function animate(step, keys) {
	      var _this = this;

	      var maxStep = 0.05; // 时间间隔

	      if (this.status !== null) // status 非空表玩家胜利或失败
	        this.finishDelay -= step; // 倒计时， finishDelay 保存了玩家胜利或失败之后游戏继续展示关卡的时间

	      var _loop = function _loop() {
	        var thisStep = Math.min(step, maxStep);
	        _this.actors.forEach(function (actor) {
	          actor.act(thisStep, _this, keys); // 每个活动对象均执行运动函数
	        });
	        step -= thisStep;
	      };

	      while (step > 0) {
	        _loop();
	      }
	    }

	    /**
	     * playerTouched - 检测玩家是否与其他活动元素碰撞
	     *
	     * @param  {String}                 type  活动元素的类型
	     * @param  {Lava || Player || Coin} actor 活动元素
	     */

	  }, {
	    key: 'playerTouched',
	    value: function playerTouched(type, actor) {
	      if (type === 'lava' && this.status === null) {
	        // 碰到熔岩，被烧死
	        this.status = 'lost';
	        this.finishDelay = 1;
	      } else if (type === 'coin') {
	        // 搜集硬币
	        // 从地图中移出硬币
	        this.actors = this.actors.filter(function (other) {
	          return other != actor;
	        });
	        // 没有硬币了
	        var noCoins = !this.actors.some(function (actor) {
	          return actor.type === 'coin';
	        });
	        if (noCoins) {
	          // 硬币搜集完成，通关
	          this.status = 'won';
	          this.finishDelay = 1;
	        }
	      }
	    }

	    /**
	     * isFinished - 判断游戏结束(胜利 or 失败)
	     *
	     * @return {Boolean}  判断结果
	     */

	  }, {
	    key: 'isFinished',
	    value: function isFinished() {
	      return this.status !== null && this.finishDelay < 0;
	    }
	  }]);

	  return Level;
	}();

	exports.default = Level;

/***/ },
/* 7 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/**
	 * elt function - 创建dom元素并赋予class
	 *
	 * @param  {String} tagName   需创建的标签类型
	 * @param  {String} className 需赋予的 class
	 * @return {DOM}              创建的 DOM 元素
	 */
	var elt = exports.elt = function elt(tagName, className) {
	  var elt = document.createElement(tagName);
	  if (className) elt.className = className;
	  return elt;
	};

	/**
	 * trackKeys - 构造一个键值事件对象
	 *
	 * @param  {Object} codes 键值对象
	 * @return {Object}       键值事件对象
	 */
	var trackKeys = exports.trackKeys = function trackKeys(codes) {
	  var pressed = Object.create(null); // 事件对象
	  // 事件处理函数
	  function handler(event) {
	    if (codes.hasOwnProperty(event.keyCode)) {
	      var state = event.type === 'keydown';
	      pressed[codes[event.keyCode]] = state;
	      event.preventDefault();
	    }
	  }
	  // 绑定事件
	  addEventListener('keydown', handler);
	  addEventListener('keyup', handler);
	  // 注销事件
	  pressed.unregister = function () {
	    removeEventListener('keydown', handler);
	    removeEventListener('keyup', handler);
	  };
	  return pressed;
	};

	/**
	 * runAnimation - requestAnimationFrame的封装
	 * requestAnimationFrame 要求跟踪上次调用函数的时间，并在每一帧后再次调用 requestAnimationFrame
	 *
	 * @param  {type} frameFunc 帧回调
	 */
	var runAnimation = exports.runAnimation = function runAnimation(frameFunc) {
	  var lastTime = null;
	  // time是时间间隔，用于绘制一帧图像，当帧函数返回false时，整个动画停止
	  function frame(time) {
	    var stop = false;
	    if (lastTime !== null) {
	      // 每帧最大间隔时间为100毫秒
	      var timeStep = Math.min(time - lastTime, 100) / 1000;
	      stop = frameFunc(timeStep) === false;
	    }
	    // 页面隐藏时，requestAnimationFrame调用会暂停，lastTime和tim之差为隐藏页面的整个时间
	    lastTime = time;
	    if (!stop) requestAnimationFrame(frame);
	  }
	  requestAnimationFrame(frame);
	};

	/**
	 * flipHorizontally - 在指定的 x 坐标处纵向反转一张图片
	 *
	 * @param  {Canvas getContext} context 画布
	 * @param  {Number}            around  反转基点 
	 */
	var flipHorizontally = exports.flipHorizontally = function flipHorizontally(context, around) {
	  context.translate(around, 0);
	  context.scale(-1, 1);
	  context.translate(-around, 0);
	};

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /* 采用 DOM table 方案的绘制方法 */

	var _utils = __webpack_require__(7);

	var _config = __webpack_require__(1);

	var config = _interopRequireWildcard(_config);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * class DOMDisplay   DOM绘制
	 */
	var DOMDisplay = function () {
	  // parent -> dom容器; level -> 地图对象 Level
	  function DOMDisplay(parent, level) {
	    _classCallCheck(this, DOMDisplay);

	    this.scale = config.scale; // 比例尺
	    this.wrap = parent.appendChild((0, _utils.elt)('div', 'game')); // 游戏的包装器
	    this.level = level;
	    this.actorLayer = null;

	    this.wrap.appendChild(this.drawBackground());
	    // drawFrame需用 actorLayer 属性来跟踪保存活动元素的动作
	    this.drawFrame();
	  }

	  /**
	   * drawBackground - 绘制背景
	   *
	   * @return {DOM}  作为背景的表格 DOM
	   */


	  _createClass(DOMDisplay, [{
	    key: 'drawBackground',
	    value: function drawBackground() {
	      var _this = this;

	      var table = (0, _utils.elt)('table', 'background');

	      table.style.width = this.level.width * this.scale + 'px';

	      this.level.grid.forEach(function (row) {
	        var rowElt = table.appendChild((0, _utils.elt)('tr')); // 绘制行
	        rowElt.style.height = _this.scale + 'px';

	        row.forEach(function (type) {
	          rowElt.appendChild((0, _utils.elt)('td', type)); // 绘制格子
	        });
	      });
	      return table;
	    }

	    /**
	     * drawActors - 绘制活动元素
	     *
	     * @return {DOM}  活动元素 DOM
	     */

	  }, {
	    key: 'drawActors',
	    value: function drawActors() {
	      var _this2 = this;

	      var wrap = (0, _utils.elt)('div'); // 所有活动元素的容器

	      this.level.actors.forEach(function (actor) {
	        var rect = wrap.appendChild((0, _utils.elt)('div', 'actor ' + actor.type)); // 绘制每个活动元素
	        rect.style.width = actor.size.x * _this2.scale + 'px';
	        rect.style.height = actor.size.y * _this2.scale + 'px';
	        rect.style.left = actor.pos.x * _this2.scale + 'px';
	        rect.style.top = actor.pos.y * _this2.scale + 'px';
	      });
	      return wrap;
	    }

	    /**
	     * drawFrame - 每次刷新显示，重绘所有活动元素
	     *
	     */

	  }, {
	    key: 'drawFrame',
	    value: function drawFrame() {
	      if (this.actorLayer) this.wrap.removeChild(this.actorLayer);

	      this.actorLayer = this.wrap.appendChild(this.drawActors()); // 返回被添加的节点
	      this.wrap.className = 'game ' + (this.level.status || '');
	      this.scrollPlayerIntoView();
	    }

	    /**
	     * scrollPlayerIntoView - 找出玩家位置并更新包装器元素的滚动坐标
	     * 通过操纵元素的scrollLeft和scrollTop属性，当玩家接近视口边界时修改滚动坐标
	     *
	     */

	  }, {
	    key: 'scrollPlayerIntoView',
	    value: function scrollPlayerIntoView() {
	      var width = this.wrap.clientWidth,
	          height = this.wrap.clientHeight,
	          margin = width / 3,

	      // The viewport
	      left = this.wrap.scrollLeft,
	          right = left + width,
	          top = this.wrap.scrollTop,
	          bottom = top + height,

	      // 玩家
	      player = this.level.player,

	      // 玩家中心位置
	      // 左上角位置坐标加上其尺寸的一半 = 关卡坐标的中心位置，最后再将结果乘以显示比例
	      center = player.pos.plus(player.size.times(0.5)).times(this.scale);

	      if (center.x < left + margin) this.wrap.scrollLeft = center.x - margin;else if (center.x > right - margin) this.wrap.scrollLeft = center.x + margin - width;

	      if (center.y < top + margin) this.wrap.scrollTop = center.y - margin;else if (center.y > bottom - margin) this.wrap.scrollTop = center.y + margin - height;
	    }

	    /**
	     * clear - 清除显示的关卡，当从新开始和进入下一关时会用到
	     *
	     */

	  }, {
	    key: 'clear',
	    value: function clear() {
	      this.wrap.parentNode.removeChild(this.wrap);
	    }
	  }]);

	  return DOMDisplay;
	}();

	exports.default = DOMDisplay;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /* 采用 Canvas 方案的绘制方法 */

	var _utils = __webpack_require__(7);

	var _config = __webpack_require__(1);

	var config = _interopRequireWildcard(_config);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * class CanvasDisplay   Canvas绘制
	 * 相对于 DOMDisplay ， CanvasDisplay 需使用dom元素的滚动位置，还需追踪自己的viewport
	 * viewport会告诉我们目前属于哪个关卡，也会记录时间及当前使用哪一帧的数据
	 */
	var CanvasDisplay = function () {
	  // parent -> dom容器; level -> 地图对象 Level
	  function CanvasDisplay(parent, level) {
	    _classCallCheck(this, CanvasDisplay);

	    this.canvas = parent.appendChild((0, _utils.elt)('canvas', 'game'));
	    this.canvas.width = Math.min(600, level.width * config.scale);
	    this.canvas.height = Math.min(450, level.height * config.scale);
	    this.cx = this.canvas.getContext('2d');

	    this.level = level;
	    this.animationTime = 0; // 计数器,使 drawFrame 可根据当前时间切换动画帧
	    // flipPlayer 确保即便玩家站立不动时，它面朝的方向也会和上次移动的方法一致
	    this.flipPlayer = false;

	    this.viewport = {
	      left: 0,
	      top: 0,
	      width: this.canvas.width / config.scale,
	      height: this.canvas.height / config.scale
	    };
	    // 其他 img -> lava coin wall
	    this.otherSprites = (0, _utils.elt)('img');
	    this.otherSprites.src = __webpack_require__(10);
	    // 玩家img，有各种动作
	    this.playerSprites = (0, _utils.elt)('img');
	    this.playerSprites.src = __webpack_require__(11);

	    this.drawFrame(0);
	  }

	  /**
	   * drawFrame - 动画帧,重绘背景和元素，并更新视口
	   * 和 dom 的 drawFrame 不同:
	   *   - dom 的只画一次背景，并通过滚动dom元素来移动它
	   *   - canvas 画布上的图形在绘制后只是像素，无法移动或删除，所以
	   *     唯一更新画布的方式是清除并重绘场景
	   *
	   * @param  {Number} step 步长
	   */


	  _createClass(CanvasDisplay, [{
	    key: 'drawFrame',
	    value: function drawFrame(step) {
	      this.animationTime += step; // 记录时间
	      this.updateViewport(); // 更新视口
	      this.clearDisplay(); // 清除场景
	      this.drawBackground(); // 绘制背景
	      this.drawActors(); // 绘制活动元素
	    }

	    /**
	     * updateViewport - description
	     *
	     */

	  }, {
	    key: 'updateViewport',
	    value: function updateViewport() {
	      var view = this.viewport;
	      var margin = view.width / 3,
	          player = this.level.player,
	          center = player.pos.plus(player.size.times(0.5));

	      if (center.x < view.left + margin) view.left = Math.max(center.x - margin, 0);else if (center.x > view.left + view.width - margin) view.left = Math.min(center.x + margin - view.width, this.level.width - view.width);

	      if (center.y < view.top + margin) view.top = Math.max(center.y - margin, 0);else if (center.y > view.top + view.height - margin) view.top = Math.min(center.y + margin - view.height, this.level.height - view.height);
	    }
	  }, {
	    key: 'clearDisplay',
	    value: function clearDisplay() {
	      if (this.level.status === 'won') this.cx.fillStyle = 'rgb(68, 191, 255)';else if (this.level.status === 'lost') this.cx.fillStyle = 'rgb(44, 136, 214)';else this.cx.fillStyle = 'rgb(52, 166, 251)';

	      this.cx.fillRect(0, 0, this.canvas.width, this.canvas.height);
	    }
	  }, {
	    key: 'drawBackground',
	    value: function drawBackground() {
	      var view = this.viewport,
	          scale = config.scale,
	          xStart = Math.floor(view.left),
	          xEnd = Math.ceil(view.left + view.width),
	          yStart = Math.floor(view.top),
	          yEnd = Math.ceil(view.top + view.height);

	      for (var y = yStart; y < yEnd; y++) {
	        for (var x = xStart; x < xEnd; x++) {
	          var tile = this.level.grid[y][x];

	          if (tile === null) continue;

	          var screenX = (x - view.left) * config.scale,
	              screenY = (y - view.top) * config.scale,
	              tileX = tile === 'lava' ? config.scale : 0;

	          this.cx.drawImage(this.otherSprites, tileX, 0, scale, scale, screenX, screenY, scale, scale);
	        }
	      }
	    }
	  }, {
	    key: 'drawPlayer',
	    value: function drawPlayer(x, y, width, height) {
	      var sprite = 8;
	      var player = this.level.player,
	          playerXOverlap = 4;

	      width += playerXOverlap * 2;
	      x -= playerXOverlap;

	      if (player.speed.x !== 0) this.flipPlayer = player.speed.x < 0;

	      if (player.speed.y !== 0) sprite = 9;else if (player.speed.x !== 0) sprite = Math.floor(this.animationTime * 12) % 8;

	      this.cx.save();

	      if (this.flipPlayer) (0, _utils.flipHorizontally)(this.cx, x + width / 2);

	      this.cx.drawImage(this.playerSprites, sprite * width, 0, width, height, x, y, width, height);
	      this.cx.restore();
	    }
	  }, {
	    key: 'drawActors',
	    value: function drawActors() {
	      var _this = this;

	      this.level.actors.forEach(function (actor) {
	        var scale = config.scale,
	            width = actor.size.x * scale,
	            height = actor.size.y * scale,
	            x = (actor.pos.x - _this.viewport.left) * scale,
	            y = (actor.pos.y - _this.viewport.top) * scale;

	        if (actor.type === 'player') _this.drawPlayer(x, y, width, height);else {
	          var tileX = (actor.type === 'coin' ? 2 : 1) * scale;
	          _this.cx.drawImage(_this.otherSprites, tileX, 0, width, height, x, y, width, height);
	        }
	      });
	    }

	    /**
	     * clear - 清除显示的关卡，当从新开始和进入下一关时会用到
	     *
	     */

	  }, {
	    key: 'clear',
	    value: function clear() {
	      this.canvas.parentNode.removeChild(this.canvas);
	    }
	  }]);

	  return CanvasDisplay;
	}();

	exports.default = CanvasDisplay;

/***/ },
/* 10 */
/***/ function(module, exports) {

	module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADQAAAAUCAYAAADC1B7dAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3gYSDiQal6SInQAAA7RJREFUWMO1V89LG0EU/jYsVOIPUshBDT1MPYgihVxCwIMgCN566E2tgsf+CVJvxYt4sx4LEXop9NYfQkHqQYg5GJAY6UHnEDQWtiSoDWmVbg+7M/tmdnajxT6Qzbx5G983b973vlifP31wcY82vL4MAGBZ7jlGu7xntR0OHu0CRga8z0d1GcPLTIawj/sWfaX45oGSb37xl7JvuT8OXfQNequLM+8p1gCaJwcoHl9iemrc29f2Uuk00Dco44bXl8Fm68F/0IDwMgvAUsAR8XjVsASQ3FgydCalSgsbhTQ2d04tALCbjoMUgKbjyKCUSJj4micHck/x++/LE52te6dOTpyeulK5attcOQ2sAJPINfD7ZBW2syJDcmNJYMHB/ETG3dw5tRI08dOfrkySJq3vxflQbQPveZCon5QAIq9TtR2ujoh/xgLAftImMBTUiwUvh4RIqnh8qSQpPot17fwqtGcCHDJSAZbl6nUzVUc7ENEzFMxNegmlSiv06vxExrVr51eo+Y7a+ZX3jLgBNFb6tPX2GgObhJkYTEDpngZwe40h+foQABQwtrOC3FgSpUoLel/Z01PjCiFs7XHkh3qRevwEuDjzesRvfBnXN4itL7tBHPFzHYwp+ZEBYMRnNn2fMB2bBL5r57D/9aUEs1FII7eqVsoWSYeM+JuOAwhghCAo04kYncH424GALIQd+cQhKBv1EEGI7xGA9MpsFNJ+36gVshrfdlzaB7XzK+SHekP9kelW6B7F40s86u8J+VObT2MZKwBhqBBlQ3EAM3XrT+mhe5NeUq6eTt1iJiX05tfXAiRdm8iheHwZTQw06aN68GfoG5blARh/r1RpwXZWYDsrEMB0MBsF7/ZY960UpnfnVBUQkfitLWKwUpajg9Vyrxsu7Rl98iuNb1ITF2fY2uNSSfDnc2ofRVho0OqSJ8s9YoiQPqIiAkgkKeiTn4JQyMMHL4nDJwqRiExy209wUk3eBITG0u8wabf8ovmgbH3yZ7qtEOuZYuL8FBQz0bhGFgxc0nRs7C3M7jT5xZOyGWVDqiTQ34OUP0uiktJPnoFHgzAN5A72f0iBDEgdDL1WpusXRQq3BuReN1zR2PmhXkUVNE8OFCXQdByVKExK4t1IvFaLIQk2Ww+ripm6dbcrF0EK0ndXJSFUNJU3BmmjG8tyoIqOcR0BdSIF/adFHFE0HQeNMvP6osrNwzVGjP5LZXVL6JNfn/hiXyjxTkoispnF7xyRsEltj3bJNS+zSOqOs7+uassKVEInCQAAAABJRU5ErkJggg=="

/***/ },
/* 11 */
/***/ function(module, exports) {

	module.exports = "data:image/png;base64,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"

/***/ }
/******/ ]);