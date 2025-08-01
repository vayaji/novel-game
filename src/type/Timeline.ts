import { Choice } from "./Choice";

type DialogEvent = {
    type: "dialog";
    text: string;
    speakerName: string;
    image?: string;
};

type SetBackgroundEvent = {
    type: "setBackground";
    key: string;
};

type SetLocationEvent = {
    type: "setLocation";
    name: string;
};

type ChoiceEvent = {
    type: "choice";
    choices: Choice[];
};

type TimelineTransitionEvent = {
    type: "timelineTransition";
    timelineID: string;
    fadeTime?: number;
};

type SceneTransitionEvent = {
    type: "sceneTransition";
    name: string;
    data?: any;
    fadeTime?: number;
};

type PlaySoundEvent = {
    type: "playSound";
    key: string;
    loop: boolean;
};

export type Timeline = (DialogEvent | SetBackgroundEvent | SetLocationEvent | ChoiceEvent | TimelineTransitionEvent | SceneTransitionEvent | PlaySoundEvent)[];
