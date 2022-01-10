/**
 * Clase que representa un sprite
 */
 export default class Obstacle extends Phaser.GameObjects.Sprite {
    /** 
   * Constructor del sprite
   * @param {Phaser.Scene} scene Escena a la que pertenece el sprite
   * @param {Config} config Configuracion del sprite
   */
    constructor(scene, config) {
        super(scene, config.x, config.y, 'obstacle');

        this.setDepth(4);
        this.displayWidth = config.displayWidth;
        this.displayHeight = config.displayHeight;

        this.setOrigin(0, 1);

        this.scene.add.existing(this);
        this.scene.physics.add.existing(this, true);
    }
}