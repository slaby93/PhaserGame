import {game} from './Game.js';
import Phaser from './Phaser';
let arrows, animals, currentSprite;
function preload() {
    "use strict";
    game.load.image('star', './src/resources/assets/star.png');
    game.load.image('diamond', './src/resources/assets/diamond.png');
    game.load.image('firstAid', './src/resources/assets/firstaid.png');
    game.load.image('arrow', './src/resources/assets/arrow.png');
    game.load.image('background', './src/resources/assets/background.jpg');

    game.load.audio('blink', './src/resources/sounds/blink.wav');
    game.load.audio('ooYeah', './src/resources/sounds/ooYeah.mp3');
}
function create() {
    "use strict";
    game.add.image(0, 0, 'background');
    setUpArrows();
    animals = game.add.group();
    let animal = animals.create(game.world.width / 2, game.world.height / 2, 'star');
    animal.anchor.setTo(0.5);
    animal.scale.setTo(3);
    animal.inputEnabled = true;
    currentSprite = animal;
    animal = animals.create(-1000, game.world.height / 2, 'diamond');
    animal.anchor.setTo(0.5);
    animal.scale.setTo(3);
    animal = animals.create(-1000, game.world.height / 2, 'firstAid');
    animal.anchor.setTo(0.5);
    animal.scale.setTo(3);

}
function update() {
    "use strict";
    computeMovement();

}
function render() {
    "use strict";
}

function computeMovement() {
    "use strict";
}
export  default  {
    preload: preload,
    create: create,
    update: update,
    render: render
}

function handleArrowClick(arrow) {
    let nextSprite, nextSpriteTween, currentSpriteTween, tweenDuration = 600;
    currentSpriteTween = game.add.tween(currentSprite);

    if (arrow.customParams.direction === 'left') {
        // LEFT
        nextSprite = animals.previous();
        nextSprite.x = -1000;
        currentSpriteTween.to({x: 1000}, tweenDuration);
    } else {
        // RIGHT
        nextSprite = animals.next();
        nextSprite.x = 1000;
        currentSpriteTween.to({x: -1000}, tweenDuration);
    }
    nextSpriteTween = game.add.tween(nextSprite);
    nextSpriteTween.to({
        x: game.world.centerX
    }, tweenDuration);
    currentSpriteTween.start();
    nextSpriteTween.start();
    currentSprite = nextSprite;
    console.log(arrow.customParams);
    arrow.customParams.sound.play();
}

function setUpArrows() {
    "use strict";
    arrows = game.add.group();
    let arrow = arrows.create(50, game.world.height / 2, 'arrow');
    arrow.anchor.setTo(0.5);
    arrow.scale.x = -3;
    arrow.scale.y = 3;
    arrow.customParams = {
        direction: 'left',
        sound: game.add.audio('blink')
    };
    arrow = arrows.create(game.world.width - 50, game.world.height / 2, 'arrow');
    arrow.anchor.setTo(0.5);
    arrow.scale.setTo(3);
    arrow.customParams = {
        direction: 'right',
        sound: game.add.audio('blink')
    };
    arrows.forEach((child) => {
        child.inputEnabled = true;
        child.input.pixelPerfectClick = true;
        child.events.onInputDown.add(handleArrowClick);
    });

}