import WebFontLoader from "phaser3-rex-plugins/plugins/webfontloader";

export class PreloaderScene extends Phaser.Scene {
    constructor() {
        super("preloader");
    }

    preload() {
        this.load.setPath("assets/");
        const { width, height } = this.cameras.main;
        // this.add.text(100, 100, "preloader");
        // this.add.sprite(0, 0, "background").setOrigin(0, 0);
        // const progressBox = this.add.graphics();
        const progressBar = this.add.graphics();
        // progressBox.fillStyle(0x222222, 0.8);
        // progressBox.fillRect(width / 2 - 160, height / 2 + 20, 320, 20);

        const loadingText = this.make.text({
            x: width / 2,
            y: height / 2 - 50,
            text: "Loading...",
            style: {
                font: "20px 'Avenir-Next-Condensed-UltraLightItalic'",
                color: "#69A8D3",
            },
        });
        loadingText.setOrigin(0.5, 0.5);

        const percentText = this.make.text({
            x: width / 2,
            y: height / 2 - 5,
            text: "0%",
            style: {
                font: "18px 'Avenir-Next-Condensed-UltraLightItalic'",
                color: "#69A8D3",
            },
        });
        percentText.setOrigin(0.5, 0.5);

        // var assetText = this.make.text({
        //     x: width / 2,
        //     y: height / 2 + 50,
        //     text: "",
        //     style: {
        //         font: "18px 'Avenir-Next-Condensed-UltraLightItalic'",
        //         color: "#69A8D3",
        //     },
        // });
        // assetText.setOrigin(0.5, 0.5);

        this.load.on("progress", function (value: number) {
            percentText.setText(Math.floor(value * 100) + "%");
            progressBar.clear();
            progressBar.fillStyle(0x69a8d3, 1);
            progressBar.fillRect(width / 2 - 158, height / 2 + 22, 158 * 2 * value, 16);
        });

        this.load.on("fileprogress", function (file: Phaser.Loader.File) {
            // assetText.setText("Loading asset: " + file.key);
        });
        this.load.on("complete", function () {
            progressBar.destroy();
            // progressBox.destroy();
            loadingText.destroy();
            percentText.destroy();
            // assetText.destroy();
        });

        const resources = {
            image: [
                /* タイトル */
                {
                    key: "title",
                    url: "title.png",
                },
                {
                    key: "next-step",
                    url: "next-step.png",
                },
                /* 背景 */
                {
                    key: "忙しい街の風景",
                    url: "background/忙しい街の風景.png",
                },
                {
                    key: "オフィス",
                    url: "background/会社のオフィス（日中）.jpg",
                },
                {
                    key: "スマートフォン",
                    url: "background/apple-1867461_1920.jpg",
                },
                {
                    key: "田舎の風景",
                    url: "background/田舎の駅前（日中）.jpg",
                },
                {
                    key: "祖父の家",
                    url: "background/和風の家の玄関ホール（照明ON）.jpg",
                },
                {
                    key: "机と引き出し",
                    url: "background/desk-3223810_1920.jpg",
                },
                {
                    key: "手紙",
                    url: "background/手紙背景.png",
                },
                {
                    key: "black",
                    url: "background/black.jpg",
                },
                {
                    key: "霞ヶ丘の古びた図書館",
                    url: "background/26750062_l.jpg",
                },
                {
                    key: "霞ヶ丘の廃れた建造物(外)",
                    url: "background/31212425_l.jpg",
                },
                {
                    key: "霞ヶ丘の廃れた建造物(内部)",
                    url: "background/廃墟ビルの部屋（明）.jpg",
                },
                {
                    key: "本",
                    url: "background/本背景.png",
                },
                {
                    key: "wip",
                    url: "background/wip.png",
                },
                /* キャラクター */
                {
                    key: "遥斗-疲れる",
                    url: "character/haruto/疲れる顔.png",
                },
                {
                    key: "遥斗-懐かしい",
                    url: "character/haruto/普通.png",
                },
                {
                    key: "遥斗-普通",
                    url: "character/haruto/普通.png",
                },
                {
                    key: "遥斗-疑問",
                    url: "character/haruto/疑問の顔、目あけ、口あけて.png",
                },
                {
                    key: "遥斗-驚き",
                    url: "character/haruto/疑問の顔、目あけ、口あけて.png",
                },
            ],
            svg: [
                {
                    key: "qr",
                    url: "qr.svg",
                    width: 128,
                    height: 128,
                },
            ],
            audio: [
                {
                    key: "街の環境音.ubn_intersection2",
                    url: "bgm/ubn_intersection2.mp3",
                },
                {
                    key: "フリー環境音素材.メール・メッセージ受信音",
                    url: "sound/メール・メッセージ受信音.mp3",
                },
                {
                    key: "フリーbgm素材.もう終わりにしよう",
                    url: "bgm/もう終わりにしよう.mp3",
                },
                {
                    key: "フリーbgm素材.田舎の夏休み",
                    url: "bgm/田舎の夏休み.mp3",
                },
                {
                    key: "フリーbgm.ひらひらり",
                    url: "bgm/ひらひらり.mp3",
                },
                {
                    key: "フリーbgm.ゆりかご",
                    url: "bgm/ゆりかご.mp3",
                },
                // {
                //     key: "コウノネ.siryou",
                //     url: "sound/siryou.mp3",
                // },
                {
                    key: "フリー効果音素材.紙のページをめくる音",
                    url: "sound/紙のページをめくる音.mp3",
                },
                {
                    key: "フリーbgm素材.フォークロア",
                    url: "bgm/フォークロア.mp3",
                },
                {
                    key: "フリーbgm.The Window Overlooking All Things",
                    url: "bgm/The_Window_Overlooking_All_Things.mp3",
                },
                {
                    key: "フリーbgm.木漏れ日",
                    url: "bgm/木漏れ日.mp3",
                },
                {
                    key: "フリーbgm素材.ながれぼし",
                    url: "bgm/ながれぼし.mp3",
                },
                {
                    key: "効果音ラボ.土の上を歩く",
                    url: "sound/土の上を歩く.mp3",
                },
                {
                    key: "フリーbgm素材.ある冬の寒い夜に",
                    url: "bgm/ある冬の寒い夜に.mp3",
                },
            ],
        };

        for (const resource of resources.image) {
            this.load.image(resource.key, resource.url);
        }

        for (const resource of resources.svg) {
            this.load.svg(resource.key, resource.url, {
                width: resource.width,
                height: resource.height,
            });
        }

        for (const resource of resources.audio) {
            this.load.audio(resource.key, resource.url);
        }

        WebFontLoader.call(this.load, {
            google: {
                families: ["Avenir-Next-Condensed-UltraLightItalic"],
            },
        });
    }

    create() {
        this.scene.start("title");
    }
}
