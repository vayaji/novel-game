export class TitleScene extends Phaser.Scene {
    constructor() {
        super("title");
    }

    create() {
        const { width, height } = this.game.canvas;
        this.add.text(width / 2, height / 2 - 100, "V-Project-T", { fontSize: "64px", fontFamily: "Helvetica" }).setOrigin(0.5, 0.5);
        const startButton = this.add.text(width / 2, height / 2, "Click to start", { fontSize: "32px", fontFamily: "Helvetica" }).setOrigin(0.5, 0.5);
        startButton.setInteractive({
            useHandCursor: true,
        });

        startButton.on("pointerdown", () => {
            this.scene.start("main");
        });
    }
}
