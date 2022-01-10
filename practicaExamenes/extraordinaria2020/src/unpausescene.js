/**
 * Escena
 * @extends Phaser.Scene
 */
export default class UnpauseScene extends Phaser.Scene {
    /**
     * Constructor de la escena
     */
    constructor() {
        super({ key: 'unpausescene' });
    }

    /**
     * Create de la escena
     */
    create() {

        //cosas que hacer al crearse

        let timer = this.time.addEvent({

            delay: 2000,
            callback: this.restartScene,
            callbackScope: this
        });
    }

    restartScene() {

        this.scene.start('playingscene');
    }
}