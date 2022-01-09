/**
 * Clase que representa un sprite
 */
export default class Hook extends Phaser.GameObjects.Sprite {
    /** 
   * Constructor del sprite
   * @param {Phaser.Scene} scene Escena a la que pertenece el sprite
   */
    constructor(scene, x, y, speed) {
        super(scene, x, y, 'player');

        this.iniY = y + 40;

        this.deathTimer = -1;
        this.toDestroy = false;

        this.collided = false;

        this.setOrigin(0.5);

        this.setScale(0.5);
        this.setTint(0xff0000);

        this.speed = speed;

        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);

        this.scene.physics.add.collider(this, this.scene.boundaries, (o1, o2) => {

            this.deathTimer = 3000;
            this.activateToDestroy();
        });
        this.scene.physics.add.collider(this, this.scene.bubbles, (o1, o2) => {

            if (!this.collided) {

                o1.destroy();
                o2.destroy();
                this.trace.destroy();

                scene.events.emit('bubbleDead');

                this.collided = true;
            }
        });

        this.scene.physics.moveTo(this, this.x, 0, speed);

        this.graphics = this.scene.add.graphics();

        this.trace = this.scene.add.zone(this.x, this.iniY, 1, 1);
        this.scene.physics.add.existing(this.trace);
        this.trace.setOrigin(1);

        this.scene.physics.add.collider(this.trace, this.scene.bubbles, (o1, o2) => {

            if (!this.collided) {

                o1.destroy();
                o2.destroy();
                this.destroy();

                scene.events.emit('bubbleDead');

                this.collided = true;
            }
        });
    }

    preUpdate(t, dt) {

        super.preUpdate(t, dt);

        this.trace.displayHeight = this.iniY - this.y;

        if (this.deathTimer > 0) {
            this.deathTimer -= dt;
        }
        else if (this.toDestroy) {

            this.destroy();
            this.trace.destroy();
        }
    }

    activateToDestroy() {

        this.toDestroy = true;
    }
}