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

type ChoiceEvent = {
    type: "choice";
    text: string;
    choices: Choice[];
};

type TimelineTransitionEvent = {
    type: "timelineTransition";
    timelineID: string;
};

type SceneTransitionEvent = {
    type: "sceneTransition";
    key: string;
    data?: any;
    fadeTime?: number;
};

export type Timeline = (DialogEvent | SetBackgroundEvent | ChoiceEvent | TimelineTransitionEvent | SceneTransitionEvent)[];
