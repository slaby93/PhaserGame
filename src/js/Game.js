import {game} from './main.js';
import Phaser from './Phaser';
let guy, buttons, selectedItem, background, tmp;

function create() {
    "use strict";
    game.physics.startSystem(Phaser.Physics.ARCADE);
    background = game.add.image(0, 0, 'background');
    background.inputEnabled = true;
    background.events.onInputDown.add(handleBgClick);
    buttons = game.add.group();
    let temp;
    temp = buttons.create((game.world.centerX - 150), game.world.height - 100, 'hambie');
    temp.customParams = {
        health: -30,
        fun: 20
    };
    temp = buttons.create(game.world.centerX, game.world.height - 100, 'greenie');
    temp.customParams = {
        health: 20,
        fun: -30
    };
    temp = buttons.create((game.world.centerX + 150), game.world.height - 100, 'pc');
    temp.customParams = {
        health: 15,
        fun: 15
    };
    buttons.forEach((sprite) => {
        sprite.inputEnabled = true;
        sprite.scale.setTo(3);
        sprite.events.onInputDown.add(handleClick);
    });
    guy = game.add.sprite(game.world.centerX, game.world.centerY, 'guy', 0);
    guy.customParams = {
        health: 100,
        fun: 100
    };
    guy.anchor.setTo(0.5);
    guy.scale.setTo(3);
    guy.inputEnabled = true;
    guy.input.enableDrag();
    game.physics.enable(guy, Phaser.Physics.ARCADE);
    guy.body.collideWorldBounds = true;
}
function update() {
    "use strict";
    game.physics.arcade.overlap(guy, tmp, () => {
        console.log("OVERLAP");
        tmp.kill();
        guy.body.velocity.x = guy.body.velocity.y = 0
    })
}

function render() {
    "use strict";
}
function handleBgClick(sprite, event) {
    tmp = game.add.sprite(event.position.x, event.position.y, selectedItem.key);
    game.physics.enable(tmp, Phaser.Physics.ARCADE);
    game.physics.arcade.accelerateToObject(guy, tmp);
}
function handleClick(sprite) {
    "use strict";
    let oldItem = selectedItem;
    selectedItem = sprite;
    if (oldItem)
        oldItem.alpha = 1;
    if (selectedItem)
        selectedItem.alpha = 0.7;

    switch (sprite.key) {
        case 'pc':
            handlePC();
            break;
    }
}
function handlePC() {
    let currentlySelectedTween = game.add.tween(guy);
    currentlySelectedTween.to({
        angle: 720
    }, 300);
    currentlySelectedTween.start();
}
export  default  {
    create: create,
    update: update,
    render: render
}