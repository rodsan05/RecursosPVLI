import Button from "./button.js";
/**
 * Escena
 * @extends Phaser.Scene
 */
export default class GameOverScene extends Phaser.Scene {
    /**
     * Constructor de la escena
     */
    constructor() {
        super({ key: 'gameoverscene' });
    }

    /**
     * Init de la escena
     * @param {object} datos 
     */
    init(datos) {

        this.win = datos.win;
    }

    /**
     * Create de la escena
     */
    create() {

        this.canvas = document.getElementById('mainCanvas');

        if (this.win) this.add.text(this.canvas.width/2, this.canvas.height/3, 'HAS GANADO', {fontSize: 32});
        else this.add.text(this.canvas.width/2, this.canvas.height/3, 'HAS PERDIDO', {fontSize: 32}); 
        this.add.text(this.canvas.width / 2, this.canvas.height / 2, 'Pulsa cualquier tecla para continuar')
            .setOrigin(0.5, 0.5)  // Colocamos el pivote en el centro de cuadro de texto 
            .setAlign('center');  // Centramos el texto dentro del cuadro de texto

        let timer = this.time.addEvent({
            delay: 500, //0.5s
            callback: this.activateListener,
            callbackScope: this
        });
    }

    /**
     * Método llamado desde el evento del timer que activa el listener pasado medio segundo
     */
    activateListener() {

        this.input.keyboard.on('keydown', function (event) {
            this.scene.start('menu');
        }, this);
        this.input.on('pointerdown', function (event) {
            this.scene.start('menu');
        }, this);
    }
}