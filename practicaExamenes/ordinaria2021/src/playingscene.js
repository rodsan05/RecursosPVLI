import Bubble from './bubble.js';
import Player from './player.js';

/**
 * Escena
 * @extends Phaser.Scene
 */
export default class PlayingScene extends Phaser.Scene {
    /**
     * Constructor de la escena
     */
    constructor() {
        super({ key: 'playingscene' });
    }

    /**
     * Init de la escena
     * @param {object} datos 
     */
    init(datos) {

        this.nBubbles = datos.nBubbles;
        if (datos.lives) this.lives = datos.lives
        else this.lives = 3;
    }

    /**
     * Create de la escena
     */
    create() {

        this.canvas = document.getElementById('mainCanvas');
        //cosas que hacer al crearse

        this.graphics = this.add.graphics();

        this.boundaries = this.add.group();
        this.bubbles = this.add.group();

        this.boundaries.add(this.physics.add.existing(this.add.rectangle(0, 0, this.canvas.width * 2, 30, 0xaaaaaa).setOrigin(0), true)); 
        this.boundaries.add(this.physics.add.existing(this.add.rectangle(0, this.canvas.height - 30, this.canvas.width * 2, 30, 0xaaaaaa).setOrigin(0), true)); 
        this.boundaries.add(this.physics.add.existing(this.add.rectangle(0, 0, 30, this.canvas.height, 0xaaaaaa).setOrigin(0), true)); 
        this.boundaries.add(this.physics.add.existing(this.add.rectangle(this.canvas.width*2 - 30, 0, 30, this.canvas.height, 0xaaaaaa).setOrigin(0), true)); 

        let playerConfig = {
            x: this.canvas.width/2,
            y: this.canvas.height - 70,
            speed: 500
        };
        this.player = new Player(this, playerConfig);
        this.physics.add.collider(this.player, this.boundaries);

        this.cameras.main.setBounds(0, 0, this.canvas.width*2, this.canvas.height);
        this.cameras.main.startFollow(this.player);

        for (let i = 0; i < this.nBubbles; i++) 
        {
            this.bubbles.add(new Bubble(this, this.canvas.width * 2, this.canvas.height, 200));
        }

        this.physics.add.collider(this.boundaries, this.bubbles);
        this.physics.add.overlap(this.player, this.bubbles, () => { this.playerDead(); });

        this.events.on('bubbleDead', this.reduceNBubbles, this);
    }

    playerDead() {

        this.lives--;

        if (this.lives > 0) this.scene.start('playingscene', { nBubbles: this.nBubbles, lives: this.lives });
        else this.scene.start('gameoverscene', { win: false });
    }

    reduceNBubbles() {

        this.nBubbles--;

        if (this.nBubbles <= 0) this.scene.start('gameoverscene', { win: true });
    }
}