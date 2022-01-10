import Obstacle from './obstacle.js';
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

        
    }

    /**
     * Create de la escena
     */
    create() {

        this.background = this.add.image(0, 0, 'background').setOrigin(0).setScrollFactor(0);
        this.background.displayWidth = this.scale.width;
        this.background.displayHeight = this.scale.height;
        this.backgroundX = this.scale.width;

        this.mountains = this.add.image(0, this.scale.height, 'mountains').setOrigin(0, 1).setScrollFactor(0.25).setDepth(2);
        this.mountains.displayWidth = this.scale.width;
        this.mountains.displayHeight = this.scale.height/2;
        this.mountainsX = this.scale.width;

        this.trees = this.add.image(0, this.scale.height, 'trees').setOrigin(0, 1).setScrollFactor(0.5).setDepth(2);
        this.trees.displayWidth = this.scale.width;
        this.trees.displayHeight = this.scale.height/2;
        this.treesX = this.scale.width;

        this.obstacles = this.add.group();

        let playerConfig = {
            x: this.scale.width/6,
            y: this.scale.height,
            speed: 500
        };
        this.player = new Player(this, playerConfig);

        this.cameras.main.startFollow(this.player, false, 1, 1, -this.scale.width/2.5, this.scale.width/3.6 );
        this.cameras.main.setBounds(0, 0);

        this.ground = this.add.image(0, this.scale.height).setOrigin(0).setScrollFactor(0);
        this.ground.displayWidth = this.scale.width * 1000000000000000000000;
        this.physics.add.existing(this.ground, true);
        this.physics.add.collider(this.ground, this.player);

        this.physics.add.collider(this.player, this.obstacles, () => { this.playerDead(); });

        let random = Phaser.Math.Between(2000, 4000);
        let timer = this.time.addEvent({

            delay: random,
            callback: this.generateObstacle,
            callbackScope: this
        });
    }

    generateObstacle() {

        let obsConfig = {

            x: this.player.x + this.scale.width,
            y: this.scale.height,
            displayWidth: this.player.displayWidth,
            displayHeight: this.player.displayHeight
        };
        let obstacle = new Obstacle(this, obsConfig);
        this.obstacles.add(obstacle);

        let random = Phaser.Math.Between(2000, 4000);
        let timer = this.time.addEvent({

            delay: random,
            callback: this.generateObstacle,
            callbackScope: this
        });
    }

    playerDead() {

        this.scene.launch('unpausescene');
        this.scene.pause(this.key);
    }

    createParallaxImage(count, x, scaleY, texture, scrollFactor) {

        for (let i = 0; i < count; ++i) {
            let image = this.add.image(x, this.scale.height, texture).setOrigin(0, 1).setScrollFactor(scrollFactor).setDepth(2);

            image.displayWidth = this.scale.width;
            image.displayHeight = scaleY;
            
            x += this.scale.width;
        }

        return x;
    }

    update(t, dt) {

        super.update(t, dt);
        
        if (this.mountainsX - this.player.x < 1280) {
            
            this.mountainsX = this.createParallaxImage(10, this.mountainsX, this.scale.height/2, 'mountains', 0.25);
        }
        
        if (this.treesX - this.player.x < 1280) this.treesX = this.createParallaxImage(10, this.treesX, this.scale.height/2, 'trees', 0.5);
    }
}