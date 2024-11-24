// import { ChoiceBoxConfig } from "../components/ChoiceBox";
import { ModalBehavoir } from "phaser3-rex-plugins/plugins/modal.js";
import { DialogBox, DialogBoxConfig } from "../components/DialogBox";
import { TimelinePlayer } from "../components/TimelinePlayer";
import { timelineData } from "../data/timeline";
import { Timeline } from "../type/Timeline";
import QRCodeStyling from "qr-code-styling";
import { TIMELINE_ID, TIMELINE_INDEX } from "../constants";

export class MainScene extends Phaser.Scene {
    private timelineID: string;
    private timelineIndex: number;

    constructor() {
        super("main");
    }

    init(data: any) {
        const params = new URLSearchParams(window.location.search);
        // console.log(params.get(TIMELINE_ID), params.get(TIMELINE_INDEX));
        this.timelineID = params.get(TIMELINE_ID) || data.timelineID || localStorage.getItem("timeline") || "chapter1";
        this.timelineIndex = parseInt(params.get(TIMELINE_INDEX)!) || parseInt(localStorage.getItem("timelineIndex")!) || 0;
        if (!(this.timelineID in timelineData)) {
            console.error("invalid timelineID: " + this.timelineID);
        }

        // console.log(data, this.timelineIndex, this.timelineID);
        if (data.fadeTime) {
            this.cameras.main.fadeIn(data.fadeTime, 0, 0, 0);
        }
    }

    create() {
        if (!this.timelineID) {
            return;
        }
        // this.sound.play("bgm");
        const { width, height } = this.game.canvas;
        let fontSize: string = "32px";
        let padding: number = 50;
        if (window.innerWidth < 1000) {
            fontSize = "36px";
            padding = 20;
        } else if (window.innerWidth < 1200) {
            fontSize = "34px";
            padding = 30;
        }
        // console.log(fontSize, width < 1000, width);
        const dialogBoxConfig: DialogBoxConfig = { canvasWidth: width, canvasHeight: height, padding, textStyle: { fontSize, fontFamily: "Noto Sans  JP", color: "#707070" } };
        const dialogBox = new DialogBox(this, dialogBoxConfig);
        const timelinePlayer = new TimelinePlayer(this, dialogBox, width, height);
        timelinePlayer.start(this.timelineID, this.timelineIndex);

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
            let url = `${window.location.href}?${TIMELINE_ID}=${timelinePlayer.getTimelineID()}&${TIMELINE_INDEX}=${timelinePlayer.getTimelineIndex() - 1}`;
            url = encodeURI(url);
            qrCode.update({ data: url });
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

        const resetButton = this.add.rectangle(width, height, 200, 100, 0x000000).setAlpha(0.2).setOrigin(1, 1);
        this.add.text(width - 100, height - 50, "最初から", { fontSize, fontFamily: "Noto Sans  JP", color: "#ffffff" }).setOrigin(0.5, 0.5);
        resetButton.setInteractive();
        resetButton.on("pointerdown", () => {
            localStorage.removeItem("timeline");
            localStorage.removeItem("timelineIndex");
        });
        this.add.existing(resetButton);
    }
}
