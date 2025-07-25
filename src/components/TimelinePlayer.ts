import RoundRectangle from "phaser3-rex-plugins/plugins/gameobjects/shape/roundrectangle/RoundRectangle";
import { Choice } from "../type/Choice";
import { Timeline } from "../type/Timeline";
import { DialogBox } from "./DialogBox";
import { timelineData } from "../data/timeline";
import { Util } from "../Util";

export class TimelinePlayer {
    private timelineID: string;
    private timeline: Timeline;
    private timelineIndex: number = 0;
    private hitArea: Phaser.GameObjects.Zone;
    private uiLayer: Phaser.GameObjects.Container;
    private backgroundKey?: string;
    private locationName?: string;
    private canNext: boolean = true;
    private bgm: Phaser.Sound.WebAudioSound;
    private bgmKey?: string;

    constructor(private scene: Phaser.Scene, private dialogBox: DialogBox, private canvasWidth: number, private canvasHeight: number) {
        // console.log(this.timelineIndex);
        // this.timelineIndex = 0;
        scene.add.existing(dialogBox);
        this.uiLayer = this.scene.add.container(0, 0);

        const polygon = new Phaser.Geom.Polygon([0, 0, 400, 0, 350, 70, 0, 70]);
        const graphics = new Phaser.GameObjects.Graphics(scene, { x: 0, y: 50 });
        graphics.fillStyle(0xffffff);
        graphics.fillPoints(polygon.points, true);
        this.dialogBox.addAt(graphics, 0);

        this.hitArea = this.scene.add.zone(0, 10, canvasWidth, canvasHeight).setOrigin(0, 0);
        this.hitArea.setInteractive({
            useHandCursor: true,
        });
        this.hitArea.on("pointerdown", () => {
            if (!this.canNext) {
                return;
            }
            if (this.dialogBox.isAnimating()) {
                this.dialogBox.forceStop();
            } else {
                this.next();
            }
        });
        this.scene.input.keyboard!.on("keydown", (event: KeyboardEvent) => {
            // console.log(event.key);
            if (!this.canNext) {
                return;
            }
            if (event.key !== "Enter" && event.key !== " " && event.key !== "ArrowRight") {
                return;
            }
            if (this.dialogBox.isAnimating()) {
                this.dialogBox.forceStop();
            } else {
                this.next();
            }
        });

        // window.addEventListener("resize", () => {
        //     console.log(window.innerWidth, window.innerHeight);
        //     this.resize(scene.game.canvas.width, scene.game.canvas.height);
        // });
    }

    start(timelineID: string, index: number = 0) {
        this.timelineID = timelineID;
        this.timeline = timelineData[timelineID];

        for (let i = 0; i < index; i++) {
            this.next(false);
        }

        // if (bgmKey) {
        //     this.bgmKey = bgmKey;
        //     this.bgm = this.scene.game.sound.add(bgmKey);
        //     this.bgm.play();
        // }

        this.next();
    }

    resize(canvasWidth: number, canvasHeight: number) {
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.dialogBox.resize(canvasWidth, canvasHeight);
    }

    setCanNext(canNext: boolean) {
        // console.log(canNext);
        this.canNext = canNext;
    }

