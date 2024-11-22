export class NextStepScene extends Phaser.Scene {
    private nextTimelineID?: string;
    private text?: string;
    constructor() {
        super({ key: "nextStep" });
    }

    init(data: any) {
        if (data.nextTimelineID) {
            this.nextTimelineID = data.nextTimelineID;
        }
        if (data.text) {
            this.text = data.text;
        }
    }

    create() {
        if (!this.nextTimelineID) {
            return;
        }
        localStorage.setItem("timelineID", this.nextTimelineID);
        localStorage.setItem("timelineIndex", "0");
        localStorage.removeItem("backgroundKey");
        localStorage.removeItem("locationName");
        localStorage.removeItem("bgmKey");
        this.add.image(0, 0, "next-step").setOrigin(0, 0);
        this.add.text(1132, 1023, this.text!, { fontSize: "73px", fontFamily: "Avenir-Next-Condensed-UltraLightItalic", color: "#5295C3" }).setOrigin(0, 1);
        this.add.text(1600, 1023, "Fin", { fontSize: "55px", fontFamily: "Avenir-Next-Condensed-UltraLightItalic", color: "#5295C3" }).setOrigin(0, 1);
        const hitArea = this.add.zone(0, 0, 1920, 1080).setOrigin(0, 0);
        hitArea.setInteractive();
        hitArea.on("pointerdown", () => {
            // console.log(this.nextTimelineID);
            this.scene.start("main", {
                timelineID: this.nextTimelineID,
            });
        });

        this.input.keyboard!.on("keydown", () => {
            this.scene.start("main", {
                timelineID: this.nextTimelineID,
            });
        });
    }
}
