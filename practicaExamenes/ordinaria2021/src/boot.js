/**
 * Escena para la precarga de los assets que se usarán en el juego.
 */
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

        // //Fuentes del juego
        // this.loadFont('font', 'assets/fonts/font.ttf');

        // //Sonidos del juego
        // this.load.audio('audio', 'assets/sfx/audio.mp3');

        // Con setPath podemos establecer el prefijo que se añadirá a todos los load que aparecen a continuación
        this.load.setPath('assets/sprites/');

        //Carga de visuales
        this.load.image('button', 'button.png');
        this.load.image('player', 'playertemp.png');
    }

    /**
     * Creación de la escena. En este caso, solo cambiamos a la escena que representa el
     * nivel del juego
     */
    create() {

        this.scene.start('menu');
    }
}