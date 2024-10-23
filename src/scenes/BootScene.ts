export class BootScene extends Phaser.Scene {
    constructor() {
        super("boot");
    }

    preload() {
        this.load.image("background", "src/assets/street.png");
    }

    create() {
        this.add.text(100, 100, "boot");

        this.scene.start("preloader");
    }
}
