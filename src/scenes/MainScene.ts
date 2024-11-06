import { ChoiceBoxConfig } from "../components/ChoiceBox";
import { DialogBox, DialogBoxConfig } from "../components/DialogBox";
import { TimelinePlayer } from "../components/TimelinePlayer";
import { timelineData } from "../data/timeline";
import { Timeline } from "../type/Timeline";

export class MainScene extends Phaser.Scene {
    private timeline?: Timeline;
    private timelineID: string;
    private timelineIndex: number;
    private backgroundKey?: string;
    private locationName?: string;

    constructor() {
        super("main");
    }

    init(data: any) {
        const timelineID = data.timelineID || localStorage.getItem("timeline") || "chapter1";
        // const timelineID = data.timelineID || "chapter1";
        if (!(timelineID in timelineData)) {
            console.error("invalid timelineID: " + timelineID);
        }

        this.timeline = timelineData[timelineID];
        this.timelineID = timelineID;
        this.timelineIndex = parseInt(localStorage.getItem("timelineIndex") || "0");
        // this.timelineIndex = 0;

        console.log(data, this.timelineIndex);
        if (data.fadeTime) {
            this.cameras.main.fadeIn(data.fadeTime, 0, 0, 0);
        }

        if (data.backgroundKey) {
            this.backgroundKey = data.backgroundKey;
        }
        if (data.locationName) {
            this.locationName = data.locationName;
        }
    }

    create() {
        if (!this.timelineID) {
            return;
        }
        const { width, height } = this.game.canvas;
        const dialogBoxConfig: DialogBoxConfig = { canvasWidth: width, canvasHeight: height };
        const dialogBox = new DialogBox(this, dialogBoxConfig);
        const timelinePlayer = new TimelinePlayer(this, dialogBox, width, height);
        timelinePlayer.start(this.timelineID, this.timelineIndex, this.backgroundKey, this.locationName);

        // const choiceBoxConfig: ChoiceBoxConfig = {
        //     canvasWidth: width,
        //     canvasHeight: height,
        // };
        // this.add.rectangle(0, 0, width, height).setOrigin(0, 0).setStrokeStyle(20, 0xff0000);
    }
}
