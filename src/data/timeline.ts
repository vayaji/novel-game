import { Timelines } from "../type/Timelines";

export const timelineData: Timelines = {
    chapter1: [
        { type: "setBackground", key: "home" },
        { type: "dialog", speakerName: "ナレーション", text: "電話の呼び出し音が鳴る" },
        { type: "dialog", speakerName: "遥斗", image: "普通の顔", text: "もしもし、遥斗です。" },
        { type: "dialog", speakerName: "母親", text: "遥斗、おじいちゃんが…亡くなったの。" },
        { type: "dialog", speakerName: "遥斗", image: "悲しそうな顔", text: "…え？ そんな…" },
        {
            type: "choice",
            text: "…",
            choices: [
                { text: "いつ亡くなったの？", timelineID: "chapter1_1" },
                { text: "どうして？", timelineID: "chapter1_2" },
                { text: "……分かった、帰るよ。", timelineID: "chapter1_3" },
            ],
        },
    ],
    chapter1_1: [
        { type: "dialog", speakerName: "母親", text: "昨日の夜、急に具合が悪くなって、病院に運ばれたんだけど…結局、助からなかったの。" },
        { type: "dialog", speakerName: "遥斗", image: "普通の顔", text: "…そうか…。おじいちゃん、ずっと元気だったのに。" },
        { type: "dialog", speakerName: "母親", text: "そうね、突然で驚いてる。でも、もう苦しんでいないから…。" },
        { type: "dialog", speakerName: "遥斗", image: "普通の顔", text: "分かった。すぐに帰るよ。" },
        { type: "sceneTransition", key: "chapter1_3" },
    ],
    chapter1_2: [
        { type: "dialog", speakerName: "母親", text: "どうしてって、急に体調が悪くなって…おじいちゃんの年齢もあって、すぐには治療が間に合わなかったの。" },
        { type: "dialog", speakerName: "遥斗", image: "普通の顔", text: "そう…、おじいちゃんが急にって、信じられない。" },
        { type: "dialog", speakerName: "母親", text: "私もまだ信じられないけど、受け入れるしかないわね。" },
        { type: "dialog", speakerName: "遥斗", image: "普通の顔", text: "分かった…。すぐに帰る。" },
        { type: "sceneTransition", key: "chapter1_3" },
    ],
    chapter1_3: [
        { type: "dialog", speakerName: "母親", text: "ありがとう。おじいちゃんも、きっと喜んでいるわ。" },
        { type: "dialog", speakerName: "遥斗", image: "普通の顔", text: "すぐに準備する。すぐに帰るから。" },
        { type: "dialog", speakerName: "母親", text: "急いでね。後で連絡するわ。" },
        { type: "dialog", speakerName: "遥斗", image: "普通の顔", text: "うん、すぐに着くから。" },
    ],
};
