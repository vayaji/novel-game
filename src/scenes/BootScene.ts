export class BootScene extends Phaser.Scene {
    constructor() {
        super("boot");
    }

    preload() {}

    create() {
        this.add.text(100, 100, "boot");

        this.scene.start("preloader");
    }
}
