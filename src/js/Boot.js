import {game} from './main';
import Phaser from './Phaser';
export default {
    preload: preload,
    create: create,
    update: update,
    render: render
}

function preload() {
    "use strict";
    console.log("Boot");
    game.load.spritesheet('loadBar', 'src/resources/assets/loadbar.png', 32, 32);
    game.load.image('logo', 'src/resources/assets/logo.png');
}
function create() {
    "use strict";
    game.stage.backgroundColor = '#fff';
    game.state.start('Preload');
}
function update() {
    "use strict";

}
function render() {
    "use strict";

}