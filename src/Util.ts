import { loadDefaultJapaneseParser } from "budoux";

export class Util {
    static autoWrap(text: string, width: number, scene: Phaser.Scene, textStyle: Phaser.Types.GameObjects.Text.TextStyle = { fontSize: "32px", fontFamily: "Noto Sans  JP", color: "#707070" }) {
        width -= 1;
        const parser = loadDefaultJapaneseParser();
        const lines = parser.parse(text);
        const wrappedLines = [];
        let tempLine = "";
        let totalWidth = 0;
        lines.forEach((line) => {
            const textObject = new Phaser.GameObjects.Text(scene, 0, 0, line, textStyle);
            const textWidth = textObject.getBounds().width;
            if (totalWidth + textWidth > width) {
                wrappedLines.push(tempLine);
                tempLine = "";
                totalWidth = 0;
            }
            totalWidth += textWidth;
            tempLine += line;
        });
        wrappedLines.push(tempLine);
        return wrappedLines.join("\n");
    }
}
