export class EndingScene extends Phaser.Scene {
    // private text: string;
    constructor() {
        super("ending");
    }

    // init(data: any) {
    //     // this.text = data.text || "おしまい";
    //     // if (data.fadeTime) {
    //     //     this.cameras.main.fadeIn(data.fadeTime, 0, 0, 0);
    //     // }
    //     // console.log(this.text);
    // }

    create() {
        this.add.image(0, 0, "wip").setOrigin(0, 0);

        const hitArea = this.add.zone(0, 0, 1920, 1080).setOrigin(0, 0);
        hitArea.setInteractive();
        hitArea.setInteractive({
            useHandCursor: true,
        });

        hitArea.on("pointerdown", () => {
            this.scene.start("title");
            localStorage.setItem("timeline", "chapter1");
            localStorage.setItem("timelineIndex", "0");
        });
    }
}
