import Phaser from './Phaser';
import $ from 'jquery';
import stateA from './stateA';
import stateB from './stateB';
export let game;
export default () => {
    game = new Phaser.Game(800, 400, Phaser.AUTO);
    game.state.add('moveToPointer', stateA);
    game.state.start('moveToPointer');
}