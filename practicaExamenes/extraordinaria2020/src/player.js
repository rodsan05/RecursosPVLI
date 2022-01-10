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
        super(scene, config.x, config.y, 'walkingAnim', 1);

        this.setScale(2);
        this.setOrigin(0, 1);
        this.setDepth(4);

        this.speed = config.speed;
        this.jumping = false;
        this.landed = true;

        this.iniY = this.y;

        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);

        scene.anims.create({
            key: 'walking',
            frames: scene.anims.generateFrameNumbers('walkingAnim', { start: 1, end: 4 }),
            frameRate: 8,
            repeat: -1
        });
        scene.anims.create({
            key: 'jump',
            frames: scene.anims.generateFrameNumbers('jumpAnim', { start: 1, end: 4 }),
            frameRate: 1 ,
            repeat: 0
        });

        this.scene.input.keyboard.on('keydown', function (event) {
            if (this.body.onFloor()) this.jump();
        }, this);

        this.play('walking');
        this.body.setVelocityX(this.speed);
    }

    /**
     * Método preUpdate
     */
    preUpdate(t, dt) {

        super.preUpdate(t, dt); 

        if (this.jumping && (this.iniY - this.y) < this.displayHeight * 5) {

            this.body.setVelocityY(- this.speed*2 );
        }
        else if (this.jumping) {

            this.jumping = false;
            this.body.setVelocityY(0);
        }
        else  if (!this.landed && this.body.onFloor()) {

            this.landed = true;
            this.play('walking');
        }
    }

    jump() {

        this.jumping = true;
        this.landed = false;
        this.play('jump');
    }
}