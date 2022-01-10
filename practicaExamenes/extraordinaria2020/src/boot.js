 export default class Boot extends Phaser.Scene {
    /**
     * Constructor de la escena
     */
    constructor() {
        super({ key: 'boot' });
    }

    /**
     * Método que carga la fuente especificada
     * @param {string} name Nombre de la fuente 
     * @param {string} url Dirección de la fuente
     */
    loadFont(name, url) {
        let newFont = new FontFace(name, `url(${url})`);
        newFont.load().then(function (loaded) {
            document.fonts.add(loaded);
        }).catch(function (error) {
            return error;
        });
    }

    /**
     * Carga de los assets del juego
     */
    preload() {

        // Con setPath podemos establecer el prefijo que se añadirá a todos los load que aparecen a continuación
        this.load.setPath('assets/sprites/');

        this.load.image('background', 'parallax-mountain-bg.png');
        this.load.image('mountains', 'parallax-mountain-mountains.png');
        this.load.image('trees', 'parallax-mountain-foreground-trees.png');
        this.load.image('obstacle', 'playertemp.png');
        this.load.spritesheet('jumpAnim', 'jumpAnim.png', { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('walkingAnim', 'walkingAnim.png', { frameWidth: 32, frameHeight: 32 });
    }

    /**
     * Creación de la escena. En este caso, solo cambiamos a la escena que representa el
     * nivel del juego
     */
    create() {

        this.scene.start('playingscene');
    }
}