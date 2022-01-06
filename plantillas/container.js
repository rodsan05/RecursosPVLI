import Container from "./container.js";

/**
 * Clase que representa un container
 */
export default class Container extends Phaser.GameObjects.Container {
    /** 
   * Constructor del Container
   * @param {Phaser.Scene} scene Escena a la que pertenece el sprite
   * @param {Config} config Configuracion del sprite
   */
    constructor(scene, config) {

        let grafic = scene.add.sprite(0, 0, config.sprite, 0);
        //ajustes a grafic

        super(scene, config.x, config.y, grafic);

        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.body.setCollideWorldBounds();

        this.grafics = grafic; //si se necesita guardar para ser modificado

        this.param = config.param;
    }

    //Los container no tienen preUpdate
}