import { loadDefaultJapaneseParser } from "budoux";

export class Util {
    static autoWrap(text: string, width: number, scene: Phaser.Scene, textStyle = { fontSize: "32px", fontFamily: "Helvetica", color: "#707070" }) {
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
        console.log(wrappedLines.join("\n"));
        return wrappedLines.join("\n");
    }
}
