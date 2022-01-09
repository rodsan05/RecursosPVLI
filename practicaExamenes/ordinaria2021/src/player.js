import Hook from './hook.js'

/**
 * Clase que representa un sprite
 */
export default class Player extends Phaser.GameObjects.Sprite {
  /** 
 * Constructor del sprite
 * @param {Phaser.Scene} scene Escena a la que pertenece el sprite
 * @param {Config} config Configuracion del sprite
 */
  constructor(scene, config) {
    super(scene, config.x, config.y, 'player');

    this.speed = config.speed;

    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);

    this.keyA = this.scene.input.keyboard.addKey('A')
    this.keyD = this.scene.input.keyboard.addKey('D')

    this.spaceBar = this.scene.input.keyboard.addKey('SPACE')

    this.spaceBar.on('down', this.shoot, this)
  }

  /**
   * Método preUpdate
   */
  preUpdate(t, dt) {

    super.preUpdate(t, dt);

    if (this.keyA.isDown) {
      this.body.setVelocityX(-this.speed);
    }
    else if (this.keyD.isDown) {
      this.body.setVelocityX(this.speed);
    }
    else {
      this.body.setVelocityX(0);
    }
  }

  shoot() {

    new Hook(this.scene, this.x, this.y, 200);
  }
}