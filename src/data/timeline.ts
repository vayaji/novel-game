import { Timelines } from "../type/Timelines";

export const timelineData: Timelines = {
    chapter1: [
        {
            type: "playSound",
            key: "街の環境音.ubn_intersection2",
            loop: true,
        },
        {
            type: "setLocation",
            name: "街",
        },
        {
            type: "setBackground",
            key: "忙しい街の風景",
        },
        {
            type: "dialog",
            speakerName: "ナレーション",
            image: "",
            text: "遥斗は、毎日忙しい日々を送る青年だった。",
        },
        {
            type: "dialog",
            speakerName: "ナレーション",
            image: "",
            text: "都会のビル群の中行き交う人々に押し流されながら、ただ目の前のタスクをこなすだけの毎日が続いていた。",
        },
        {
            type: "dialog",
            speakerName: "ナレーション",
            image: "",
            text: "仕事に追われ、目まぐるしい日常の中で、心のどこかに何かが欠けていると感じていた。",
        },
        {
            type: "dialog",
            speakerName: "遥斗",
            image: "疲れる",
            text: "こんな毎日じゃ、何か大事なものを見失っている気がするな……",
        },
        {
            type: "playSound",
            key: "フリー環境音素材.メール・メッセージ受信音",
            loop: false,
        },
        {
            type: "setLocation",
            name: "オフィス",
        },
        {
            type: "setBackground",
            key: "オフィス",
        },
        {
            type: "dialog",
            speakerName: "ナレーション",
            image: "",
            text: "仕事を終え、いつものように帰る準備をしていると、遥斗のスマートフォンがそっと震えた。",
        },
        {
            type: "playSound",
            key: "フリーbgm素材.もう終わりにしよう",
            loop: true,
        },
        {
            type: "setLocation",
            name: "スマートフォン",
        },
        {
            type: "setBackground",
            key: "スマートフォン",
        },
        {
            type: "dialog",
            speakerName: "スマートフォン",
            image: "",
            text: "件名：おじいちゃんのこと",
        },
        {
            type: "dialog",
            speakerName: "スマートフォン",
            image: "",
            text: "昨日の夜、急に具合が悪くなって、病院に運ばれたんだけど…",
        },
        {
            type: "dialog",
            speakerName: "スマートフォン",
            image: "",
            text: "おじいちゃんの意向で、最後は霞ヶ丘の実家に戻ることになって……",
        },
        {
            type: "dialog",
            speakerName: "スマートフォン",
            image: "",
            text: "そして、実家で静かに旅立ちました。少し時間が取れそうなら、一度戻ってきてくれると嬉しいです。",
        },
        {
            type: "dialog",
            speakerName: "スマートフォン",
            image: "",
            text: "おじいちゃんは、霞ヶ丘の実家で静かに旅立ちました。少し時間が取れそうなら、一度戻ってきてくれると嬉しいです。",
        },
        {
            type: "dialog",
            speakerName: "遥斗",
            image: "None",
            text: "(え……じいちゃんが……？)",
        },
        {
            type: "dialog",
            speakerName: "ナレーション",
            image: "",
            text: "霞ヶ丘の家で過ごした穏やかな日々が遠い夢のように、心の奥にしまい込んでいた大切なものが蘇り、痛みと共に思い出が蘇る。",
        },
        {
            type: "dialog",
            speakerName: "遥斗",
            image: "",
            text: "(じいちゃん……俺、もっと早く……会いに行けばよかった……。)",
        },
        {
            type: "dialog",
            speakerName: "ナレーション",
            image: "",
            text: "遥斗は驚きと悲しみの感情に押しつぶされ、祖父との時間を悔やみ、後悔と虚しさに包まれてしまった。",
        },
        {
            type: "timelineTransition",
            timelineID: "chapter1-1",
            fadeTime: 1000,
        },
    ],
    "chapter1-1": [
        {
            type: "setLocation",
            name: "",
        },
        {
            type: "setBackground",
            key: "black",
        },
        {
            type: "dialog",
            speakerName: "ナレーション",
            image: "",
            text: "数日後、遥斗は上司に連絡し、休暇を取ることを決めた。祖父の葬儀に参加するため、そして心の整理をつけるために、ふるさと・霞ヶ丘に帰る準備を始めた。都会の喧騒から離れることが、彼にとって必要なことであると感じていた。",
        },
        {
            type: "playSound",
            key: "フリーbgm素材.田舎の夏休み",
            loop: true,
        },
        {
            type: "setLocation",
            name: "霞ヶ丘",
        },
        {
            type: "setBackground",
            key: "田舎の風景",
        },
        {
            type: "dialog",
            speakerName: "ナレーション",
            image: "",
            text: "霞ヶ丘駅を降りた瞬間、涼しい風が彼を包み込み懐かしい草の香りと澄んだ空気に包まれた。",
        },
        {
            type: "dialog",
            speakerName: "遥斗",
            image: "懐かしい",
            text: "やっぱりここは落ち着くな。",
        },
        {
            type: "dialog",
            speakerName: "ナレーション",
            image: "",
            text: "遥斗の表情は、どこか懐かしさを感じさせる。彼は、幼少期を過ごした霞ヶ丘へ帰ってきたのだ。",
        },
        {
            type: "dialog",
            speakerName: "遥斗",
            image: "",
            text: "この景色、何年ぶりだろう。あの小川や広場、夏音と遊んだ場所……",
        },
        {
            type: "dialog",
            speakerName: "ナレーション",
            image: "",
            text: "遥斗の目は、遠くに見える緑の田んぼや、揺れる木々の間をすり抜ける陽の光に引き寄せられていく。思い出の光景が心に浮かび、自然と微笑んだ。",
        },
        {
            type: "dialog",
            speakerName: "ナレーション",
            image: "",
            text: "遥斗はゆっくりと駅を後にし、霞ヶ丘の道を歩き始める。足元には小さな石ころが散らばり、草花の香りが鼻をくすぐる。心の中には、祖父との思い出とともに、久しぶりの故郷の風景が広がっていた。",
        },
        {
            type: "playSound",
            key: "フリーbgm.ひらひらり",
            loop: true,
        },
        {
            type: "setLocation",
            name: "祖父の家",
        },
        {
            type: "setBackground",
            key: "祖父の家",
        },
        {
            type: "dialog",
            speakerName: "遥斗",
            image: "懐かしい",
            text: "じいちゃん、俺、帰ってきたよ。あの頃みたいに、ここでゆっくり過ごしていいかな……",
        },
        {
            type: "dialog",
            speakerName: "ナレーション",
            image: "",
            text: "遥斗は家の中に入り、少しずつ思い出を呼び起こしながら祖父の遺品を見つめた。",
        },
        {
            type: "dialog",
            speakerName: "遥斗",
            image: "普通",
            text: "こんなものもあったな…",
        },
        {
            type: "dialog",
            speakerName: "ナレーション",
            image: "",
            text: "視線が向かう先には、祖父が愛用していた古い木製の椅子や、色あせた本が並んだ本棚があった。どれも遥斗の記憶の中で温かい存在感を持っていた。",
        },
        {
            type: "dialog",
            speakerName: "遥斗",
            image: "",
            text: "これ、じいちゃんがいつも座ってた椅子だ。よく、ここで一緒に本を読んだっけ。",
        },
        {
            type: "dialog",
            speakerName: "ナレーション",
            image: "",
            text: "遥斗は椅子に手を触れ、指先に感じる木の温もりが祖父との思い出を呼び起こす。心の内で、失われた時間の一部が再び息を吹き返した。",
        },
        {
            type: "dialog",
            speakerName: "遥斗",
            image: "",
            text: "そういえば、あの本はどこに行ったんだろう。たしか、ここにあったはずだ",
        },
        {
            type: "dialog",
            speakerName: "ナレーション",
            image: "",
            text: "遥斗は、祖父の書斎に足を運んだ。そこは祖父が最も多くの時間を過ごした場所であり、古い本や手書きのメモ、工具などが無造作に置かれていた。机の上には、使い込まれた万年筆が残されており、それが祖父の手から離れたまま時が止まったように見えた。",
        },
        {
            type: "dialog",
            speakerName: "遥斗",
            image: "疑問",
            text: "この机で、じいちゃんはいつも何を書いていたんだろうな……",
        },
        {
            type: "setLocation",
            name: "机と引き出し(悩み)",
        },
        {
            type: "setBackground",
            key: "机と引き出し",
        },
        {
            type: "dialog",
            speakerName: "ナレーション",
            image: "",
            text: "引き出しを開けると、中から一通の手紙が出てきた。古びた封筒には、遥斗にとって見覚えのある名前が記されていた。",
        },
        {
            type: "dialog",
            speakerName: "遥斗",
            image: "驚き",
            text: "夏音……？",
        },
        {
            type: "dialog",
            speakerName: "ナレーション",
            image: "",
            text: "心臓が高鳴る。封を開ける手が震える。手紙の内容は短かったが、その一言一言が、胸に強く響いた。",
        },
        {
            type: "playSound",
            key: "フリーbgm.ゆりかご",
            loop: true,
        },
        {
            type: "playSound",
            key: "コウノネ.siryou",
            loop: false,
        },
        {
            type: "setLocation",
            name: "夏音からの手紙",
        },
        {
            type: "setBackground",
            key: "手紙",
        },
        {
            type: "dialog",
            speakerName: "ナレーション",
            image: "",
            text: "遥斗は一瞬、時間が止まったような感覚に襲われた。夏音が残した手紙――それは、かつての彼女が突然姿を消して以来、初めて彼に向けられた言葉だった。何年も経ち、忘れかけていた記憶が急速に蘇る。",
        },
        {
            type: "dialog",
            speakerName: "遥斗",
            image: "None",
            text: "夏音……どうして、こんなところに……？",
        },
        {
            type: "dialog",
            speakerName: "ナレーション",
            image: "",
            text: "遥斗はその場に座り込み、手紙を見つめたまま考え込んだ。あの日、夏の終わりに突然消えた彼女が、なぜこの手紙を祖父の家に残していたのか。そして、彼女が言う「霞ヶ丘の秘密」とは一体何なのか。",
        },
        {
            type: "dialog",
            speakerName: "ナレーション",
            image: "",
            text: "過去の記憶を遡りながら、霞ヶ丘の静かな風景を見つめた。夏音が消えた理由、そして手紙に込められた謎。それを解き明かすために、遥斗は再びこの町で過去と向き合うことを決意するのだった。",
        },
        {
            type: "sceneTransition",
            name: "nextStep",
            data: { nextTimelineID: "chapter-2", text: "Chapter1 故郷" },
        },
    ],
    "chapter-2": [
        // {
        //     type: "dialog",
        //     speakerName: "ナレーション",
        //     image: "",
        //     text: "aiueoeueifuhsidhfisdjk",
        // },
    ],
};
