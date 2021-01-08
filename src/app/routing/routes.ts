import { ExperimentRoutingMap, TaskType } from '../models/InternalDTOs';

export const RouteMap: ExperimentRoutingMap = {
    gonogo: {
      id: "gonogo",
      title: "Go-NoGo",
      description: "Description of Go-NoGo Task",
      type: TaskType.NAB,
      route: "task/gonogo"
    },
    digitspan: {
      id: "digitspan",
      title: "Digit Span",
      description: "The participant reads a sequence of numbers and enters them in the same or reverse order",
      type: TaskType.NAB,
      route: "task/digitspan"
    },
    fingertapping: {
      id: "fingertapping",
      title: "Finger Tapping Task",
      description: "The participant uses their dominant or non dominant hand to tap the 'P' and 'Q' characters as quickly as they can",
      type: TaskType.NAB,
      route: "task/fingertapping"
    },
    nback: {
      id: "nback",
      title: "N-Back",
      description: "The participant sees a sequence of letters and presses the left or right arrow arrow key to indicate if they saw that letter 2 letters ago",
      type: TaskType.NAB,
      route: "task/nback"
    },
    stroop: {
      id: "stroop",
      title: "Stroop Task",
      description: "The participant sees either the word RED, BLUE, or GREEN. The participant has to press 1 if the word is colored red, 2 if the word is colored blue, or 3 if the word is colored green",
      type: TaskType.NAB,
      route: "task/stroop"
    },
    trailmaking: {
      id: "trailmaking",
      title: "Trail Making",
      description: "The participant clicks different buttons in sequential order as fast as possible",
      type: TaskType.NAB,
      route: "task/trailmaking"
    },
    colorgame: {
      id: "colorgame",
      title: "Color Game",
      description: "Description of Color Game",
      type: TaskType.Experimental,
      route: "task/colorgame"
    },
    shapegame: {
      id: "shapegame",
      title: "Shape Game",
      description: "Description of Shape Game",
      type: TaskType.Experimental,
      route: "task/shapegame"
    },
    taskswitching: {
      id: "taskswitching",
      title: "Task Switching",
      description: "The participant is given a number from 1 - 4 or from 6 - 9. If the number if blue, then the participant should press the arrow keys to indicate whether the number if odd or even. If the number is orange, the participant should press the arrow keys to indicate whether the number if less than or greater than 5",
      type: TaskType.Experimental,
      route: "task/taskswitching"
    },
    demandselection: {
      id: "demandselection",
      title: "Demand Selection",
      description: "The participant selects one of two patches on the screen and is then presented with the task switching task. One patch is more difficult and switches more often than the other",
      type: TaskType.Experimental,
      route: "task/demandselection"
    },
    simon: {
      id: "simon",
          title: "Simon Task",
          description: "Description of Simon Task",
      type: TaskType.Experimental,
      route: "task/simontask"
    },
    smileyface: {
      id: "smileyface",
          title: "Smiley Face",
          description: "Description of Smiley Face Game",
      type: TaskType.Experimental,
      route: "task/smileyface"
    },
  };