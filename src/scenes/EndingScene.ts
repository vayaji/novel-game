export class EndingScene extends Phaser.Scene {
    private text: string;
    constructor() {
        super("ending");
    }

    init(data: any) {
        this.text = data.text || "おしまい";

        if (data.fadeTime) {
            this.cameras.main.fadeIn(data.fadeTime, 0, 0, 0);
        }
        // console.log(this.text);
    }

    create() {
        const { width, height } = this.game.canvas;
        this.add.text(width / 2, height / 2 - 100, this.text, { fontSize: "64px", fontFamily: "Noto Sans  JP" }).setOrigin(0.5, 0.5);
        const restartButton = this.add.text(width / 2, height / 2, "back to title", { fontSize: "32px", fontFamily: "Noto Sans  JP" }).setOrigin(0.5, 0.5);
        restartButton.setInteractive({
            useHandCursor: true,
        });

        restartButton.on("pointerdown", () => {
            this.scene.start("title");
        });
    }
}
