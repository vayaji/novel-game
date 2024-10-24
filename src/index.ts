import * as Phaser from "phaser";
import { Scenes } from "./scenes";
import RoundRectanglePlugin from "phaser3-rex-plugins/plugins/roundrectangle-plugin.js";

const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    parent: "game-container",
    width: 1920,
    height: 1080,
    backgroundColor: "#D6D6D6",
    scale: {
        mode: Phaser.Scale.RESIZE,
        width: "100%",
        height: "100%",
    },
    scene: Scenes,
    plugins: {
        global: [
            {
                key: "rexRoundRectanglePlugin",
                plugin: RoundRectanglePlugin,
                start: true,
            },
        ],
    },
};

new Phaser.Game(config);
