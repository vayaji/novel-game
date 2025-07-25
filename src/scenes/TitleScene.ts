export class TitleScene extends Phaser.Scene {
    constructor() {
        super("title");
    }

    create() {
        const { width, height } = this.game.canvas;
        const image = this.add.image(width / 2, height / 2, "title").setOrigin(0.5, 0.5);

        this.input.keyboard!.on("keydown", () => {
            // this.game.canvas.webkitRequestFullscreen();
            // this.game.canvas.requestFullscreen();
            this.scene.start("main");
        });

        image.setInteractive({
            useHandCursor: true,
        });

        image.on("pointerdown", () => {
            // this.game.canvas.webkitRequestFullscreen();
            // this.game.canvas.requestFullscreen();
            this.scene.start("main");
        });
        // this.add.text(width / 2, height / 2 - 100, "霞ヶ丘の夏音", { fontSize: "64px", fontFamily: "Noto Sans  JP" }).setOrigin(0.5, 0.5);
        // const startButton = this.add.text(width / 2, height / 2, "Click to start", { fontSize: "64px", fontFamily: "Noto Sans  JP" }).setOrigin(0.5, 0.5);
        // startButton.setInteractive({
        //     useHandCursor: true,
        // });

        // startButton.on("pointerdown", () => {
        //     // this.scene.scene.scale.startFullscreen();
        //     this.scene.start("main");
        // });
    }
}
