import Sprite from "./sprite.js";

/**
 * Clase que representa un sprite
 */
export default class Sprite extends Phaser.GameObjects.Sprite {
    /** 
   * Constructor del sprite
   * @param {Phaser.Scene} scene Escena a la que pertenece el sprite
   * @param {Config} config Configuracion del sprite
   */
    constructor(scene, config) {
        super(scene, config.x, config.y, config.sprite);

        this.scene.add.existing(this);

        this.scene.matter.add.gameObject(this);

        this.setBody({
            type: 'rectangle',
            width: this.width,
            height: this.height,
        });

        this.param = config.param;
    }

    /**
     * Método preUpdate
     */
    preUpdate(t, dt) {

        super.preUpdate(t, dt);
    }
}