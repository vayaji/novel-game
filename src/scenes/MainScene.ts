// import { ChoiceBoxConfig } from "../components/ChoiceBox";
import { ModalBehavoir } from "phaser3-rex-plugins/plugins/modal.js";
import { DialogBox, DialogBoxConfig } from "../components/DialogBox";
import { TimelinePlayer } from "../components/TimelinePlayer";
import { timelineData } from "../data/timeline";
import { Timeline } from "../type/Timeline";
import QRCodeStyling from "qr-code-styling";

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
        const params = new URLSearchParams(window.location.search);
        console.log(params.get("timelineID"), params.get("timelineIndex"));
        this.timelineID = params.get("timelineID") || data.timelineID || localStorage.getItem("timeline") || "chapter1";
        this.timelineIndex = parseInt(params.get("timelineIndex")!) || parseInt(localStorage.getItem("timelineIndex")!) || 0;
        if (!(this.timelineID in timelineData)) {
            console.error("invalid timelineID: " + this.timelineID);
        }

        this.timeline = timelineData[this.timelineID];

        // console.log(data, this.timelineIndex);
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
        // this.sound.play("bgm");
        const { width, height } = this.game.canvas;
        let fontSize: string = "32px";
        if (window.innerWidth < 1000) {
            fontSize = "48px";
        } else if (window.innerWidth < 1200) {
            fontSize = "42px";
        }
        // console.log(fontSize, width < 1000, width);
        const dialogBoxConfig: DialogBoxConfig = { canvasWidth: width, canvasHeight: height, textStyle: { fontSize, fontFamily: "Helvetica", color: "#707070" } };
        const dialogBox = new DialogBox(this, dialogBoxConfig);
        const timelinePlayer = new TimelinePlayer(this, dialogBox, width, height);
        timelinePlayer.start(this.timelineID, this.timelineIndex, this.backgroundKey, this.locationName);

        const exportIcon = this.add.image(width - 100, 100, "qr").setInteractive({
            useHandCursor: true,
        });

        const qrCode = new QRCodeStyling({
            width: height / 4,
            height: height / 4,
            data: JSON.stringify({
                timelineID: this.timelineID,
                timelineIndex: this.timelineIndex,
            }),
            dotsOptions: {
                color: "#4267b2",
                type: "classy-rounded",
            },
            backgroundOptions: {
                color: "#ffff0000",
            },
            cornersSquareOptions: {
                type: "extra-rounded",
            },
        });
        const qrElement = document.getElementById("qr")!;
        qrCode.append(qrElement);

        exportIcon.on("pointerdown", () => {
            qrCode.update({ data: `${window.location.href}?timelineID=${timelinePlayer.getTimelineID()}&timelineIndex=${timelinePlayer.getTimelineIndex() - 1}` });
            console.log(`${window.location.href}?timelineID=${timelinePlayer.getTimelineID()}&timelineIndex=${timelinePlayer.getTimelineIndex() - 1}`);
            exportIcon.setInteractive(false);
            timelinePlayer.setCanNext(false);
            const qrModalElement = document.getElementById("qr-modal-background")!;
            qrModalElement.classList.add("visible");
            qrElement.classList.add("visible");
            qrModalElement.addEventListener("click", () => {
                qrModalElement.classList.remove("visible");
                qrElement.classList.remove("visible");
                timelinePlayer.setCanNext(true);
                exportIcon.setInteractive(true);
            });
        });

        // const choiceBoxConfig: ChoiceBoxConfig = {
        //     canvasWidth: width,
        //     canvasHeight: height,
        // };
        // this.add.rectangle(0, 0, width, height).setOrigin(0, 0).setStrokeStyle(20, 0xff0000);
    }
}
