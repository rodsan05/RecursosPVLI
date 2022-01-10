import Boot from './boot.js';
import PlayingScene from './playingscene.js';
import UnpauseScene from './unpausescene.js';

/**
 * Inicio del juego en Phaser. Creamos el archivo de configuración del juego y creamos
 * la clase Game de Phaser, encargada de crear e iniciar el juego.
 */
let config = {
    type: Phaser.WEBGL,
    canvas: document.getElementById("mainCanvas"),
    width: 1280,
    height: 720,
    backgroundColor: '#aaaaaa',
    scale: {
        autoCenter: Phaser.Scale.CENTER_HORIZONTALLY
    },
    pixelArt: true,
    scene: [Boot, PlayingScene, UnpauseScene],

    //configuracion de fisicas arcade
    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
            gravity: {
                x: 0,
                y: 2000
            }
        }
    }
};

new Phaser.Game(config);