    private next(next: boolean = true) {
        if (!this.timeline || this.timelineIndex >= this.timeline.length) {
            return;
        }

        localStorage.setItem("timeline", this.timelineID);
        localStorage.setItem("timelineIndex", this.timelineIndex.toString());
        window.history.pushState("", "", "/");
        const timelineEvent = this.timeline[this.timelineIndex++];
        switch (timelineEvent.type) {
            case "playSound":
                this.bgmKey = timelineEvent.key;
                if (timelineEvent.loop) {
                    if (this.bgm) {
                        this.scene.tweens.add({
                            targets: this.bgm,
                            volume: 0,
                            duration: 2000,
                        });
                    }
                    this.bgm = this.scene.sound.add(timelineEvent.key, { loop: timelineEvent.loop }) as Phaser.Sound.WebAudioSound;
                    this.scene.time.delayedCall(2200, () => {
                        this.bgm.play();
                    });
                    this.bgm.setVolume(0);
                    this.scene.tweens.add({
                        targets: this.bgm,
                        volume: 1,
                        duration: 2000,
                    });
                } else {
                    if (next) this.scene.game.sound.play(timelineEvent.key);
                }
                if (next) this.next();
                break;
            case "setBackground":
                this.dialogBox.setBackgroundImage(timelineEvent.key);
                this.backgroundKey = timelineEvent.key;
                if (next) this.next();
                break;
            case "setLocation":
                this.dialogBox.setLocation(timelineEvent.name);
                this.locationName = timelineEvent.name;
                if (next) this.next();
                break;
            case "dialog":
                const wrappedLine = Util.autoWrap(timelineEvent.text, this.canvasWidth - this.dialogBox.getPadding() * 3 - 600, this.scene, this.dialogBox.getTextStyle());
                this.dialogBox.setText(wrappedLine);
                this.dialogBox.setSpeakerName(timelineEvent.speakerName);
                if (timelineEvent.image) {
                    if (timelineEvent.image == "None") {
                        this.dialogBox.setCharacterImage("");
                    } else {
                        // console.log(`${timelineEvent.speakerName}-${timelineEvent.image}`);
                        this.dialogBox.setCharacterImage(`${timelineEvent.speakerName}-${timelineEvent.image}`);
                    }
                }
                break;
            case "timelineTransition":
                this.changegTimeline(timelineEvent.timelineID, timelineEvent.fadeTime);
                break;
            case "sceneTransition":
                if (timelineEvent.fadeTime) {
                    this.scene.time.delayedCall(2200 - timelineEvent.fadeTime / 2, () => {
                        this.scene.cameras.main.fadeOut(timelineEvent.fadeTime! / 2, 0, 0, 0);
                        this.scene.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
                            this.scene.scene.start(timelineEvent.name, {
                                ...timelineEvent.data,
                                fadeTime: timelineEvent.fadeTime! / 2,
                            });
                            // console.log("destory");
                            this.bgm.destroy();
                        });
                    });
                    this.scene.tweens.add({
                        targets: this.bgm,
                        volume: 0,
                        duration: 2000,
                    });
                } else {
                    this.scene.scene.start(timelineEvent.name, timelineEvent.data);
                }
                break;
            case "choice":
                this.setChoiceButtons(timelineEvent.choices);
                break;
            default:
                console.error("unknown timeline event type: " + timelineEvent);
        }
    }
    private setChoiceButtons(choices: Choice[]) {
        if (choices.length === 0) {
            return;
        }

        this.hitArea.disableInteractive();
        this.canNext = false;
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
            // button.preFX!.addShadow(0, 3, 0.006, 2, 0x000000, 10);
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
                this.changegTimeline(choice.timelineID, choice.fadeTime);
            });

            this.uiLayer.add(button);

            const buttonText = new Phaser.GameObjects.Text(this.scene, width / 2, y, choice.text, { fontSize: "32px", fontFamily: "Noto Sans  JP", color: "#707070" }).setOrigin(0.5);
            this.uiLayer.add(buttonText);
        });
    }

    private changegTimeline(timelineID: string, fadeTime?: number) {
        const data = {
            timelineID: timelineID,
        };
        localStorage.setItem("timeline", timelineID);
        localStorage.setItem("timelineIndex", "0");
        if (fadeTime) {
            this.scene.time.delayedCall(2200 - fadeTime / 2, () => {
                this.scene.cameras.main.fadeOut(fadeTime / 2, 0, 0, 0);
                this.scene.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
                    this.scene.scene.restart({
                        ...data,
                        fadeTime: fadeTime / 2,
                    });
                });
            });
        } else {
            this.scene.scene.restart({
                ...data,
            });
        }
        this.scene.tweens.add({
            targets: this.bgm,
            volume: 0,
            duration: 2000,
        });
        // this.scene.game.sound.stopAll();
    }

    getTimelineID() {
        return this.timelineID;
    }

    getTimelineIndex() {
        return this.timelineIndex;
    }

    getBackgroundKey() {
        return this.backgroundKey;
    }

    getLocationName() {
        return this.locationName;
    }

    getBgmKey() {
        return this.bgmKey;
    }
}
