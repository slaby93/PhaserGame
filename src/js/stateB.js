import {game} from './Game.js';
function preload() {
    "use strict";
    game.load.spritesheet('dude', './src/resources/assets/dude.png', 32, 48);

}
function create() {
    "use strict";
    console.log("STATE B");
    console.log(game.cache.getKeys());
}
function update() {
    "use strict";

}
function render() {
    "use strict";
}
export  default  {
    preload: preload,
    create: create,
    update: update,
    render: render
}