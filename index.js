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
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _main = __webpack_require__(1);

	var _main2 = _interopRequireDefault(_main);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	(0, _main2.default)();

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.game = undefined;

	var _Phaser = __webpack_require__(2);

	var _Phaser2 = _interopRequireDefault(_Phaser);

	var _Game = __webpack_require__(3);

	var _Game2 = _interopRequireDefault(_Game);

	var _Boot = __webpack_require__(4);

	var _Boot2 = _interopRequireDefault(_Boot);

	var _Preload = __webpack_require__(5);

	var _Preload2 = _interopRequireDefault(_Preload);

	var _Home = __webpack_require__(6);

	var _Home2 = _interopRequireDefault(_Home);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/************************************************************************************/

	/************************************** STATES **************************************/
	var game = exports.game = void 0;

	exports.default = function () {
	    exports.game = game = new _Phaser2.default.Game(680, 380, _Phaser2.default.AUTO);
	    game.state.add('Game', _Game2.default);
	    game.state.add('Boot', _Boot2.default);
	    game.state.add('Preload', _Preload2.default);
	    game.state.add('Home', _Home2.default);
	    game.state.start('Boot');
	};

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = window.Phaser;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _main = __webpack_require__(1);

	var _Phaser = __webpack_require__(2);

	var _Phaser2 = _interopRequireDefault(_Phaser);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var guy = void 0,
	    buttons = void 0,
	    selectedItem = void 0,
	    background = void 0,
	    tmp = void 0;

	function create() {
	    "use strict";

	    _main.game.physics.startSystem(_Phaser2.default.Physics.ARCADE);
	    background = _main.game.add.image(0, 0, 'background');
	    background.inputEnabled = true;
	    background.events.onInputDown.add(handleBgClick);
	    buttons = _main.game.add.group();
	    var temp = void 0;
	    temp = buttons.create(_main.game.world.centerX - 150, _main.game.world.height - 100, 'hambie');
	    temp.customParams = {
	        health: -30,
	        fun: 20
	    };
	    temp = buttons.create(_main.game.world.centerX, _main.game.world.height - 100, 'greenie');
	    temp.customParams = {
	        health: 20,
	        fun: -30
	    };
	    temp = buttons.create(_main.game.world.centerX + 150, _main.game.world.height - 100, 'pc');
	    temp.customParams = {
	        health: 15,
	        fun: 15
	    };
	    buttons.forEach(function (sprite) {
	        sprite.inputEnabled = true;
	        sprite.scale.setTo(3);
	        sprite.events.onInputDown.add(handleClick);
	    });
	    guy = _main.game.add.sprite(_main.game.world.centerX, _main.game.world.centerY, 'guy', 0);
	    guy.customParams = {
	        health: 100,
	        fun: 100
	    };
	    guy.anchor.setTo(0.5);
	    guy.scale.setTo(3);
	    guy.inputEnabled = true;
	    guy.input.enableDrag();
	    _main.game.physics.enable(guy, _Phaser2.default.Physics.ARCADE);
	    guy.body.collideWorldBounds = true;
	}
	function update() {
	    "use strict";

	    _main.game.physics.arcade.overlap(guy, tmp, function () {
	        console.log("OVERLAP");
	        tmp.kill();
	        guy.body.velocity.x = guy.body.velocity.y = 0;
	    });
	}

	function render() {}
	function handleBgClick(sprite, event) {
	    tmp = _main.game.add.sprite(event.position.x, event.position.y, selectedItem.key);
	    _main.game.physics.enable(tmp, _Phaser2.default.Physics.ARCADE);
	    _main.game.physics.arcade.accelerateToObject(guy, tmp);
	}
	function handleClick(sprite) {
	    "use strict";

	    var oldItem = selectedItem;
	    selectedItem = sprite;
	    if (oldItem) oldItem.alpha = 1;
	    if (selectedItem) selectedItem.alpha = 0.7;

	    switch (sprite.key) {
	        case 'pc':
	            handlePC();
	            break;
	    }
	}
	function handlePC() {
	    var currentlySelectedTween = _main.game.add.tween(guy);
	    currentlySelectedTween.to({
	        angle: 720
	    }, 300);
	    currentlySelectedTween.start();
	}
	exports.default = {
	    create: create,
	    update: update,
	    render: render
	};

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _main = __webpack_require__(1);

	var _Phaser = __webpack_require__(2);

	var _Phaser2 = _interopRequireDefault(_Phaser);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	    preload: preload,
	    create: create,
	    update: update,
	    render: render
	};


	function preload() {
	    "use strict";

	    console.log("Boot");
	    _main.game.load.spritesheet('loadBar', 'src/resources/assets/loadbar.png', 32, 32);
	    _main.game.load.image('logo', 'src/resources/assets/logo.png');
	}
	function create() {
	    "use strict";

	    _main.game.stage.backgroundColor = '#fff';
	    _main.game.state.start('Preload');
	}
	function update() {}
	function render() {}

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _main = __webpack_require__(1);

	var _Phaser = __webpack_require__(2);

	var _Phaser2 = _interopRequireDefault(_Phaser);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var logo = void 0,
	    progressBar = void 0;
	exports.default = {
	    preload: preload,
	    create: create,
	    update: update,
	    render: render
	};


	function preload() {
	    "use strict";

	    console.log("Preload");
	    logo = _main.game.add.sprite(_main.game.world.centerX, _main.game.world.centerY - 150, 'logo');
	    logo.scale.setTo(0.2);

	    progressBar = _main.game.add.sprite(_main.game.world.centerX, _main.game.world.centerY, 'loadBar');
	    progressBar.scale.setTo(3);
	    progressBar.animations.add('load', [1, 2, 3], 6, true);
	    progressBar.play('load');
	    _main.game.load.image('background', './src/resources/assets/bg2.jpg');
	    _main.game.load.image('hambie', './src/resources/assets/hambie.png');
	    _main.game.load.image('greenie', './src/resources/assets/zielsko.png');
	    _main.game.load.image('pc', './src/resources/assets/pc.png');
	    _main.game.load.spritesheet('guy', './src/resources/assets/guy.png', 32, 32, 5);
	}
	function create() {
	    "use strict";

	    progressBar.kill();
	    logo.kill();
	    _main.game.state.start('Home');
	}
	function update() {}
	function render() {}

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _main = __webpack_require__(1);

	var _Phaser = __webpack_require__(2);

	var _Phaser2 = _interopRequireDefault(_Phaser);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	    create: create,
	    update: update,
	    render: render
	};

	function create() {
	    "use strict";

	    console.log("HOME STATE");
	}
	function update() {}
	function render() {}

/***/ }
/******/ ]);