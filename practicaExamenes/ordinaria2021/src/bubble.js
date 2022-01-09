/**
 * Clase que representa una pompa
 */
export default class Bubble extends Phaser.GameObjects.Arc {

    /**
     * Constructor
     * @param {Phaser.Scene} scene escena
     * @param {*} maxX 
     * @param {*} maxY 
     * @param {*} speed 
     */
    constructor(scene, maxX, maxY, speed) {

        let random = Phaser.Math.Between(1, 3);

        let radius = 0;

        switch (random) {
            case 1: radius = 32; break;
            case 2: radius = 64; break;
            case 3: radius = 90; break;
        }

        let x = Phaser.Math.Between(radius + 10, maxX - radius - 10);
        let y = Phaser.Math.Between(radius + 10, maxY - radius - 10);

        super(scene, x, y, radius, 0, 360, false, 0xff0000);

        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);

        this.body.setBounce(1);

        let iniDx = Phaser.Math.Between(0, maxX);
        let iniDy = Phaser.Math.Between(0, maxY);

        this.scene.physics.moveTo(this, iniDx, iniDy, speed);
    }
}