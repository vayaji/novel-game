import { Dialogbox, DialogboxConfig } from "../components/DialogBox";
import { timelineData } from "../data/timeline";
import { Timeline } from "../type/Timeline";

export class MainScene extends Phaser.Scene {
    private timeline?: Timeline;
    private hitArea?: Phaser.GameObjects.Zone;

    constructor() {
        super("main");
    }

    init(data: any) {
        const timelineID = data.timelineID || "chapter1";
        if (!(timelineID in timelineData)) {
            console.error("invalid timelineID: " + timelineID);
        }

        this.timeline = timelineData[timelineID];
    }

    create() {
        if (!this.timeline) {
            return;
        }

        const { width, height } = this.game.canvas;

        const dialogBoxConfig: DialogboxConfig = { canvasWidth: width, canvasHeight: height };
        const dialogBox = new Dialogbox(this, dialogBoxConfig);
        dialogBox.setText("セリフ、ダミーテキストダミーテキスト。\nダミーテキストダミーテキスト。");
        dialogBox.setLocation("場所");
        this.hitArea = dialogBox.getZone();
        this.hitArea.setInteractive({
            useHandCursor: true,
        });
        this.hitArea.on("pointerdown", () => {
            if (dialogBox.isAnimating()) {
                dialogBox.forceStop();
            } else {
                console.info("next");
                dialogBox.setCharacterImage("haruto-normal");
            }
        });

        this.add.existing(dialogBox);
        // this.add.rectangle(0, 0, width, height).setOrigin(0, 0).setStrokeStyle(20, 0xff0000);
    }
}
