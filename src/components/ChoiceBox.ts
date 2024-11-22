import { Choice } from "../type/Choice";

export type ChoiceBoxConfig = {
    canvasWidth: number;
    canvasHeight: number;
    textStyle?: Phaser.Types.GameObjects.Text.TextStyle;
};

export class ChoiceBox extends Phaser.GameObjects.Container {
    constructor(scene: Phaser.Scene, { canvasWidth, canvasHeight, textStyle = { fontSize: "32px", fontFamily: "Noto Sans  JP", color: "#707070" } }: ChoiceBoxConfig) {
        super(scene, 0, 0);
        this.add(new Phaser.GameObjects.Text(scene, canvasWidth / 2, canvasHeight / 2 - 100, "", textStyle).setOrigin(0.5, 0.5));
    }
}
