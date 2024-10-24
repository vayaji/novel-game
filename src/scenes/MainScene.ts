import { ChoiceBoxConfig } from "../components/ChoiceBox";
import { DialogBox, DialogBoxConfig } from "../components/DialogBox";
import { TimelinePlayer } from "../components/TimelinePlayer";
import { timelineData } from "../data/timeline";
import { Timeline } from "../type/Timeline";

export class MainScene extends Phaser.Scene {
    private timeline?: Timeline;

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
        const dialogBoxConfig: DialogBoxConfig = { canvasWidth: width, canvasHeight: height };
        const dialogBox = new DialogBox(this, dialogBoxConfig);
        const timelinePlayer = new TimelinePlayer(this, dialogBox, width, height);
        timelinePlayer.start(this.timeline);

        const choiceBoxConfig: ChoiceBoxConfig = {
            canvasWidth: width,
            canvasHeight: height,
        };
        // this.add.rectangle(0, 0, width, height).setOrigin(0, 0).setStrokeStyle(20, 0xff0000);
    }
}
