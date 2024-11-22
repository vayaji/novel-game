export type DialogBoxConfig = {
    canvasWidth: number;
    canvasHeight: number;
    textStyle?: Phaser.Types.GameObjects.Text.TextStyle;
};

export class DialogBox extends Phaser.GameObjects.Container {
    private textBoxObject: Phaser.GameObjects.Rectangle;

    private textObject: Phaser.GameObjects.Text;
    private text: string = "";
    private textStyle: Phaser.Types.GameObjects.Text.TextStyle;

    private animateCount: number = 0;
    private animateTimer: Phaser.Time.TimerEvent = null!;
    private _isAnimating: boolean = false;

    private speakerTextObject: Phaser.GameObjects.Text;
    private locationTextObject: Phaser.GameObjects.Text;

    private padding: number = 50;
    private canvasWidth: number;
    private canvasHeight: number;

    private characterImage: Phaser.GameObjects.Image;
    private characterTexture?: string;

    private backgroundImage: Phaser.GameObjects.Image;
    private backgroundTexture?: string;

    constructor(scene: Phaser.Scene, { canvasWidth, canvasHeight, textStyle = { fontSize: "32px", fontFamily: "Noto Sans  JP", color: "#707070" } }: DialogBoxConfig) {
        super(scene, 0, 0);

        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.textStyle = textStyle;

        this.backgroundImage = this.scene.add.image(0, 0, "").setOrigin(0, 0.2).setScale(1.0);
        this.backgroundImage.setVisible(false);

        const height = canvasHeight / 2.5;
        const width = canvasWidth;
        const y = canvasHeight - height;

        this.setSize(width, height);
        // console.log(width, height);

        this.locationTextObject = new Phaser.GameObjects.Text(this.scene, 175, this.padding + 70 / 2, "", this.textStyle).setOrigin(0.5, 0.5);
        this.add(this.locationTextObject);

        this.textBoxObject = new Phaser.GameObjects.Rectangle(this.scene, 0, y, width, height, 0xffffff).setOrigin(0, 0);
        this.add(this.textBoxObject);

        this.textStyle.wordWrap = {
            width: this.canvasWidth - this.padding * 6,
            useAdvancedWrap: true,
        };
        this.textObject = new Phaser.GameObjects.Text(this.scene, this.padding * 3, y + this.padding + 70, "", this.textStyle).setOrigin(0, 0);
        this.add(this.textObject);

        this.speakerTextObject = new Phaser.GameObjects.Text(this.scene, this.padding * 2, y + this.padding, "", this.textStyle).setOrigin(0, 0);
        this.add(this.speakerTextObject);

        this.characterImage = this.scene.add.image(this.canvasWidth, 0, "").setOrigin(0, 0).setScale(3.0);
        this.characterImage.setVisible(false);
        this.characterImage.setDepth(10);
        this.add(this.characterImage);
    }

    resize(canvasWidth: number, canvasHeight: number) {
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.setSize(canvasWidth, canvasHeight);

        const height = this.canvasHeight / 2.5;
        const width = this.canvasWidth;
        const y = this.canvasHeight - height;

        this.locationTextObject.setPosition(175, this.padding + 70 / 2);
        this.textBoxObject.setPosition(0, y);
        this.textObject.setPosition(this.padding * 3, y + this.padding + 70);
        this.speakerTextObject.setPosition(this.padding * 2, y + this.padding);
        this.characterImage.setPosition(this.canvasWidth, 0);
    }

    getTextStyle(): Phaser.Types.GameObjects.Text.TextStyle {
        return this.textStyle;
    }

    getZone(): Phaser.GameObjects.Zone {
        return new Phaser.GameObjects.Zone(this.scene, 0, this.canvasHeight - this.height, this.width, this.height).setOrigin(0, 0);
    }

    setLocation(location: string) {
        this.locationTextObject.setText(location);
    }

    setText(text: string) {
        this.text = text;
        this.animateCount = 0;
        this._isAnimating = true;
        this.animateTimer = this.scene.time.addEvent({
            delay: 20,
            callback: this.animateText,
            callbackScope: this,
            loop: true,
        });
    }

    setCharacterImage(imageKey: string) {
        if (this.characterTexture === imageKey) {
            return;
        }
        this.characterImage.setTexture(imageKey);
        this.characterImage.setVisible(true);
        this.scene.tweens.add({
            targets: this.characterImage,
            x: this.canvasWidth - 1200,
            duration: 500,
            ease: Phaser.Math.Easing.Sine.InOut,
        });
        this.characterTexture = imageKey;
    }

    setBackgroundImage(imageKey: string) {
        if (this.backgroundTexture === imageKey) {
            return;
        }
        this.backgroundImage.setTexture(imageKey);
        this.backgroundImage.setVisible(true);
        this.backgroundTexture = imageKey;
    }

    isAnimating() {
        return this._isAnimating;
    }

    forceStop() {
        this.animateTimer.remove();
        this._isAnimating = false;
        this.textObject.setText(this.text);
    }

    private animateText() {
        this.animateCount++;
        this.textObject.setText(this.text.substring(0, this.animateCount));
        if (this.animateCount >= this.text.length) {
            this.animateTimer.remove();
            this._isAnimating = false;
        }
    }

    setSpeakerName(speakerName: string) {
        this.speakerTextObject.setText(speakerName);
    }
}
