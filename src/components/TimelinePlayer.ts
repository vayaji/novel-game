import RoundRectangle from "phaser3-rex-plugins/plugins/gameobjects/shape/roundrectangle/RoundRectangle";
import { Choice } from "../type/Choice";
import { Timeline } from "../type/Timeline";
import { DialogBox } from "./DialogBox";

export class TimelinePlayer {
    private timeline: Timeline;
    private timelineIndex: number = 0;
    private hitArea: Phaser.GameObjects.Zone;
    private uiLayer: Phaser.GameObjects.Container;

    constructor(private scene: Phaser.Scene, private dialogBox: DialogBox, private canvasWidth: number, private canvasHeight: number) {
        scene.add.existing(dialogBox);
        this.uiLayer = this.scene.add.container(0, 0);
        this.dialogBox.setText("セリフ、ダミーテキストダミーテキスト。\nダミーテキストダミーテキスト。");
        this.dialogBox.setLocation("場所");
        this.dialogBox.setSpeakerName("遥斗");

        const polygon = new Phaser.Geom.Polygon([0, 0, 400, 0, 350, 70, 0, 70]);
        // const graphics = this.add.graphics({ x: 0, y: 50 });
        const graphics = new Phaser.GameObjects.Graphics(scene, { x: 0, y: 50 });
        graphics.fillStyle(0xffffff);
        graphics.fillPoints(polygon.points, true);
        this.dialogBox.addAt(graphics, 0);

        this.hitArea = this.dialogBox.getZone();
        this.hitArea.setInteractive({
            useHandCursor: true,
        });
        this.hitArea.on("pointerdown", () => {
            if (this.dialogBox.isAnimating()) {
                this.dialogBox.forceStop();
            } else {
                this.next();
            }
        });
    }

    start(timeline: Timeline) {
        this.timeline = timeline;
        this.next();
    }

    private next() {
        if (!this.timeline || this.timelineIndex >= this.timeline.length) {
            return;
        }

        const timelineEvent = this.timeline[this.timelineIndex++];

        switch (timelineEvent.type) {
            case "setBackground":
                this.dialogBox.setBackgroundImage(timelineEvent.key);
                this.next();
                break;
            case "dialog":
                this.dialogBox.setText(timelineEvent.text);
                this.dialogBox.setSpeakerName(timelineEvent.speakerName);
                if (timelineEvent.image) {
                    this.dialogBox.setCharacterImage(timelineEvent.image);
                }
                break;
            case "timelineTransition":
                this.scene.scene.restart({
                    timelineID: timelineEvent.timelineID,
                });
                break;
            case "choice":
                this.setChoiceButtons(timelineEvent.choices);
                break;
        }
    }
    private setChoiceButtons(choices: Choice[]) {
        if (choices.length === 0) {
            return;
        }

        this.hitArea.disableInteractive();
        this.uiLayer.add(new Phaser.GameObjects.Rectangle(this.scene, 0, 0, this.canvasWidth, this.canvasHeight, 0x575757).setOrigin(0, 0).setAlpha(0.72));

        const buttonHeight = 120;
        const buttonMargin = 70;

        const { width, height } = this.scene.game.canvas;

        const buttonGroupHeight = buttonHeight * choices.length + buttonMargin * (choices.length - 1);
        const buttonGroupOriginY = height / 2 - buttonGroupHeight / 2;

        choices.forEach((choice, index) => {
            const y = buttonGroupOriginY + buttonHeight * index + buttonMargin * index;

            const button = new RoundRectangle(this.scene, width / 2, y, width - buttonMargin * 5, buttonHeight, 25, 0xffffff).setAlpha(0.83);
            // const button = new Phaser.GameObjects.Rectangle(this.scene, width / 2, y, width - buttonMargin * 5, buttonHeight, 0xffffff).setAlpha(0.83);
            button.preFX!.addShadow(0, 3, 0.006, 2, 0x000000, 10);
            button.setInteractive({
                useHandCursor: true,
            });

            button.on("pointerover", () => {
                button.setAlpha(1.0);
            });

            button.on("pointerout", () => {
                button.setAlpha(0.83);
            });

            button.on("pointerdown", () => {
                this.scene.scene.restart({
                    timelineID: choice.timelineID,
                });
            });

            this.uiLayer.add(button);

            const buttonText = new Phaser.GameObjects.Text(this.scene, width / 2, y, choice.text, { fontSize: "32px", fontFamily: "Helvetica", color: "#707070" }).setOrigin(0.5);
            this.uiLayer.add(buttonText);
        });
    }
}
