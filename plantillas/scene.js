import Sprite from "./sprite.js";
import Container from "./container.js";
/**
 * Escena
 * @extends Phaser.Scene
 */
export default class Scene extends Phaser.Scene {
    /**
     * Constructor de la escena
     */
    constructor() {
        super({ key: 'scene' });
    }

    /**
     * Init de la escena
     * @param {object} datos 
     */
    init(datos) {

        this.param = datos.param;
    }

    /**
     * Create de la escena
     */
    create() {

        //cosas que hacer al crearse

        let spriteConfig = {
            x: 0,
            y: 0,
            sprite: 'sprite'
        };
        this.sprite = new Sprite(this, spriteConfig);

        let containerConfig = {
            x: 0,
            y: 0,
            sprite: 'sprite'
        };
        this.container = new Container(this, containerConfig);

        this.physics.add.collider(this.sprite, this.container);

        this.add.sprite(x, y, sprite); //Crea un sprite y lo añade a la escena
        this.make.sprite(x, y, sprite); //Crea un sprite pero no lo añade a la escena

        //timer de la escena
        let timer = this.time.addEvent({
            delay: 0,
            callback: this.callbackMethod,
            callback: this
        });
    }

    /**
     * Método llamado desde el evento del timer al completarse
     */
    callbackMethod() {

        //callback
    }
}