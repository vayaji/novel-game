export type DialogboxConfig = {
    canvasWidth: number;
    canvasHeight: number;
    textStyle?: Phaser.Types.GameObjects.Text.TextStyle;
};

export class Dialogbox extends Phaser.GameObjects.Container {
    private textBoxObject: Phaser.GameObjects.Rectangle;

    private textObject: Phaser.GameObjects.Text;
    private text: string = "";
    private textStyle: Phaser.Types.GameObjects.Text.TextStyle;

    private animateCount: number = 0;
    private animateTimer: Phaser.Time.TimerEvent = null!;
    private _isAnimating: boolean = false;

    // private nameBoxObject: Phaser.GameObjects.Polygon;
    private locationTextObject: Phaser.GameObjects.Text;

    private padding: number = 50;
    private canvasWidth: number;
    private canvasHeight: number;

    private characterImage: Phaser.GameObjects.Image;

    constructor(scene: Phaser.Scene, { canvasWidth, canvasHeight, textStyle = { fontSize: "32px", fontFamily: "Helvetica", color: "#707070" } }: DialogboxConfig) {
        super(scene, 0, 0);

        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.textStyle = textStyle;
        this.scene.add.image;

        const height = canvasHeight / 2.5;
        const width = canvasWidth;
        const y = canvasHeight - height;

        this.setSize(width, height);
        console.log(width, height);

        this.characterImage = this.scene.add.image(0, 0, "").setOrigin(0, 0);
        this.characterImage.setVisible(false);
        this.characterImage.setDepth(-1);
        this.add(this.characterImage);
        const polygon = new Phaser.Geom.Polygon([0, 0, 400, 0, 350, 70, 0, 70]);

        const graphics = this.scene.add.graphics({ x: 0, y: this.padding });
        graphics.setDepth(1);

        graphics.fillStyle(0xffffff);
        graphics.fillPoints(polygon.points, true);

        this.locationTextObject = new Phaser.GameObjects.Text(this.scene, 175, this.padding + 70 / 2, "", this.textStyle).setOrigin(0.5, 0.5);
        this.add(this.locationTextObject);

        this.textBoxObject = new Phaser.GameObjects.Rectangle(this.scene, 0, y, width, height, 0xffffff).setOrigin(0, 0);
        this.add(this.textBoxObject);

        this.textObject = new Phaser.GameObjects.Text(this.scene, this.padding, y + this.padding, "", this.textStyle).setOrigin(0, 0);
        this.add(this.textObject);
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
        console.log(imageKey);
        this.characterImage.setTexture(imageKey);
        this.characterImage.setVisible(true);
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
        }
    }

    setSpeakerName(speakerName: string) {
        this;
    }
}
