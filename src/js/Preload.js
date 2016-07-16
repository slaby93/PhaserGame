import {game} from './main';
import Phaser from './Phaser';

let logo, progressBar;
export default {
    preload: preload,
    create: create,
    update: update,
    render: render
}

function preload() {
    "use strict";
    console.log("Preload");
    logo = game.add.sprite(game.world.centerX, game.world.centerY - 150, 'logo');
    logo.scale.setTo(0.2);

    progressBar = game.add.sprite(game.world.centerX, game.world.centerY, 'loadBar');
    progressBar.scale.setTo(3);
    progressBar.animations.add('load', [1, 2, 3], 6, true);
    progressBar.play('load');
    game.load.image('background', './src/resources/assets/bg2.jpg');
    game.load.image('hambie', './src/resources/assets/hambie.png');
    game.load.image('greenie', './src/resources/assets/zielsko.png');
    game.load.image('pc', './src/resources/assets/pc.png');
    game.load.spritesheet('guy', './src/resources/assets/guy.png', 32, 32, 5);
}
function create() {
    "use strict";
    progressBar.kill();
    logo.kill();
    game.state.start('Home');
}
function update() {
    "use strict";

}
function render() {
    "use strict";

}