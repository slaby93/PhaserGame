import Phaser from './Phaser';
import $ from 'jquery';

console.table(["apples", "oranges", "bananas"]);
let platforms, cursors, player, stars, score = 0, scoreText;
let game = new Phaser.Game(800, 600, Phaser.AUTO, $('#game'), {
    preload: preload,
    create: create,
    update: update,
    render: render
});

function preload() {
    "use strict";
    game.load.image('platfrom', './src/resources/assets/platform.png');
    game.load.image('diamond', './src/resources/assets/diamond.png');
    game.load.image('firstAid', './src/resources/assets/firstAid.png');
    game.load.image('sky', './src/resources/assets/sky.png');
    game.load.image('star', './src/resources/assets/star.png');
    game.load.spritesheet('dude', './src/resources/assets/dude.png', 32, 48);
}
function create() {
    "use strict";
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.add.sprite(0, 0, 'sky');
    platforms = game.add.group();
    platforms.enableBody = true;
    let ground = platforms.create(0, game.world.height - 64, 'platfrom');
    ground.scale.setTo(2, 2);
    ground.body.immovable = true;
    let ledges = platforms.create(game.world.width - 202, game.world.centerY, 'platfrom');
    ledges.scale.setTo(0.5, 1);
    ledges.body.immovable = true;

    ledges = platforms.create(0, game.world.centerY + 64, 'platfrom');
    ledges.scale.setTo(0.5, 1);
    ledges.body.immovable = true;
    // ADD PLAYER
    player = game.add.sprite(32, game.world.height - 150, 'dude');
    game.physics.arcade.enable(player);
    player.body.gravity.y = 300;
    player.body.collideWorldBounds = true;

    cursors = game.input.keyboard.createCursorKeys()

    //  Our two animations, walking left and right.
    player.animations.add('left', [0, 1, 2, 3], 10, true);
    player.animations.add('right', [5, 6, 7, 8], 10, true);

    stars = game.add.group();
    stars.enableBody = true;
    for (let i = 0; i < 12; i++) {
        let star = stars.create(70 * i, 64, 'star');
        star.body.gravity.y = 100;
        star.body.bounce.y = 0.5;
    }

    scoreText = game.add.text(30, 30, score, {'font-size': 15, 'background-color': 'red'});
}
function update() {
    "use strict";
    game.physics.arcade.overlap(player, stars, (dude, star) => {
        score += 1;
        star.kill();
    }, null, this);
    game.physics.arcade.collide(player, platforms);
    game.physics.arcade.collide(player, stars);
    game.physics.arcade.collide(platforms, stars);
    scoreText.text = score;
    computeMovement();
}
function render() {
    "use strict";
}

function computeMovement() {
    player.body.velocity.x = 0;

    if (cursors.left.isDown) {
        player.body.velocity.x = -200;
        player.animations.play('left');
    } else if (cursors.right.isDown) {
        player.body.velocity.x = 150;
        player.animations.play('right');
    } else {
        player.animations.stop();
        player.frame = 4;
    }

    if (cursors.up.isDown && player.body.touching.down) {
        player.body.velocity.y = -350;
    }
}