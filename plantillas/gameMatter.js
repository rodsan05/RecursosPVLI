import Scene from './scene.js';
import Scene2 from './scene2.js';

/**
 * Inicio del juego en Phaser. Creamos el archivo de configuración del juego y creamos
 * la clase Game de Phaser, encargada de crear e iniciar el juego.
 */
let config = {
    type: Phaser.WEBGL,
    canvas: document.getElementById("mainCanvas"),
    width: 1280,
    height: 720,
    backgroundColor: '#000000',
    scale: {
        autoCenter: Phaser.Scale.CENTER_HORIZONTALLY
    },
    pixelArt: true,
    scene: [Scene, Scene2],

    //configuracion de fisicas arcade
    physics: {
        default: 'matter',
        arcade: {
            debug: false,
            gravity: {
                x: 0,
                y: 0
            }
        }
    }
};

new Phaser.Game(config);