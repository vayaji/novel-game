import * as Phaser from "phaser";
import { Scenes } from "./scenes";
import RoundRectanglePlugin from "phaser3-rex-plugins/plugins/roundrectangle-plugin.js";
import WebFontLoaderPlugin from "phaser3-rex-plugins/plugins/webfontloader-plugin.js";

const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.WEBGL,
    backgroundColor: "#FFFFFF",
    scale: {
        parent: "game-container",
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1920,
        height: 1080,
        // width: "100%",
        // height: "100%",
    },
    scene: Scenes,
    plugins: {
        global: [
            {
                key: "rexRoundRectanglePlugin",
                plugin: RoundRectanglePlugin,
                start: true,
            },
            {
                key: "rexWebFontLoader",
                plugin: WebFontLoaderPlugin,
                start: true,
            },
        ],
    },
};

new Phaser.Game(config);
