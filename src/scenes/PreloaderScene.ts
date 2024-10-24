export class PreloaderScene extends Phaser.Scene {
    constructor() {
        super("preloader");
    }

    preload() {
        this.add.text(100, 100, "preloader");
        this.add.sprite(0, 0, "background").setOrigin(0, 0);
        const progressBar = this.add.graphics();
        const progressBox = this.add.graphics();
        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect(240, 270, 320, 50);

        const { width } = this.cameras.main;
        const { height } = this.cameras.main;
        const loadingText = this.make.text({
            x: width / 2,
            y: height / 2 - 50,
            text: "Loading...",
            style: {
                font: "20px monospace",
                color: "#ffffff",
            },
        });
        loadingText.setOrigin(0.5, 0.5);

        const percentText = this.make.text({
            x: width / 2,
            y: height / 2 - 5,
            text: "0%",
            style: {
                font: "18px monospace",
                color: "#ffffff",
            },
        });
        percentText.setOrigin(0.5, 0.5);

        var assetText = this.make.text({
            x: width / 2,
            y: height / 2 + 50,
            text: "",
            style: {
                font: "18px monospace",
                color: "#ffffff",
            },
        });
        assetText.setOrigin(0.5, 0.5);

        this.load.plugin("rexroundrectangleplugin", "https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexroundrectangleplugin.min.js", true);

        this.load.on("progress", function (value: number) {
            percentText.setText(value * 100 + "%");
            progressBar.clear();
            progressBar.fillStyle(0xffffff, 1);
            progressBar.fillRect(250, 280, 300 * value, 30);
        });

        this.load.on("fileprogress", function (file: Phaser.Loader.File) {
            assetText.setText("Loading asset: " + file.key);
        });
        this.load.on("complete", function () {
            progressBar.destroy();
            progressBox.destroy();
            loadingText.destroy();
            percentText.destroy();
            assetText.destroy();
        });

        const resources = {
            image: [
                {
                    key: "logo",
                    url: "src/assets/logo.png",
                },
                {
                    key: "robot",
                    url: "src/assets/robot.png",
                },
                {
                    key: "street",
                    url: "src/assets/street.png",
                },
                {
                    key: "home",
                    url: "src/assets/background/home.png",
                },
                {
                    key: "haruto-normal",
                    url: "src/assets/character/haruto/normal.png",
                },
            ],
        };

        for (const resource of resources.image) {
            this.load.image(resource.key, resource.url);
        }
    }

    create() {
        this.scene.start("title");
    }
}
