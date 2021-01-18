import { RouteMap } from "../routing/routes";
import { Key, UserResponse } from "./InternalDTOs";

export enum TaskNames {
    ODDBALL = "oddball",
    DIGITSPAN = "digitspan",
    FINGERTAPPING = "fingertapping",
    NBACK = "nback",
    STROOP = "stroop",
    TRAILMAKING = "trailmaking",
    COLORGAME = "colorgame",
    SHAPEGAME = "shapegame",
    TASKSWITCHING = "taskswitching",
    DEMANDSELECTION = "demandselection",
    SIMON = "simon",
    SMILEYFACE = "smileyface"
}

export abstract class TaskData {
    trial: number;
    userID: string;
    score: number;
    submitted: string;  // ISO date string
    isPractice: boolean;
    isCorrect: boolean;
    experimentCode: string;
}

export interface Stimuli {
    set: any[]
}

export class StroopTask extends TaskData {
    actualAnswer:   UserResponse;
    userAnswer:     UserResponse;
    isCongruent:    boolean;
    responseTime:   number;
    set:            number;
}

export class StroopTaskStimuli implements Stimuli {
    set: {
        trial: number;
        color: string;
        congruent: number;
        word: string;
    }[]
}

export class NBack extends TaskData {
    actualAnswer: UserResponse;
    userAnswer: UserResponse;
    responseTime: number;
    set: number;
}

export class NBackStimuli implements Stimuli {
    set: {
        trial: number;
        currentLetter: string;
        nback: string;
    }[]
}

export class TaskSwitching extends TaskData {
    color: string;
    digit: number;
    actualAnswer: UserResponse;
    userAnswer: UserResponse;
    responseTime: number;
}

export class DemandSelection extends TaskData {
    firstPatch: string;
    secondPatch: string;
    selectedPatch: string;
    harderPatch: string;
    selectPatchResponseTime: number;
    respondToNumberResponseTime: number;
    taskGoal: string;   // which counter balance for blocks 5 and 6
    color: string;
    digit: number;
    actualAnswer: UserResponse;
    userAnswer: UserResponse;
    block: number;
    rotation: number;
}

export class TrailMaking extends TaskData {
    trialType: string;
    actualAnswer: string;
    userAnswer: string;
    timeFromLastClick: number;
}

export class FingerTapping extends TaskData {
    block: number;
    dominantHand: UserResponse;
    shouldUseDominantHand: boolean;
    timeFromLastKeyPress: number;
    keyPressed: Key;
}

export class DigitSpan extends TaskData {
    actualAnswer: string;   // the actual sequence given
    userAnswer: string;     // the sequence the user inputs
    responseTime: number;   // time from when keypad entered screen to participant submitting their response
    numberOfDigits: number;
    isForwardMemoryMode: boolean;
}

export class ratingTask extends TaskData {
    counterbalance: number;
    ratingType: string; 
    trial: number; 
    activity: string;
    userAnswer: number;
    responseTime: number;

}

export class choiceTask extends TaskData {
    trial: number; 
    activityLeft: string;
    activityRight: string;
    userAnswer: number;
    responseTime: number;
}

export class postChoiceRatingTask extends TaskData {
    ratingType: string; 
    trial: number; 
    activity: string;
    userAnswer: number;
    responseTime: number;
}

export function mapTaskIdToTitle(task: string) {
    switch (task) {
        case "demographics_questionnaire_responses":
            return "Demographics Questionnaire";
        case "feedback_questionnaire_responses":
            return "Feedback Questionnaire";
        case "experiment_user":
            return "Registered Participants"
        default:
            return RouteMap[task].title
    }
  }